interface PhotoTipsViewProps {
  onPickPhoto: () => void
  onBack: () => void
}

const TIPS = [
  {
    title: 'Full-body in beeld',
    detail: 'Van kruin tot voeten, met wat ruimte rondom.',
  },
  {
    title: 'Eén persoon, rechtop',
    detail: 'Neutrale houding, armen zichtbaar naast je lichaam.',
  },
  {
    title: 'Heldere belichting',
    detail: 'Gelijkmatig licht, zodat gezicht en kleding goed zichtbaar zijn.',
  },
  {
    title: 'Scherp en stil',
    detail: 'Houd de camera stil. Geen wazige shots.',
  },
  {
    title: 'Rustige achtergrond',
    detail: 'Niets voor je lichaam, achtergrond niet te druk.',
  },
] as const

export function PhotoTipsView({ onPickPhoto, onBack }: PhotoTipsViewProps) {
  return (
    <section className="screen screen-tips" aria-label="Foto tips">
      <header className="screen-top">
        <button type="button" className="text-btn" onClick={onBack}>
          Terug
        </button>
        <p className="brand brand-compact">Mystaile</p>
        <span className="top-spacer" />
      </header>

      <div className="screen-copy tips-copy">
        <p className="eyebrow reveal reveal-1">Voor je start</p>
        <h2 className="reveal reveal-2">Zo werkt je foto het best</h2>
        <p className="reveal reveal-3">
          Eén goede full-body shot is genoeg. Denk camera, licht en kadrering.
          Geen stress over hoe je eruitziet.
        </p>

        <ul className="tips-list reveal reveal-3">
          {TIPS.map((tip) => (
            <li key={tip.title} className="tip-item">
              <span className="tip-title">{tip.title}</span>
              <span className="tip-detail">{tip.detail}</span>
            </li>
          ))}
        </ul>

        <div className="cta-row reveal reveal-4">
          <button type="button" className="btn btn-dark" onClick={onPickPhoto}>
            Kies foto
          </button>
        </div>
      </div>
    </section>
  )
}
