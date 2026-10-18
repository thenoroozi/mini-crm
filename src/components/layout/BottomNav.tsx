import { NavLink } from 'react-router'
import { cn } from '../../lib/cn'
import { bottomNav } from './navItems'

export function BottomNav() {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {bottomNav.map((item) => {
          const Icon = item.icon
          const label = item.mobileLabel ?? item.label
          const base = 'flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-medium'

          return (
            <li key={item.to}>
              {item.disabled ? (
                <span aria-disabled="true" title="Coming soon" className={cn(base, 'cursor-not-allowed text-muted/50')}>
                  <Icon className="size-5" aria-hidden />
                  {label}
                </span>
              ) : (
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => cn(base, isActive ? 'text-primary' : 'text-muted')}
                >
                  <Icon className="size-5" aria-hidden />
                  {label}
                </NavLink>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}