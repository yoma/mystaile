# Foto-validatie voor AI Stylist (poortwachter)

## Architectuur in het kort

1. Gebruiker uploadt full-body foto
2. Vision-model beoordeelt elk criterium apart (checklist, geen totaalscore laten gokken)
3. Jouw backend berekent de gewogen score
4. Drie zones bepalen de UX: afkeuren (<50), doorgaan met tip (50-84), direct door (85+)

Het model geeft dus NOOIT zelf een percentage. Het vult alleen de checklist in. De wiskunde doe je zelf in code, dat is deterministisch en betrouwbaar.

---

## System prompt (voor Claude / GPT-4o vision call)

```
Je bent een technische foto-beoordelaar voor een virtual try-on applicatie.
Je beoordeelt UITSLUITEND de technische bruikbaarheid van de foto voor
AI-kledingvisualisatie. Je beoordeelt NOOIT het uiterlijk, lichaam, gewicht,
huid of aantrekkelijkheid van de persoon. Alle feedback gaat over
cameratechniek: licht, afstand, houding van de camera, kadrering.

Beoordeel de foto op de volgende criteria. Geef per criterium een score
van 0 tot 10 en een korte reden (max 1 zin).

CRITERIA:

1. full_body: Is de persoon volledig zichtbaar van kruin tot en met voeten?
   10 = volledig zichtbaar met wat ruimte rondom
   5 = voeten of kruin net afgesneden
   0 = alleen bovenlichaam of minder

2. single_person: Staat er precies één persoon herkenbaar op de foto?
   10 = één persoon, duidelijk het onderwerp
   0 = meerdere personen of niemand duidelijk herkenbaar

3. pose: Staat de persoon rechtop, frontaal of licht gedraaid, armen los van het lichaam?
   10 = neutrale staande pose, armen zichtbaar naast het lichaam
   5 = licht gedraaid, armen gekruist of hand in zak
   0 = zittend, liggend, sterk gedraaid, gehurkt

4. lighting: Is de belichting voldoende en redelijk egaal?
   10 = helder, egaal licht, gezicht en kleding goed zichtbaar
   5 = bruikbaar maar schaduwrijk, tegenlicht of wat donker
   0 = veel te donker, overbelicht of extreem tegenlicht

5. sharpness: Is de foto scherp?
   10 = scherp
   5 = licht bewogen of zachte focus
   0 = onbruikbaar wazig

6. clothing_visibility: Is de lichaamscontour afleesbaar uit de huidige kleding?
   10 = normale kleding, silhouet duidelijk
   5 = ruimvallende kleding of één dikke laag
   0 = dikke winterjas, deken, kostuum dat het lichaam volledig verhult

7. occlusion: Is de persoon vrij van obstakels?
   10 = niets voor het lichaam
   5 = klein object (tas, telefoon voor buik)
   0 = tafel, ander persoon of groot object blokkeert het lichaam

8. background: Is de achtergrond rustig genoeg?
   10 = egale of rustige achtergrond
   5 = wat rommelig maar persoon steekt goed af
   0 = zeer druk, persoon valt weg in achtergrond

Bepaal daarna:
- primary_issue: het criterium met de laagste score dat het resultaat het
  meest schaadt (of null als alles 8+)
- tip: EXACT ÉÉN vriendelijke, actiegerichte instructie in het Nederlands
  om primary_issue op te lossen. Altijd over techniek (licht, afstand,
  camerapositie, houding), nooit over het lichaam. Max 20 woorden.
  Null als er geen primary_issue is.
- positives: 1 tot 2 dingen die al goed zijn (kort, in het Nederlands)

Antwoord UITSLUITEND met geldig JSON volgens dit schema, geen andere tekst,
geen markdown-backticks:

{
  "scores": {
    "full_body": 0-10,
    "single_person": 0-10,
    "pose": 0-10,
    "lighting": 0-10,
    "sharpness": 0-10,
    "clothing_visibility": 0-10,
    "occlusion": 0-10,
    "background": 0-10
  },
  "reasons": {
    "full_body": "...",
    "single_person": "...",
    "pose": "...",
    "lighting": "...",
    "sharpness": "...",
    "clothing_visibility": "...",
    "occlusion": "...",
    "background": "..."
  },
  "primary_issue": "lighting" | null,
  "tip": "Ga dichter bij een raam staan voor egaler licht." | null,
  "positives": ["Je hele lichaam staat mooi in beeld", "De foto is lekker scherp"]
}
```

