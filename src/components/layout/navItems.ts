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

const overview: NavItem = {
  label: 'Overview',
  mobileLabel: 'Home',
  to: '/',
  icon: LayoutDashboard,
  title: 'Overview',
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

export const sidebarSections = [
  { heading: 'MAIN', items: [overview, customers] },
  { heading: 'WORKSPACE', items: [inbox, analytics] },
]

export const bottomNav = [overview, inbox, customers, analytics, settings]

const allItems = [overview, customers, inbox, analytics, settings]

export function getCurrentNavItem(pathname: string): NavItem {
  if (pathname === '/') return overview
  return allItems.find((item) => item.to !== '/' && pathname.startsWith(item.to)) ?? overview
}