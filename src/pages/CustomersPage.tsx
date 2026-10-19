import type { ReactNode } from 'react'
import { Users } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { ErrorState } from '../components/ui/ErrorState'
import { CustomersTable } from '../features/customers/components/CustomersTable'
import { CustomersTableSkeleton } from '../features/customers/components/CustomersTableSkeleton'
import { useCustomers } from '../features/customers/hooks'
import type { CustomerFilters } from '../features/customers/types'

// Fixed for now. Step 8 turns these into real UI state (search, status, page).
const filters: CustomerFilters = { search: '', status: 'all', page: 1, pageSize: 10 }

export function CustomersPage() {
  const { data, isPending, isError, refetch } = useCustomers(filters)

  let content: ReactNode
  if (isPending) {
    content = <CustomersTableSkeleton />
  } else if (isError) {
    content = <ErrorState onRetry={() => void refetch()} />
  } else if (data.rows.length === 0) {
    content = (
      <EmptyState
        icon={Users}
        title="No customers yet"
        description="Customers you add will show up here."
      />
    )
  } else {
    content = <CustomersTable customers={data.rows} />
  }

  return <Card>{content}</Card>
}