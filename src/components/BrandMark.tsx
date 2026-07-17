interface BrandMarkProps {
  className?: string
  compact?: boolean
}

export function BrandMark({ className = '', compact = false }: BrandMarkProps) {
  const classes = ['brand', compact ? 'brand-compact' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <p className={classes} aria-label="mystAIle">
      myst<span className="brand-ai">AI</span>le
    </p>
  )
}
