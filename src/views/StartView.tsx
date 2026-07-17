interface StartViewProps {
  onStart: () => void
}

export function StartView({ onStart }: StartViewProps) {
  return (
    <section className="hero" aria-label="Mystaile start">
      <div className="hero-media" aria-hidden="true">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1800&q=80"
          alt=""
        />
        <div className="hero-veil" />
      </div>

      <div className="hero-content">
        <p className="brand reveal reveal-1">Mystaile</p>
        <h1 className="headline reveal reveal-2">
          Stylist voor iedereen. Met een knipoog naar de mannen.
        </h1>
        <p className="lede reveal reveal-3">
          Eén foto. Looks die bij jou passen. Direct door naar de shop.
        </p>
        <div className="cta-row reveal reveal-4">
          <button type="button" className="btn btn-primary" onClick={onStart}>
            Start met je foto
          </button>
        </div>
      </div>
    </section>
  )
}
