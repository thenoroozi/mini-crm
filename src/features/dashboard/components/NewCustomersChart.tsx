import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '../../../components/ui/Card'
import { ErrorState } from '../../../components/ui/ErrorState'
import { Skeleton } from '../../../components/ui/Skeleton'
import { useNewCustomersByDay } from '../hooks'

const DAYS = 7
const tick = { fontSize: 11, fill: 'var(--color-muted)' }

export function NewCustomersChart({ className }: { className?: string }) {
  const { data, isPending, isError, refetch } = useNewCustomersByDay(DAYS)

  return (
    <Card className={className}>
      <div className="p-5 pb-2">
        <h2 className="text-base font-semibold">New customers</h2>
        <p className="mt-1 text-xs text-muted">Added over the last {DAYS} days</p>
      </div>

      <div className="px-3 pb-4">
        {isPending && <Skeleton className="mx-2 h-64" />}

        {isError && <ErrorState title="Could not load chart" onRetry={() => void refetch()} />}

        {data && (
          <div
            role="img"
            aria-label={`Line chart of new customers per day over the last ${DAYS} days`}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="4 5" vertical={false} stroke="var(--color-line)" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={tick} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={32} tick={tick} />
                <Tooltip
                  cursor={{ stroke: 'var(--color-line)' }}
                  contentStyle={{ borderRadius: 12, border: '1px solid var(--color-line)', fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  name="New customers"
                  dataKey="count"
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: 'var(--color-primary)' }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Card>
  )
}