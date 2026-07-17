import type { Budget, Intent, Occasion } from '../types'

interface IntentViewProps {
  intent: Intent
  onOccasion: (value: Occasion) => void
  onBudget: (value: Budget) => void
  onContinue: () => void
  onBack: () => void
}

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
  onOccasion,
  onBudget,
  onContinue,
  onBack,
}: IntentViewProps) {
  const ready = intent.occasion && intent.budget

  return (
    <section className="screen screen-intent" aria-label="Gelegenheid en budget">
      <header className="screen-top">
        <button type="button" className="text-btn" onClick={onBack}>
          Terug
        </button>
        <p className="brand brand-compact">Mystaile</p>
        <span className="top-spacer" />
      </header>

      <div className="screen-copy intent-copy">
        <p className="eyebrow reveal reveal-1">Stap 2</p>
        <h2 className="reveal reveal-2">Waarvoor stylen we je?</h2>
        <p className="reveal reveal-3">
          Twee keuzes. Daarna krijg je complete looks — geen eindeloze racks.
        </p>

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
