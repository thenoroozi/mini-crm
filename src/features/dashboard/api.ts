import { supabase } from '../../lib/supabase'
import type { DailyCount, DashboardStats, RecentActivity } from './types'

export async function getDashboardStats(): Promise<DashboardStats> {
  const { data, error } = await supabase.rpc('dashboard_stats').single()
  if (error) throw error

  return {
    totalCustomers: data.total_customers,
    activeCustomers: data.active_customers,
    inactiveCustomers: data.inactive_customers,
    newLast30Days: data.new_last_30_days,
    totalRevenue: data.total_revenue,
  }
}

function dayKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

// Customers created per day for the last `days` days, using the user's local time zone.
export async function getNewCustomersByDay(days: number): Promise<DailyCount[]> {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - (days - 1))

  const { data, error } = await supabase
    .from('customers')
    .select('created_at')
    .gte('created_at', start.toISOString())
  if (error) throw error

  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
  const buckets = new Map<string, DailyCount>()
  for (let i = 0; i < days; i++) {
    const day = new Date(start)
    day.setDate(start.getDate() + i)
    const key = dayKey(day)
    buckets.set(key, { date: key, label: weekday.format(day), count: 0 })
  }

  for (const row of data) {
    const bucket = buckets.get(dayKey(new Date(row.created_at)))
    if (bucket) bucket.count += 1
  }

  return [...buckets.values()]
}

export async function getRecentActivities(limit: number): Promise<RecentActivity[]> {
  const { data, error } = await supabase
    .from('activities')
    .select('id, type, description, created_at, customer_id, customers(name)')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error

  return data.map((row) => ({
    id: row.id,
    type: row.type,
    description: row.description,
    createdAt: row.created_at,
    customerId: row.customer_id,
    customerName: row.customers?.name ?? 'Unknown customer',
  }))
}