import type { Look } from '../types'

export const LOOKS: Look[] = [
  {
    id: 'navy-clean',
    title: 'Clean navy',
    tagline: 'Strak genoeg voor kantoor, niet stijf.',
    why: 'Navy + ecru geeft contrast zonder schreeuwerig te zijn. De straight chino houdt je silhouet lang.',
    image:
      'https://images.unsplash.com/photo-1617137984095-74ce4b57a79c?auto=format&fit=crop&w=900&q=80',
    occasions: ['werk', 'weekend'],
    budgets: ['normaal', 'ruim'],
    items: [
      {
        id: 'n1',
        name: 'Merino crewneck',
        brand: 'Asket',
        price: 98,
        shop: 'Asket',
        url: 'https://www.asket.com/',
        role: 'top',
      },
      {
        id: 'n2',
        name: 'Straight chino',
        brand: 'NN07',
        price: 129,
        shop: 'NN07',
        url: 'https://www.nn07.com/',
        role: 'bottom',
      },
      {
        id: 'n3',
        name: 'Leather sneaker',
        brand: 'Common Projects',
        price: 350,
        shop: 'End.',
        url: 'https://www.endclothing.com/',
        role: 'shoes',
      },
    ],
  },
  {
    id: 'weekend-olive',
    title: 'Weekend olive',
    tagline: 'Relaxed, maar je ziet er verzorgd uit.',
    why: 'Olive overshirt boven een tee is de makkelijkste mannen-upgrade: één laag erbij, meteen styler.',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    occasions: ['weekend'],
    budgets: ['scherp', 'normaal'],
    items: [
      {
        id: 'o1',
        name: 'Heavyweight tee',
        brand: 'Colorful Standard',
        price: 45,
        shop: 'Colorful Standard',
        url: 'https://colorfulstandard.com/',
        role: 'top',
      },
      {
        id: 'o2',
        name: 'Olive overshirt',
        brand: 'Cos',
        price: 89,
        shop: 'Cos',
        url: 'https://www.cos.com/',
        role: 'layer',
      },
      {
        id: 'o3',
        name: 'Tapered jeans',
        brand: 'Everlane',
        price: 88,
        shop: 'Everlane',
        url: 'https://www.everlane.com/',
        role: 'bottom',
      },
      {
        id: 'o4',
        name: 'Court sneaker',
        brand: 'Veja',
        price: 120,
        shop: 'Veja',
        url: 'https://www.veja-store.com/',
        role: 'shoes',
      },
    ],
  },
  {
    id: 'avond-black',
    title: 'Avond zwart',
    tagline: 'Donker, simpel, geen gedoe.',
    why: 'All-black werkt altijd ’s avonds. Textuur in het shirt houdt het spannend zonder print of logo.',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
    occasions: ['avond', 'werk'],
    budgets: ['normaal', 'ruim'],
    items: [
      {
        id: 'a1',
        name: 'Cuban collar shirt',
        brand: 'Percival',
        price: 79,
        shop: 'Percival',
        url: 'https://www.percivalclo.com/',
        role: 'top',
      },
      {
        id: 'a2',
        name: 'Black tapered trouser',
        brand: 'Arket',
        price: 99,
        shop: 'Arket',
        url: 'https://www.arket.com/',
        role: 'bottom',
      },
      {
        id: 'a3',
        name: 'Suede loafer',
        brand: 'Massimo Dutti',
        price: 129,
        shop: 'Massimo Dutti',
        url: 'https://www.massimodutti.com/',
        role: 'shoes',
      },
    ],
  },
  {
    id: 'sharp-blue',
    title: 'Sharp blue',
    tagline: 'Voor als “smart casual” op de uitnodiging staat.',
    why: 'Lichtblauw overhemd + grijze broek is de veiligste route die toch scherp oogt.',
    image:
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=900&q=80',
    occasions: ['werk', 'avond'],
    budgets: ['scherp', 'normaal'],
    items: [
      {
        id: 'b1',
        name: 'Oxford shirt',
        brand: 'Uniqlo',
        price: 39,
        shop: 'Uniqlo',
        url: 'https://www.uniqlo.com/',
        role: 'top',
      },
      {
        id: 'b2',
        name: 'Wool-mix trouser',
        brand: 'Mango Man',
        price: 59,
        shop: 'Mango',
        url: 'https://shop.mango.com/',
        role: 'bottom',
      },
      {
        id: 'b3',
        name: 'White leather sneaker',
        brand: 'Axel Arigato',
        price: 190,
        shop: 'Axel Arigato',
        url: 'https://www.axelarigato.com/',
        role: 'shoes',
      },
    ],
  },
  {
    id: 'layer-camel',
    title: 'Camel layer',
    tagline: 'Eén jas, meteen af.',
    why: 'Een camel overshirt of light coat tilt een basisoutfit. Neutrale kleuren stapelen makkelijk.',
    image:
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=900&q=80',
    occasions: ['weekend', 'werk'],
    budgets: ['normaal', 'ruim'],
    items: [
      {
        id: 'c1',
        name: 'Knit polo',
        brand: 'Samsøe Samsøe',
        price: 120,
        shop: 'Samsøe',
        url: 'https://www.samsoe.com/',
        role: 'top',
      },
      {
        id: 'c2',
        name: 'Camel overshirt',
        brand: 'Selected Homme',
        price: 79,
        shop: 'Selected',
        url: 'https://www.selectedhomme.com/',
        role: 'layer',
      },
      {
        id: 'c3',
        name: 'Stone chino',
        brand: 'Dockers',
        price: 69,
        shop: 'Dockers',
        url: 'https://www.dockers.com/',
        role: 'bottom',
      },
    ],
  },
  {
    id: 'budget-essentials',
    title: 'Basis die werkt',
    tagline: 'Maximaal effect, minimale uitgave.',
    why: 'Goede pasvorm wint van logo’s. Neutrale tee + donkere jeans + witte sneaker dekt 80% van je week.',
    image:
      'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=900&q=80',
    occasions: ['weekend', 'werk'],
    budgets: ['scherp'],
    items: [
      {
        id: 'e1',
        name: 'Organic tee',
        brand: 'H&M',
        price: 12,
        shop: 'H&M',
        url: 'https://www.hm.com/',
        role: 'top',
      },
      {
        id: 'e2',
        name: 'Slim jeans',
        brand: 'Weekday',
        price: 49,
        shop: 'Weekday',
        url: 'https://www.weekday.com/',
        role: 'bottom',
      },
      {
        id: 'e3',
        name: 'Court sneaker',
        brand: 'Adidas',
        price: 79,
        shop: 'Adidas',
        url: 'https://www.adidas.com/',
        role: 'shoes',
      },
    ],
  },
]

export function filterLooks(
  occasion: string,
  budget: string,
): Look[] {
  const matched = LOOKS.filter(
    (look) =>
      look.occasions.includes(occasion as Look['occasions'][number]) &&
      look.budgets.includes(budget as Look['budgets'][number]),
  )

  if (matched.length >= 4) return matched

  const byOccasion = LOOKS.filter((look) =>
    look.occasions.includes(occasion as Look['occasions'][number]),
  )

  return byOccasion.length ? byOccasion : LOOKS
}
