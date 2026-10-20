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
    <Card className="flex items-start justify-between gap-3 p-5 bg-linear-to-br from-indigo-700 to-primary">
      <div className="min-w-0 text-white">
        <p className="text-sm  font-semibold">{label}</p>
        <p className="mt-3 truncate text-2xl font-bold">{value}</p>
        <p className="mt-2 text-primary-soft text-xs">{hint}</p>
      </div>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
        <Icon className="size-5" aria-hidden />
      </span>
    </Card>
  )
}