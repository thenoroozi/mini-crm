import { NavLink } from 'react-router'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/cn'
import { Logo } from './Logo'
import { settings, sidebarSections } from './navItems'
import type { NavItem } from './navItems'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../features/auth/useAuth'

function SidebarItem({ item }: { item: NavItem }) {
   const Icon = item.icon
   const base = 'flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] font-medium'

   if (item.disabled) {
      return (
         <span aria-disabled="true" className={cn(base, 'cursor-not-allowed text-muted/60')}>
            <Icon className="size-[18px]" aria-hidden />
            {item.label}
            <Badge className="ml-auto" tone='success'>Soon</Badge>
         </span>
      )
   }

   return (
      <NavLink
         to={item.to}
         end={item.to === '/'}
         className={({ isActive }) =>
            cn(
               base,
               'transition-colors',
               isActive ? 'bg-primary-soft font-semibold text-primary' : 'text-ink hover:bg-canvas',
            )
         }
      >
         <Icon className="size-[18px]" aria-hidden />
         {item.label}
      </NavLink>
   )
}

export function Sidebar() {
   const { signOut } = useAuth()

   return (
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[188px] flex-col border-r border-line bg-surface px-3 py-6 lg:flex xl:w-[246px] xl:px-4">
         <div className="px-2">
            <Logo />
         </div>

         <nav aria-label="Main" className="mt-8 flex flex-1 flex-col gap-6 overflow-y-auto">
            {sidebarSections.map((section) => (
               <div key={section.heading}>
                  <p className="mb-2 px-3 text-[10px] font-bold tracking-wider text-muted/70">
                     {section.heading}
                  </p>
                  <ul className="flex flex-col gap-1">
                     {section.items.map((item) => (
                        <li key={item.to}>
                           <SidebarItem item={item} />
                        </li>
                     ))}
                  </ul>
               </div>
            ))}
         </nav>

         <div className="flex flex-col gap-1 border-t border-line pt-4">
            <SidebarItem item={settings} />
            <button
               type="button"
               onClick={() => void signOut()}
               className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-[13px] font-medium text-ink transition-colors hover:bg-canvas"
            >
               <LogOut className="size-[18px]" aria-hidden />
               Sign out
            </button>
         </div>
      </aside>
   )
}