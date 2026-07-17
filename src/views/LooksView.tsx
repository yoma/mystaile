import { BrandMark } from '../components/BrandMark'
import type { Look } from '../types'

interface LooksViewProps {
  looks: Look[]
  index: number
  likedCount: number
  userPhoto: string | null
  onSkip: () => void
  onLike: () => void
  onOpen: () => void
  onBack: () => void
}

export function LooksView({
  looks,
  index,
  likedCount,
  userPhoto,
  onSkip,
  onLike,
  onOpen,
  onBack,
}: LooksViewProps) {
  const look = looks[index]
  const done = index >= looks.length

  if (done || !look) {
    return (
      <section className="screen" aria-label="Klaar met looks">
        <header className="screen-top">
          <button type="button" className="text-btn" onClick={onBack}>
            Terug
          </button>
          <BrandMark compact />
          <span className="top-spacer" />
        </header>
        <div className="screen-copy centered-copy">
          <h2>Klaar voor nu</h2>
          <p>
            {likedCount > 0
              ? `Je bewaarde ${likedCount} look${likedCount === 1 ? '' : 's'}. De stylist leert hiervan.`
              : 'Nog niets bewaard — pas gelegenheid of budget aan en probeer opnieuw.'}
          </p>
          <button type="button" className="btn btn-dark" onClick={onBack}>
            Naar intentie
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="screen looks-screen" aria-label="Looks">
      <header className="screen-top">
        <button type="button" className="text-btn" onClick={onBack}>
          Terug
        </button>
        <BrandMark compact />
        <p className="progress">
          {index + 1}/{looks.length}
        </p>
      </header>

      <button type="button" className="look-stage" onClick={onOpen}>
        <div className="look-visual">
          <img className="look-image" src={look.image} alt="" />
          {userPhoto && (
            <img className="look-you" src={userPhoto} alt="Jouw foto" />
          )}
          <span className="tryon-note">Voorbeeldlook · try-on volgt</span>
        </div>
        <div className="look-meta">
          <h2>{look.title}</h2>
          <p>{look.tagline}</p>
          <span className="look-link">Bekijk stukken →</span>
        </div>
      </button>

      <div className="look-actions">
        <button type="button" className="btn btn-ghost action-btn" onClick={onSkip}>
          Skip
        </button>
        <button type="button" className="btn btn-dark action-btn" onClick={onLike}>
          Bewaar
        </button>
      </div>
    </section>
  )
}
