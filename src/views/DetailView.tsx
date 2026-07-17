import { BrandMark } from '../components/BrandMark'
import type { Look } from '../types'

const ROLE_LABEL: Record<string, string> = {
  top: 'Boven',
  bottom: 'Onder',
  shoes: 'Schoenen',
  layer: 'Laag',
  accessory: 'Accessoire',
}

interface DetailViewProps {
  look: Look
  onBack: () => void
}

export function DetailView({ look, onBack }: DetailViewProps) {
  const total = look.items.reduce((sum, item) => sum + item.price, 0)

  return (
    <section className="screen detail-screen" aria-label="Look detail">
      <header className="screen-top">
        <button type="button" className="text-btn" onClick={onBack}>
          Terug
        </button>
        <BrandMark compact />
        <span className="top-spacer" />
      </header>

      <div className="detail-hero">
        <img src={look.image} alt="" className="detail-image" />
      </div>

      <div className="screen-copy detail-copy">
        <p className="eyebrow">Complete look</p>
        <h2>{look.title}</h2>
        <p className="why">{look.why}</p>

        <div className="items">
          <div className="items-head">
            <h3>Te koop</h3>
            <span>± €{total}</span>
          </div>

          <ul className="item-list">
            {look.items.map((item) => (
              <li key={item.id} className="item-row">
                <div>
                  <p className="item-role">{ROLE_LABEL[item.role]}</p>
                  <p className="item-name">
                    {item.brand} · {item.name}
                  </p>
                  <p className="item-price">€{item.price}</p>
                </div>
                <a
                  className="btn btn-dark btn-small"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.shop}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
