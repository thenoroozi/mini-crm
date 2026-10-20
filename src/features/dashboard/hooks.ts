import { useQuery } from '@tanstack/react-query'
import { getDashboardStats, getNewCustomersByDay, getRecentActivities } from './api'

// These keys start with "customers" / "activities" on purpose: mutations in those
// features invalidate by prefix, so the dashboard refreshes without extra wiring.
export const dashboardKeys = {
  stats: ['customers', 'stats'] as const,
  newByDay: (days: number) => ['customers', 'new-by-day', days] as const,
  recentActivities: (limit: number) => ['activities', 'recent', limit] as const,
}

export function useDashboardStats() {
  return useQuery({ queryKey: dashboardKeys.stats, queryFn: getDashboardStats })
}

export function useNewCustomersByDay(days: number) {
  return useQuery({
    queryKey: dashboardKeys.newByDay(days),
    queryFn: () => getNewCustomersByDay(days),
  })
}

export function useRecentActivities(limit: number) {
  return useQuery({
    queryKey: dashboardKeys.recentActivities(limit),
    queryFn: () => getRecentActivities(limit),
  })
}