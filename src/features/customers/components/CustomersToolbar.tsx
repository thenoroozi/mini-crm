import { useEffect, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { parseStatus } from '../useCustomerFilters'
import type { FilterChanges } from '../useCustomerFilters'
import type { CustomerFilters } from '../types'

type CustomersToolbarProps = {
  total: number | undefined
  search: string
  status: CustomerFilters['status']
  onChange: (changes: FilterChanges) => void
  onAdd: () => void
}

export function CustomersToolbar({
  total,
  search,
  status,
  onChange,
  onAdd,
}: CustomersToolbarProps) {
  const [text, setText] = useState(search)
  const [syncedSearch, setSyncedSearch] = useState(search)

  // The URL can change from outside (header search, Back button, "Clear filters"): follow it.
  if (search !== syncedSearch) {
    setSyncedSearch(search)
    setText(search)
  }

  // Debounce: only push to the URL once typing pauses.
  useEffect(() => {
    const id = setTimeout(() => {
      if (text.trim() !== search) onChange({ search: text })
    }, 300)
    return () => clearTimeout(id)
  }, [text, search, onChange])

  return (
    <Card className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-base font-semibold">All customers</h2>
        <p className="mt-1 text-xs text-muted">
          {total === undefined ? 'Loading…' : `${total} ${total === 1 ? 'customer' : 'customers'}`}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            type="search"
            aria-label="Search customers"
            placeholder="Search by name, phone or email"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-10 w-full rounded-lg border border-line bg-surface pl-9 pr-3 text-base sm:text-sm outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-64"
          />
        </div>

        <select
          aria-label="Filter by status"
          value={status}
          onChange={(e) => onChange({ status: parseStatus(e.target.value) })}
          className="h-10 rounded-lg border border-line bg-surface px-3 text-base sm:text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <Button onClick={onAdd}>
          <Plus className="size-4" aria-hidden />
          Add customer
        </Button>
      </div>
    </Card>
  )
}