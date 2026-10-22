import { Inbox, LayoutDashboard, Settings, TrendingUp, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type NavItem = {
  label: string
  mobileLabel?: string
  to: string
  icon: LucideIcon
  disabled?: boolean
  title: string
  subtitle: string
}

const dashboard: NavItem = {
  label: 'Dashboard',
  mobileLabel: 'Home',
  to: '/dashboard',
  icon: LayoutDashboard,
  title: 'Dashboard',
  subtitle: 'Here’s what’s happening with your customers today.',
}

const customers: NavItem = {
  label: 'Customers',
  to: '/customers',
  icon: Users,
  title: 'Customers',
  subtitle: 'Manage customer profiles, history and contact details.',
}

const inbox: NavItem = {
  label: 'Inbox',
  to: '/inbox',
  icon: Inbox,
  disabled: true,
  title: 'Inbox',
  subtitle: 'Coming soon.',
}

const analytics: NavItem = {
  label: 'Analytics',
  to: '/analytics',
  icon: TrendingUp,
  disabled: true,
  title: 'Analytics',
  subtitle: 'Coming soon.',
}

export const settings: NavItem = {
  label: 'Settings',
  mobileLabel: 'More',
  to: '/settings',
  icon: Settings,
  title: 'Settings',
  subtitle: 'Manage your profile and preferences.',
}

export const sidebarItems = [dashboard, customers, inbox, analytics, settings]

export const bottomNav = [dashboard, inbox, customers, analytics, settings]

const allItems = [dashboard, customers, inbox, analytics, settings]

export function getCurrentNavItem(pathname: string): NavItem {
  return allItems.find((item) => pathname.startsWith(item.to)) ?? dashboard
}