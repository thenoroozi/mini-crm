import { Card } from '../../../components/ui/Card'
import { ErrorState } from '../../../components/ui/ErrorState'
import { Skeleton } from '../../../components/ui/Skeleton'
import { cn } from '../../../lib/cn'
import { useDashboardStats } from '../hooks'

export function StatusBreakdown() {
  const { data, isPending, isError, refetch } = useDashboardStats()

  const rows = data
    ? [
        { label: 'Active', value: data.activeCustomers, barClass: 'bg-success' },
        { label: 'Inactive', value: data.inactiveCustomers, barClass: 'bg-muted' },
      ]
    : []

  return (
    <Card className="p-5">
      <h2 className="text-base font-semibold">Customers by status</h2>
      <p className="mt-1 text-xs text-muted">Distribution of your customers</p>

      <div className="mt-6">
        {isPending && (
          <div className="flex flex-col gap-6">
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
          </div>
        )}

        {isError && <ErrorState title="Could not load data" onRetry={() => void refetch()} />}

        {data && data.totalCustomers === 0 && (
          <p className="py-6 text-center text-sm text-muted">No customers yet.</p>
        )}

        {data && data.totalCustomers > 0 && (
          <ul className="flex flex-col gap-6">
            {rows.map((row) => {
              const share = Math.round((row.value / data.totalCustomers) * 100)
              return (
                <li key={row.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>{row.label}</span>
                    <span className="font-semibold">
                      {row.value} <span className="font-normal text-muted">({share}%)</span>
                    </span>
                  </div>
                  <div
                    role="progressbar"
                    aria-label={`${row.label} customers`}
                    aria-valuemin={0}
                    aria-valuemax={data.totalCustomers}
                    aria-valuenow={row.value}
                    className="h-2 rounded-full bg-neutral-soft"
                  >
                    <div
                      className={cn('h-2 rounded-full', row.barClass)}
                      style={{ width: `${share}%` }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Card>
  )
}