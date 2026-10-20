import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from './api'
import type { CustomerFilters, CustomerInput } from './types'

export const customerKeys = {
  all: ['customers'] as const,
  lists: () => [...customerKeys.all, 'list'] as const,
  list: (filters: CustomerFilters) => [...customerKeys.lists(), filters] as const,
  detail: (id: string) => [...customerKeys.all, 'detail', id] as const,
}

export function useCustomers(filters: CustomerFilters) {
  return useQuery({
    queryKey: customerKeys.list(filters),
    queryFn: () => getCustomers(filters),
    placeholderData: keepPreviousData,
  })
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => getCustomer(id),
  })
}

export function useCreateCustomer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CustomerInput) => createCustomer(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: customerKeys.all }),
  })
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CustomerInput }) => updateCustomer(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: customerKeys.all }),
  })
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteCustomer(id),
    onSuccess: (_data, id) => {
      // The detail entry is gone for good: drop it instead of refetching a missing row.
      queryClient.removeQueries({ queryKey: customerKeys.detail(id) })
      return queryClient.invalidateQueries({ queryKey: customerKeys.lists() })
    },
  })
}