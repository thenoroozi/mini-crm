import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from './api'
import type { CustomerFilters, CustomerInput } from './types'
import type { QueryClient } from '@tanstack/react-query'
import { activityKeys } from '../activities/hooks'

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
function refreshAfterChange(queryClient: QueryClient) {
   return Promise.all([
      queryClient.invalidateQueries({ queryKey: customerKeys.all }),
      queryClient.invalidateQueries({ queryKey: activityKeys.all }),
   ])
}
export function useCreateCustomer() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: (input: CustomerInput) => createCustomer(input),
      onSuccess: () => refreshAfterChange(queryClient),
   })
}

export function useUpdateCustomer() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: ({ id, input }: { id: string; input: CustomerInput }) => updateCustomer(id, input),
      onSuccess: () => refreshAfterChange(queryClient),
   })
}

export function useDeleteCustomer() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: (id: string) => deleteCustomer(id),
      onSuccess: (_data, id) => {
         queryClient.removeQueries({ queryKey: customerKeys.detail(id) })
         return refreshAfterChange(queryClient)
      },
   })
}