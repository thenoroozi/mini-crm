import { Avatar } from '../../../components/ui/Avatar'
import { formatCurrency } from '../../../lib/format'
import type { Customer } from '../types'
import { StatusBadge } from './StatusBadge'

export function CustomersTable({ customers }: { customers: Customer[] }) {
  return (
    <div className="overflow-x-auto p-2">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-[10px] font-bold uppercase tracking-wider text-muted">
            <th scope="col" className="rounded-l-lg bg-primary-soft px-4 py-3">Customer</th>
            <th scope="col" className="hidden bg-primary-soft px-4 py-3 md:table-cell">Phone</th>
            <th scope="col" className="bg-primary-soft px-4 py-3">Total spent</th>
            <th scope="col" className="rounded-r-lg bg-primary-soft px-4 py-3">Status</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}