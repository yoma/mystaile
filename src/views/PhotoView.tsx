interface PhotoViewProps {
  previewUrl: string
  fileName: string | null
  onChangePhoto: () => void
  onContinue: () => void
  onBack: () => void
}

export function PhotoView({
  previewUrl,
  fileName,
  onChangePhoto,
  onContinue,
  onBack,
}: PhotoViewProps) {
  return (
    <section className="screen" aria-label="Foto check">
      <header className="screen-top">
        <button type="button" className="text-btn" onClick={onBack}>
          Terug
        </button>
        <p className="brand brand-compact">Mystaile</p>
        <button type="button" className="text-btn" onClick={onChangePhoto}>
          Andere
        </button>
      </header>

      <div className="photo-stage">
        <img
          className="photo-frame reveal reveal-1"
          src={previewUrl}
          alt={fileName ? `Gekozen foto: ${fileName}` : 'Gekozen foto'}
        />
      </div>

      <div className="screen-copy reveal reveal-2">
        <p className="eyebrow">Foto check</p>
        <h2>Goed genoeg om te starten</h2>
        <p>
          Voor het scherpste resultaat: full-body, rechtop, helder licht. Je kunt
          nu door naar je looks.
        </p>
        <button type="button" className="btn btn-dark" onClick={onContinue}>
          Kies gelegenheid
        </button>
      </div>
    </section>
  )
}
