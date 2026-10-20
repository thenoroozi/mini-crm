import { Button } from '../../../components/ui/Button'
import { Modal } from '../../../components/ui/Modal'
import { getErrorMessage } from '../../../lib/errors'
import { useDeleteCustomer } from '../hooks'
import type { Customer } from '../types'

type DeleteCustomerDialogProps = {
  customer: Customer | null
  onClose: () => void
}

export function DeleteCustomerDialog({ customer, onClose }: DeleteCustomerDialogProps) {
  const removeCustomer = useDeleteCustomer()

  function handleClose() {
    removeCustomer.reset()
    onClose()
  }

  return (
    <Modal open={customer !== null} onClose={handleClose} title="Delete customer">
      {customer && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted">
            Delete <span className="font-semibold text-ink">{customer.name}</span>? This
            permanently removes the customer and all of their activities. This cannot be undone.
          </p>

          {removeCustomer.isError && (
            <p role="alert" className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
              {getErrorMessage(removeCustomer.error)}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              loading={removeCustomer.isPending}
              onClick={() => removeCustomer.mutate(customer.id, { onSuccess: handleClose })}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}