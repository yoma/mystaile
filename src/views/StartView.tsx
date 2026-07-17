import { useEffect, useState } from 'react'
import { PhotoTipsModal } from './PhotoTipsModal'

interface StartViewProps {
  onPickPhoto: () => void
}

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1754577060078-21315dd188c8?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1800&q=80',
] as const

const ROTATE_MS = 10_000

export function StartView({ onPickPhoto }: StartViewProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [tipsOpen, setTipsOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    let intervalId: number | undefined

    const stop = () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId)
        intervalId = undefined
      }
    }

    const start = () => {
      stop()
      if (mq.matches) {
        setActiveIndex(0)
        return
      }
      intervalId = window.setInterval(() => {
        setActiveIndex((index) => (index + 1) % HERO_IMAGES.length)
      }, ROTATE_MS)
    }

    start()
    mq.addEventListener('change', start)
    return () => {
      stop()
      mq.removeEventListener('change', start)
    }
  }, [])

  return (
    <section className="hero" aria-label="Mystaile start">
      <div className="hero-media" aria-hidden="true">
        {HERO_IMAGES.map((src, index) => (
          <img
            key={src}
            className={`hero-image${index === activeIndex ? ' is-active' : ''}`}
            src={src}
            alt=""
          />
        ))}
        <div className="hero-veil" />
      </div>

      <div className="hero-content">
        <p className="brand reveal reveal-1">Mystaile</p>
        <h1 className="headline reveal reveal-2">
          Stylist voor iedereen. En ja, ook voor hem.
        </h1>
        <p className="lede reveal reveal-3">
          Eén foto. Looks die bij jou passen, meteen met een link naar jouw stuk.
        </p>
        <div className="cta-row reveal reveal-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setTipsOpen(true)}
          >
            Start met je foto
          </button>
        </div>
      </div>

      {tipsOpen && (
        <PhotoTipsModal
          onPickPhoto={onPickPhoto}
          onClose={() => setTipsOpen(false)}
        />
      )}
    </section>
  )
}
