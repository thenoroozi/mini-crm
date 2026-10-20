import { Mail, Phone, StickyNote } from 'lucide-react'
import { EmptyState } from '../../../components/ui/EmptyState'
import { ErrorState } from '../../../components/ui/ErrorState'
import { Skeleton } from '../../../components/ui/Skeleton'
import { formatDateTime } from '../../../lib/format'
import { useActivities } from '../hooks'

const typeMeta = {
  note: { icon: StickyNote, label: 'Note' },
  call: { icon: Phone, label: 'Call' },
  email: { icon: Mail, label: 'Email' },
}

function getMeta(type: string) {
  return type === 'call' || type === 'email' ? typeMeta[type] : typeMeta.note
}

export function ActivityTimeline({ customerId }: { customerId: string }) {
  const { data, isPending, isError, refetch } = useActivities(customerId)

  if (isPending) {
    return (
      <div role="status" aria-label="Loading activity" className="flex flex-col gap-5">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="size-9 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return <ErrorState title="Could not load activity" onRetry={() => void refetch()} />
  }

  if (data.length === 0) {
    return (
      <EmptyState
        icon={StickyNote}
        title="No activity yet"
        description="Log a note, call or email to start the timeline."
      />
    )
  }

  return (
    <ol className="flex flex-col gap-5">
      {data.map((activity) => {
        const { icon: Icon, label } = getMeta(activity.type)
        return (
          <li key={activity.id} className="flex gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Icon className="size-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-sm">
                <span className="font-semibold">{label}</span>
                <span className="text-muted"> · {formatDateTime(activity.created_at)}</span>
              </p>
              <p className="mt-1 whitespace-pre-wrap break-words text-sm text-ink/80">
                {activity.description}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}