export type DashboardStats = {
  totalCustomers: number
  activeCustomers: number
  inactiveCustomers: number
  newLast30Days: number
  totalRevenue: number
}

export type DailyCount = {
  date: string
  label: string
  count: number
}

export type RecentActivity = {
  id: string
  type: string
  description: string
  createdAt: string
  customerId: string
  customerName: string
}