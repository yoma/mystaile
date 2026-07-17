import { BrandMark } from '../components/BrandMark'
import type { Audience, Budget, Intent, Occasion } from '../types'

interface IntentViewProps {
  intent: Intent
  onAudience: (value: Audience) => void
  onOccasion: (value: Occasion) => void
  onBudget: (value: Budget) => void
  onContinue: () => void
  onBack: () => void
}

const AUDIENCES: { id: Audience; label: string; hint: string }[] = [
  { id: 'man', label: 'Man', hint: 'Onze knipoog' },
  { id: 'vrouw', label: 'Vrouw', hint: 'Volledig mee' },
]

const OCCASIONS: { id: Occasion; label: string; hint: string }[] = [
  { id: 'werk', label: 'Werk', hint: 'Kantoor / meetings' },
  { id: 'weekend', label: 'Weekend', hint: 'Relaxed, verzorgd' },
  { id: 'avond', label: 'Avond', hint: 'Dinner / drinks' },
]

const BUDGETS: { id: Budget; label: string; hint: string }[] = [
  { id: 'scherp', label: 'Scherp', hint: 'Max.resultaat / €' },
  { id: 'normaal', label: 'Normaal', hint: 'Goede middenmoot' },
  { id: 'ruim', label: 'Ruim', hint: 'Kwaliteit eerst' },
]

export function IntentView({
  intent,
  onAudience,
  onOccasion,
  onBudget,
  onContinue,
  onBack,
}: IntentViewProps) {
  const ready = intent.audience && intent.occasion && intent.budget

  return (
    <section className="screen screen-intent" aria-label="Stijlkeuzes">
      <header className="screen-top">
        <button type="button" className="text-btn" onClick={onBack}>
          Terug
        </button>
        <BrandMark compact />
        <span className="top-spacer" />
      </header>

      <div className="screen-copy intent-copy">
        <p className="eyebrow reveal reveal-1">Stap 2</p>
        <h2 className="reveal reveal-2">Voor wie stylen we?</h2>
        <p className="reveal reveal-3">
          Eerst man of vrouw — daarna gelegenheid en budget. Zo blijven de looks
          relevant.
        </p>

        <div className="choice-block reveal reveal-3">
          <h3>Ik styl voor</h3>
          <div
            className="choice-list choice-list-2"
            role="radiogroup"
            aria-label="Man of vrouw"
          >
            {AUDIENCES.map((option) => (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={intent.audience === option.id}
                className={`choice ${intent.audience === option.id ? 'is-on' : ''}`}
                onClick={() => onAudience(option.id)}
              >
                <span className="choice-label">{option.label}</span>
                <span className="choice-hint">{option.hint}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="choice-block reveal reveal-3">
          <h3>Gelegenheid</h3>
          <div className="choice-list" role="radiogroup" aria-label="Gelegenheid">
            {OCCASIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={intent.occasion === option.id}
                className={`choice ${intent.occasion === option.id ? 'is-on' : ''}`}
                onClick={() => onOccasion(option.id)}
              >
                <span className="choice-label">{option.label}</span>
                <span className="choice-hint">{option.hint}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="choice-block reveal reveal-4">
          <h3>Budget</h3>
          <div className="choice-list" role="radiogroup" aria-label="Budget">
            {BUDGETS.map((option) => (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={intent.budget === option.id}
                className={`choice ${intent.budget === option.id ? 'is-on' : ''}`}
                onClick={() => onBudget(option.id)}
              >
                <span className="choice-label">{option.label}</span>
                <span className="choice-hint">{option.hint}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="btn btn-dark"
          disabled={!ready}
          onClick={onContinue}
        >
          Toon mijn looks
        </button>
      </div>
    </section>
  )
}
