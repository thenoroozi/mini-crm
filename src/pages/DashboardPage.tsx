import { Sparkles } from 'lucide-react'
import { Link } from 'react-router'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { NewCustomersChart } from '../features/dashboard/components/NewCustomersChart'
import { RecentActivity } from '../features/dashboard/components/RecentActivity'
import { StatsGrid } from '../features/dashboard/components/StatsGrid'
import { StatusBreakdown } from '../features/dashboard/components/StatusBreakdown'
import { useDashboardStats } from '../features/dashboard/hooks'

export function DashboardPage() {
  const { data } = useDashboardStats()
  const isNewUser = data?.totalCustomers === 0

  return (
    <div className="flex flex-col gap-4">
      {isNewUser && (
        <Card>
          <EmptyState
            icon={Sparkles}
            title="Welcome to Relay"
            description="Add your first customer to start tracking activity and revenue."
            action={
              <Link
                to="/customers"
                className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:bg-primary/90"
              >
                Add your first customer
              </Link>
            }
          />
        </Card>
      )}

      <StatsGrid />

      <div className="grid gap-4 lg:grid-cols-3">
        <NewCustomersChart className="lg:col-span-2" />
        <StatusBreakdown />
      </div>

      <RecentActivity />
    </div>
  )
}