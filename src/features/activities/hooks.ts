import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createActivity, getActivities } from './api'
import type { ActivityInput } from './types'

export const activityKeys = {
  all: ['activities'] as const,
  byCustomer: (customerId: string) => [...activityKeys.all, 'customer', customerId] as const,
}

export function useActivities(customerId: string) {
  return useQuery({
    queryKey: activityKeys.byCustomer(customerId),
    queryFn: () => getActivities(customerId),
  })
}

export function useCreateActivity() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: ActivityInput) => createActivity(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: activityKeys.all }),
  })
}