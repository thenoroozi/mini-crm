import { useLocation } from 'react-router'
import { Avatar } from '../ui/Avatar'
import { Logo } from './Logo'
import { SearchBox } from './SearchBox'
import { getCurrentNavItem } from './navItems'
import { useAuth } from '../../features/auth/useAuth'

export function Header() {
   const { pathname } = useLocation()
   const current = getCurrentNavItem(pathname)
   const { user } = useAuth()
   const userName = String(user?.user_metadata?.full_name ?? user?.email ?? 'User')

   return (
      <header className="px-4 pb-5 pt-4 lg:px-8 lg:pb-6 lg:pt-7">
         <div className="mb-4 flex items-center justify-between lg:hidden">
            <Logo />
            <Avatar name={userName} />
         </div>

         <div className="flex items-start justify-between gap-4">
            <div>
               <h1 className="text-2xl font-bold">{current.title}</h1>
               <p className="mt-1 text-sm text-muted">{current.subtitle}</p>
            </div>
            <div className="hidden items-center gap-3 lg:flex">
               <SearchBox />
               <Avatar name={userName} />
            </div>
         </div>

         <div className="mt-4 lg:hidden">
            <SearchBox />
         </div>
      </header>
   )
}