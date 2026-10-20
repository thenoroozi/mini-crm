import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { SearchX, Users } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { ErrorState } from '../components/ui/ErrorState'
import { Modal } from '../components/ui/Modal'
import { Pagination } from '../components/ui/Pagination'
import { CustomerForm } from '../features/customers/components/CustomerForm'
import { CustomersTable } from '../features/customers/components/CustomersTable'
import { CustomersTableSkeleton } from '../features/customers/components/CustomersTableSkeleton'
import { CustomersToolbar } from '../features/customers/components/CustomersToolbar'
import { DeleteCustomerDialog } from '../features/customers/components/DeleteCustomerDialog'
import { useCustomers } from '../features/customers/hooks'
import type { Customer } from '../features/customers/types'
import { useCustomerFilters } from '../features/customers/useCustomerFilters'

export function CustomersPage() {
  const { filters, update } = useCustomerFilters()
  const { data, isPending, isError, isPlaceholderData, refetch } = useCustomers(filters)

  // null = form closed, {} = adding, { customer } = editing
  const [formState, setFormState] = useState<{ customer?: Customer } | null>(null)
  const [deleting, setDeleting] = useState<Customer | null>(null)

  const hasFilters = filters.search !== '' || filters.status !== 'all'
  const totalPages = data ? Math.max(1, Math.ceil(data.total / filters.pageSize)) : 1

  // Stale URL or last row of the last page deleted: move to the last real page.
  useEffect(() => {
    if (data && !isPlaceholderData && data.total > 0 && filters.page > totalPages) {
      update({ page: totalPages })
    }
  }, [data, isPlaceholderData, filters.page, totalPages, update])

  let content: ReactNode
  if (isPending) {
    content = <CustomersTableSkeleton />
  } else if (isError) {
    content = <ErrorState onRetry={() => void refetch()} />
  } else if (data.rows.length > 0) {
    content = (
      <>
        <CustomersTable
          customers={data.rows}
          onEdit={(customer) => setFormState({ customer })}
          onDelete={setDeleting}
        />
        <Pagination
          page={filters.page}
          pageSize={filters.pageSize}
          total={data.total}
          itemLabel="customers"
          onPageChange={(page) => update({ page })}
        />
      </>
    )
  } else if (data.total > 0) {
    // Out-of-range page: the effect above is already moving us back.
    content = <CustomersTableSkeleton />
  } else if (hasFilters) {
    content = (
      <EmptyState
        icon={SearchX}
        title="No matching customers"
        description="Try a different search or filter."
        action={
          <Button variant="outline" onClick={() => update({ search: '', status: 'all' })}>
            Clear filters
          </Button>
        }
      />
    )
  } else {
    content = (
      <EmptyState
        icon={Users}
        title="No customers yet"
        description="Customers you add will show up here."
        action={<Button onClick={() => setFormState({})}>Add your first customer</Button>}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <CustomersToolbar
        total={data?.total}
        search={filters.search}
        status={filters.status}
        onChange={update}
        onAdd={() => setFormState({})}
      />

      <Card
        aria-busy={isPlaceholderData}
        className={isPlaceholderData ? 'opacity-60 transition-opacity' : 'transition-opacity'}
      >
        {content}
      </Card>

      <Modal
        open={formState !== null}
        onClose={() => setFormState(null)}
        title={formState?.customer ? 'Edit customer' : 'Add customer'}
      >
        {formState && (
          <CustomerForm
            customer={formState.customer}
            onDone={() => setFormState(null)}
            onCancel={() => setFormState(null)}
          />
        )}
      </Modal>

      <DeleteCustomerDialog customer={deleting} onClose={() => setDeleting(null)} />
    </div>
  )
}