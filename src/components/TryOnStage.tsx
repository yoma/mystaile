interface TryOnStageProps {
  userPhoto: string | null
  lookImage: string
  lookAlt?: string
  className?: string
}

/** V1 mock: user photo as full-body base, look garments blended on torso. */
export function TryOnStage({
  userPhoto,
  lookImage,
  lookAlt = '',
  className = '',
}: TryOnStageProps) {
  if (!userPhoto) {
    return (
      <div className={`tryon-stage ${className}`.trim()}>
        <img className="tryon-look-only" src={lookImage} alt={lookAlt} />
        <span className="tryon-note">Voorbeeldlook</span>
      </div>
    )
  }

  return (
    <div className={`tryon-stage ${className}`.trim()}>
      <img className="tryon-user" src={userPhoto} alt="Jouw foto" />
      <div className="tryon-garment" aria-hidden="true">
        <img className="tryon-garment-img" src={lookImage} alt="" />
      </div>
      <span className="tryon-note">Voorbeeld try-on</span>
    </div>
  )
}
