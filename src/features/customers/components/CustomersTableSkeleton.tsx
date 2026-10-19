import { Skeleton } from '../../../components/ui/Skeleton'

export function CustomersTableSkeleton() {
  return (
    <div role="status" aria-label="Loading customers" className="flex flex-col gap-5 p-6">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-9 rounded-full" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="ml-auto h-4 w-20" />
        </div>
      ))}
    </div>
  )
}