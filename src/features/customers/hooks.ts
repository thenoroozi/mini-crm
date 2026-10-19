import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getCustomers } from './api'
import type { CustomerFilters } from './types'

export const customerKeys = {
  all: ['customers'] as const,
  list: (filters: CustomerFilters) => [...customerKeys.all, 'list', filters] as const,
}

export function useCustomers(filters: CustomerFilters) {
  return useQuery({
    queryKey: customerKeys.list(filters),
    queryFn: () => getCustomers(filters),
    placeholderData: keepPreviousData,
  })
}