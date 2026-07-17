import { useEffect } from 'react'

interface PhotoTipsModalProps {
  onPickPhoto: () => void
  onClose: () => void
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

export function PhotoTipsModal({ onPickPhoto, onClose }: PhotoTipsModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="tips-overlay" role="presentation" onClick={onClose}>
      <div
        className="tips-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tips-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="tips-close"
          onClick={onClose}
          aria-label="Sluiten"
        >
          <span aria-hidden="true">×</span>
        </button>

        <p className="eyebrow tips-eyebrow">Voor je start</p>
        <h2 id="tips-title" className="tips-title">
          Zo werkt je foto best
        </h2>
        <p className="tips-lede">
          Eén goede full-body shot is genoeg. Denk camera, licht en kadrering.
          Geen stress over hoe je eruitziet.
        </p>

        <ul className="tips-list">
          {TIPS.map((tip) => (
            <li key={tip.title} className="tip-item">
              <span className="tip-title">{tip.title}</span>
              <span className="tip-detail">{tip.detail}</span>
            </li>
          ))}
        </ul>

        <div className="tips-actions">
          <button type="button" className="btn btn-dark" onClick={onPickPhoto}>
            Kies foto
          </button>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Annuleren
          </button>
        </div>
      </div>
    </div>
  )
}
