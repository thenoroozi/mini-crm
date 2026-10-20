import type { ReactNode } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { Avatar } from '../../../components/ui/Avatar'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { formatCurrency, formatDate } from '../../../lib/format'
import type { Customer } from '../types'
import { StatusBadge } from './StatusBadge'

type CustomerProfileCardProps = {
  customer: Customer
  onEdit: () => void
  onDelete: () => void
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="min-w-0 break-words text-right text-sm font-medium">{children}</dd>
    </div>
  )
}

const linkClass = 'text-primary hover:underline'

export function CustomerProfileCard({ customer, onEdit, onDelete }: CustomerProfileCardProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center">
        <Avatar name={customer.name} size="lg" />
        <h2 className="mt-3 text-lg font-bold">{customer.name}</h2>
        <div className="mt-2">
          <StatusBadge status={customer.status} />
        </div>
      </div>

      <dl className="mt-6 divide-y divide-line border-t border-line">
        <Row label="Email">
          {customer.email ? (
            <a href={`mailto:${customer.email}`} className={linkClass}>
              {customer.email}
            </a>
          ) : (
            '—'
          )}
        </Row>
        <Row label="Phone">
          {customer.phone ? (
            <a href={`tel:${customer.phone}`} className={linkClass}>
              {customer.phone}
            </a>
          ) : (
            '—'
          )}
        </Row>
        <Row label="Address">{customer.address ?? '—'}</Row>
        <Row label="Total spent">{formatCurrency(customer.total_spent)}</Row>
        <Row label="Customer since">{formatDate(customer.created_at)}</Row>
      </dl>

      <div className="mt-6 flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onEdit}>
          <Pencil className="size-4" aria-hidden />
          Edit
        </Button>
        <Button variant="danger" className="flex-1" onClick={onDelete}>
          <Trash2 className="size-4" aria-hidden />
          Delete
        </Button>
      </div>
    </Card>
  )
}