import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Tone = 'success' | 'neutral' | 'primary' | 'warning' | 'danger'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & { tone?: Tone }

const tones: Record<Tone, string> = {
  success: 'bg-success-soft text-success',
  neutral: 'bg-neutral-soft text-muted',
  primary: 'bg-primary-soft text-primary',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
}

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold',
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}