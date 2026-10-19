import logoIconDark from '../../assets/brand/logo-icon-dark.png'
import logoIconLight from '../../assets/brand/logo-icon-light.png'
import { cn } from '../../lib/cn'

type LogoProps = {
  tone?: 'light' | 'dark'
  className?: string
}

export function Logo({ tone = 'light', className }: LogoProps) {
  const isDark = tone === 'dark'

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <img
        src={isDark ? logoIconDark : logoIconLight}
        alt=""
        className="size-9 rounded-[9px]"
      />
      <span className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-ink')}>Relay</span>
    </div>
  )
}