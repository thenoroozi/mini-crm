import type { LucideIcon } from 'lucide-react'
import { Card } from '../../../components/ui/Card'

type StatCardProps = {
  icon: LucideIcon
  label: string
  value: string
  hint: string
}

export function StatCard({ icon: Icon, label, value, hint }: StatCardProps) {
  return (
    <Card className="flex items-start justify-between gap-3 p-5">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-3 truncate text-2xl font-bold">{value}</p>
        <p className="mt-2 text-xs text-muted">{hint}</p>
      </div>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
        <Icon className="size-5" aria-hidden />
      </span>
    </Card>
  )
}