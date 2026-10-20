import { Pencil, Trash2 } from 'lucide-react'
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

export function CustomersTable({ customers, onEdit, onDelete }: CustomersTableProps) {
  return (
    <div className="overflow-x-auto p-2">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-[10px] font-bold uppercase tracking-wider text-muted">
            <th scope="col" className="rounded-l-lg bg-primary-soft px-4 py-3">Customer</th>
            <th scope="col" className="hidden bg-primary-soft px-4 py-3 md:table-cell">Phone</th>
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
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{customer.name}</p>
                    {customer.phone && (
                      <p className="text-xs text-muted md:hidden">{customer.phone}</p>
                    )}
                  </div>
                </div>
              </td>
              <td className="hidden px-4 py-3.5 text-muted md:table-cell">{customer.phone ?? '—'}</td>
              <td className="px-4 py-3.5 font-semibold">{formatCurrency(customer.total_spent)}</td>
              <td className="px-4 py-3.5">
                <StatusBadge status={customer.status} />
              </td>
              <td className="px-4 py-3.5">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}