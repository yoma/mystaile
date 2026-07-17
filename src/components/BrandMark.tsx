interface BrandMarkProps {
  className?: string
  compact?: boolean
  /** `light` = white+gold wordmark for dark surfaces (hero). `dark` = charcoal+gold for light UI. */
  tone?: 'dark' | 'light'
}

const WORDMARK = {
  dark: '/logo-wordmark.png',
  light: '/logo-wordmark-light.png',
} as const

export function BrandMark({
  className = '',
  compact = false,
  tone = 'dark',
}: BrandMarkProps) {
  const classes = ['brand', compact ? 'brand-compact' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <p className={classes}>
      <img
        className="brand-logo"
        src={WORDMARK[tone]}
        alt="mystAIle"
        width={945}
        height={224}
        decoding="async"
      />
    </p>
  )
}
