import { DollarSign, UserCheck, UserPlus, Users } from 'lucide-react'
import { Card } from '../../../components/ui/Card'
import { ErrorState } from '../../../components/ui/ErrorState'
import { Skeleton } from '../../../components/ui/Skeleton'
import { formatCurrency } from '../../../lib/format'
import { useDashboardStats } from '../hooks'
import { StatCard } from './StatCard'

const gridClass = 'grid gap-4 sm:grid-cols-2 xl:grid-cols-4'

export function StatsGrid() {
  const { data, isPending, isError, refetch } = useDashboardStats()

  if (isPending) {
    return (
      <div role="status" aria-label="Loading stats" className={gridClass}>
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i} className="p-5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-3 h-8 w-20" />
            <Skeleton className="mt-3 h-3 w-24" />
          </Card>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <Card>
        <ErrorState title="Could not load stats" onRetry={() => void refetch()} />
      </Card>
    )
  }

  const activeShare =
    data.totalCustomers > 0 ? Math.round((data.activeCustomers / data.totalCustomers) * 100) : 0

  return (
    <div className={gridClass}>
      <StatCard icon={Users} label="Total customers" value={String(data.totalCustomers)} hint="All time" />
      <StatCard
        icon={UserCheck}
        label="Active customers"
        value={String(data.activeCustomers)}
        hint={`${activeShare}% of all customers`}
      />
      <StatCard
        icon={UserPlus}
        label="New customers"
        value={String(data.newLast30Days)}
        hint="Last 30 days"
      />
      <StatCard
        icon={DollarSign}
        label="Total revenue"
        value={formatCurrency(data.totalRevenue)}
        hint="Sum of total spent"
      />
    </div>
  )
}