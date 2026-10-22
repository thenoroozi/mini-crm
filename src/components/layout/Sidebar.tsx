import { LogOut } from 'lucide-react'
import { NavLink } from 'react-router'
import { useAuth } from '../../features/auth/useAuth'
import { cn } from '../../lib/cn'
import { Avatar } from '../ui/Avatar'
import { Logo } from './Logo'
import { sidebarItems } from './navItems'
import type { NavItem } from './navItems'
import { getDisplayName } from '../../features/auth/getDisplayName'

const itemBase = 'flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium'

function SidebarItem({ item }: { item: NavItem }) {
  const Icon = item.icon

  if (item.disabled) {
    return (
      <span aria-disabled="true" className={cn(itemBase, 'cursor-not-allowed text-slate-500')}>
        <Icon className="size-5" aria-hidden />
        {item.label}
        <span className="ml-auto rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-green-400">
          Soon
        </span>
      </span>
    )
  }

  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        cn(
          itemBase,
          'transition-colors',
          isActive
            ? 'bg-primary text-white shadow-lg shadow-primary/30'
            : 'text-slate-300 hover:bg-white/5 hover:text-white',
        )
      }
    >
      <Icon className="size-5" aria-hidden />
      {item.label}
    </NavLink>
  )
}

export function Sidebar() {
  const { user, signOut } = useAuth()
  const name = getDisplayName(user)

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-[188px] flex-col bg-slate-900 px-3 py-6 lg:flex xl:w-[246px] xl:px-4">
      <div className="px-2">
        <Logo tone="dark" />
      </div>

      <nav aria-label="Main" className="mt-8 flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-1.5">
          {sidebarItems.map((item) => (
            <li key={item.to}>
              <SidebarItem item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2.5">
        <Avatar name={name} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{name}</p>
          <p className="truncate text-xs text-slate-400">{user?.email}</p>
        </div>
        <button
          type="button"
          onClick={() => void signOut()}
          aria-label="Sign out"
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-primary"
        >
          <LogOut className="size-4" aria-hidden />
        </button>
      </div>
    </aside>
  )
}