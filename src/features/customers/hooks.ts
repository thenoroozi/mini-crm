import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from './api'
import type { CustomerFilters, CustomerInput } from './types'

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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: customerKeys.all }),
  })
}