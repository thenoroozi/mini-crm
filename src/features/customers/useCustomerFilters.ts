import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import type { CustomerFilters } from './types'

const PAGE_SIZE = 10

export type FilterChanges = {
  search?: string
  status?: CustomerFilters['status']
  page?: number
}

export function parseStatus(value: string | null): CustomerFilters['status'] {
  return value === 'active' || value === 'inactive' ? value : 'all'
}

function parsePage(value: string | null): number {
  const n = Number(value)
  return Number.isInteger(n) && n >= 1 ? n : 1
}

function setOrDelete(params: URLSearchParams, key: string, value: string) {
  if (value) params.set(key, value)
  else params.delete(key)
}

export function useCustomerFilters() {
  const [params, setParams] = useSearchParams()

  const filters = useMemo<CustomerFilters>(
    () => ({
      search: params.get('q') ?? '',
      status: parseStatus(params.get('status')),
      page: parsePage(params.get('page')),
      pageSize: PAGE_SIZE,
    }),
    [params],
  )

  const update = useCallback(
    (changes: FilterChanges) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)

          if (changes.search !== undefined) setOrDelete(next, 'q', changes.search.trim())
          if (changes.status !== undefined) {
            setOrDelete(next, 'status', changes.status === 'all' ? '' : changes.status)
          }

          // Changing search or status goes back to page 1, unless a page is given.
          const resetsPage = changes.search !== undefined || changes.status !== undefined
          const page = changes.page ?? (resetsPage ? 1 : undefined)
          if (page !== undefined) setOrDelete(next, 'page', page > 1 ? String(page) : '')

          return next
        },
        // Paging adds a history entry (Back goes to the previous page); typing does not.
        { replace: changes.page === undefined },
      )
    },
    [setParams],
  )

  return { filters, update }
}