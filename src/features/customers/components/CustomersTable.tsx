import { Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router'
import { Avatar } from '../../../components/ui/Avatar'
import { cn } from '../../../lib/cn'
import { formatCurrency } from '../../../lib/format'
import type { Customer } from '../types'
import { StatusBadge } from './StatusBadge'

type CustomersTableProps = {
  customers: Customer[]
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
}

const iconButton =
  'flex size-8 items-center justify-center rounded-lg text-muted transition-colors focus-visible:outline-2 focus-visible:outline-primary'

function RowActions({
  customer,
  onEdit,
  onDelete,
}: CustomersTableProps & { customer: Customer }) {
  return (
    <div className="flex justify-end gap-1">
      <button
        type="button"
        aria-label={`Edit ${customer.name}`}
        onClick={() => onEdit(customer)}
        className={cn(iconButton, 'hover:bg-canvas hover:text-ink')}
      >
        <Pencil className="size-4" aria-hidden />
      </button>
      <button
        type="button"
        aria-label={`Delete ${customer.name}`}
        onClick={() => onDelete(customer)}
        className={cn(iconButton, 'hover:bg-danger-soft hover:text-danger')}
      >
        <Trash2 className="size-4" aria-hidden />
      </button>
    </div>
  )
}

export function CustomersTable({ customers, onEdit, onDelete }: CustomersTableProps) {
  return (
    <>
      {/* Below md: stacked rows, so nothing can overflow the screen width */}
      <ul className="divide-y divide-line px-2 md:hidden">
        {customers.map((customer) => (
          <li key={customer.id} className="flex items-center gap-3 px-2 py-3.5">
            <Avatar name={customer.name} />
            <div className="min-w-0 flex-1">
              <Link
                to={`/customers/${customer.id}`}
                className="block truncate font-semibold hover:text-primary"
              >
                {customer.name}
              </Link>
              <p className="mt-0.5 truncate text-xs text-muted">
                {customer.phone ?? 'No phone'} · {formatCurrency(customer.total_spent)}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <StatusBadge status={customer.status} />
              <RowActions
                customer={customer}
                customers={customers}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* md and up: full table */}
      <div className="hidden overflow-x-auto p-2 md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[10px] font-bold uppercase tracking-wider text-muted">
              <th scope="col" className="rounded-l-lg bg-primary-soft px-4 py-3">Customer</th>
              <th scope="col" className="bg-primary-soft px-4 py-3">Phone</th>
              <th scope="col" className="bg-primary-soft px-4 py-3">Total spent</th>
              <th scope="col" className="bg-primary-soft px-4 py-3">Status</th>
              <th scope="col" className="rounded-r-lg bg-primary-soft px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-canvas/60">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar name={customer.name} />
                    <Link
                      to={`/customers/${customer.id}`}
                      className="font-semibold hover:text-primary hover:underline"
                    >
                      {customer.name}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-muted">{customer.phone ?? '—'}</td>
                <td className="px-4 py-3.5 font-semibold">{formatCurrency(customer.total_spent)}</td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={customer.status} />
                </td>
                <td className="px-4 py-3.5">
                  <RowActions
                    customer={customer}
                    customers={customers}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}