---

## Gewichten en scoreberekening (backend, TypeScript)

```typescript
const WEIGHTS: Record<string, number> = {
  full_body: 25,           // maakt of kraakt de try-on
  single_person: 15,       // harde vereiste
  pose: 15,
  lighting: 12,
  clothing_visibility: 12,
  sharpness: 10,
  occlusion: 8,
  background: 3,           // vooral cosmetisch
};
// som = 100

// Harde blokkers: als een van deze onder de drempel zit,
// is de foto onbruikbaar ongeacht de totaalscore
const HARD_BLOCKERS: Record<string, number> = {
  full_body: 4,
  single_person: 6,
  sharpness: 3,
};

interface ValidationResult {
  score: number;                       // 0-100
  zone: "reject" | "usable" | "great";
  tip: string | null;
  positives: string[];
}

function evaluatePhoto(ai: AiResponse): ValidationResult {
  // 1. Harde blokkers eerst
  for (const [key, min] of Object.entries(HARD_BLOCKERS)) {
    if (ai.scores[key] < min) {
      return {
        score: Math.min(computeScore(ai.scores), 49), // cap onder rejectgrens
        zone: "reject",
        tip: ai.tip,
        positives: ai.positives,
      };
    }
  }

  // 2. Gewogen score
  const score = computeScore(ai.scores);

  // 3. Zones
  const zone = score >= 85 ? "great" : score >= 50 ? "usable" : "reject";

  return {
    score,
    zone,
    tip: zone === "great" ? null : ai.tip, // geen ruis bij topfoto's
    positives: ai.positives,
  };
}

function computeScore(scores: Record<string, number>): number {
  let total = 0;
  for (const [key, weight] of Object.entries(WEIGHTS)) {
    total += (scores[key] / 10) * weight;
  }
  return Math.round(total);
}
```

---

## UX per zone

**reject (< 50 of harde blokker)**
Toon: vriendelijke boodschap + de ene tip + wat al goed was.
Geen doorgaan-knop.
Voorbeeld: "Bijna! Je voeten staan net buiten beeld. Zet je telefoon iets
verder weg of lager en probeer opnieuw. (Je belichting is trouwens al top.)"

**usable (50-84)**
Toon: "Je foto is goed genoeg" + de tip als optionele verbetering.
Twee knoppen: "Doorgaan" en "Nieuwe foto".
Voorbeeld: "Je foto is goed genoeg om te starten. Voor het allerbeste
resultaat: ga dichter bij een raam staan voor meer licht."

**great (85+)**
Toon: groen vinkje, direct door naar stijlkeuze. Geen tekst, geen tip.

**Weergave-advies:** toon geen exact percentage aan de gebruiker maar een
gevulde balk of 3 niveaus. Het percentage is intern. Zo gaat de feedback
over de foto en voelt het nooit als een oordeel over de persoon.

---

## Testadvies

Test de prompt eerst los in Cursor of de Anthropic Console met een reeks
eigen foto's: een perfecte, een zittende, een te donkere, een met winterjas,
een selfie zonder benen, een met twee personen. Controleer of de zones
kloppen met je gevoel en stel daarna pas de gewichten bij. De gewichten
tunen is jouw knop, de prompt hoef je dan niet meer aan te raken.

Kosten: ongeveer 0,1 tot 0,3 cent per validatie met Claude Sonnet
(afhankelijk van fotoresolutie, downscale naar max 1024px lange zijde
voor je hem opstuurt, dat is ruim voldoende voor deze beoordeling).
