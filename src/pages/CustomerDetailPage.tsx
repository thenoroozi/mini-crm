import { useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowLeft, UserX } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { ErrorState } from '../components/ui/ErrorState'
import { Modal } from '../components/ui/Modal'
import { Skeleton } from '../components/ui/Skeleton'
import { ActivityForm } from '../features/activities/components/ActivityForm'
import { ActivityTimeline } from '../features/activities/components/ActivityTimeline'
import { CustomerForm } from '../features/customers/components/CustomerForm'
import { CustomerProfileCard } from '../features/customers/components/CustomerProfileCard'
import { DeleteCustomerDialog } from '../features/customers/components/DeleteCustomerDialog'
import { useCustomer } from '../features/customers/hooks'

function DetailSkeleton() {
  return (
    <div role="status" aria-label="Loading customer" className="grid gap-4 lg:grid-cols-3">
      <Card className="flex flex-col items-center gap-3 p-6">
        <Skeleton className="size-16 rounded-full" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-4 h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </Card>
      <Card className="flex flex-col gap-3 p-6 lg:col-span-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-24 w-full" />
      </Card>
    </div>
  )
}

export function CustomerDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { data: customer, isPending, isError, refetch } = useCustomer(id)
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)

  let content: ReactNode
  if (isPending) {
    content = <DetailSkeleton />
  } else if (isError) {
    content = (
      <Card>
        <ErrorState onRetry={() => void refetch()} />
      </Card>
    )
  } else if (customer === null) {
    content = (
      <Card>
        <EmptyState
          icon={UserX}
          title="Customer not found"
          description="This customer does not exist or you do not have access to it."
          action={
            <Link
              to="/customers"
              className="inline-flex h-10 items-center rounded-lg border border-line px-4 text-sm font-semibold hover:bg-canvas"
            >
              Back to customers
            </Link>
          }
        />
      </Card>
    )
  } else {
    content = (
      <div className="grid gap-4 lg:grid-cols-3">
        <CustomerProfileCard
          customer={customer}
          onEdit={() => setEditing(true)}
          onDelete={() => setDeleting(true)}
        />
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-base font-semibold">Activity</h2>
          <p className="mb-4 mt-1 text-xs text-muted">Notes, calls and emails for this customer.</p>
          <ActivityForm customerId={customer.id} />
          <div className="mt-6 border-t border-line pt-6">
            <ActivityTimeline customerId={customer.id} />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/customers"
        className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-muted hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Customers
      </Link>

      {content}

      <Modal open={editing} onClose={() => setEditing(false)} title="Edit customer">
        {customer && (
          <CustomerForm
            customer={customer}
            onDone={() => setEditing(false)}
            onCancel={() => setEditing(false)}
          />
        )}
      </Modal>

      <DeleteCustomerDialog
        customer={deleting && customer ? customer : null}
        onClose={() => setDeleting(false)}
        onDeleted={() => navigate('/customers', { replace: true })}
      />
    </div>
  )
}