import { cn } from '../../lib/cn'
import { getInitials } from '../../lib/format'

const palette = [
  'bg-[#d8e7ff]',
  'bg-[#fbe2d4]',
  'bg-[#e8e2ff]',
  'bg-[#d7f4e7]',
  'bg-[#fde9b8]',
]

const sizes = {
  sm: 'size-8 text-[10px]',
  md: 'size-9 text-xs',
  lg: 'size-16 text-lg',
}

function pickColor(name: string) {
  let sum = 0
  for (const ch of name) sum += ch.charCodeAt(0)
  return palette[sum % palette.length]
}

type AvatarProps = {
  name: string
  size?: keyof typeof sizes
  className?: string
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-bold text-primary',
        sizes[size],
        pickColor(name),
        className,
      )}
    >
      {getInitials(name)}
    </span>
  )
}