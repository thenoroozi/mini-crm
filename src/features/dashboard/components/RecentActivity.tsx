import { StickyNote } from 'lucide-react'
import { Link } from 'react-router'
import { Avatar } from '../../../components/ui/Avatar'
import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/ui/Card'
import { EmptyState } from '../../../components/ui/EmptyState'
import { ErrorState } from '../../../components/ui/ErrorState'
import { Skeleton } from '../../../components/ui/Skeleton'
import { formatRelativeTime } from '../../../lib/format'
import { useRecentActivities } from '../hooks'

const typeLabels: Record<string, string> = { note: 'Note', call: 'Call', email: 'Email' }

export function RecentActivity() {
  const { data, isPending, isError, refetch } = useRecentActivities(5)

  return (
    <Card>
      <div className="p-5 pb-2">
        <h2 className="text-base font-semibold">Recent activity</h2>
        <p className="mt-1 text-xs text-muted">Latest notes, calls and emails</p>
      </div>

      {isPending && (
        <div role="status" aria-label="Loading activity" className="flex flex-col gap-5 p-5">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && <ErrorState title="Could not load activity" onRetry={() => void refetch()} />}

      {data && data.length === 0 && (
        <EmptyState
          icon={StickyNote}
          title="No activity yet"
          description="Notes, calls and emails you log on a customer will appear here."
        />
      )}

      {data && data.length > 0 && (
        <ul className="divide-y divide-line px-5 pb-2">
          {data.map((activity) => (
            <li key={activity.id} className="flex items-center gap-3 py-4">
              <Avatar name={activity.customerName} />
              <div className="min-w-0 flex-1">
                <Link
                  to={`/customers/${activity.customerId}`}
                  className="text-sm font-semibold hover:text-primary hover:underline"
                >
                  {activity.customerName}
                </Link>
                <p className="line-clamp-1 text-sm text-muted">{activity.description}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Badge tone="primary">{typeLabels[activity.type] ?? 'Note'}</Badge>
                <span className="text-xs text-muted">{formatRelativeTime(activity.createdAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}