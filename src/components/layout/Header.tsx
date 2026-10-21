import { Link, useLocation } from 'react-router'
import { getDisplayName } from '../../features/auth/getDisplayName'
import { useAuth } from '../../features/auth/useAuth'
import { Avatar } from '../ui/Avatar'
import { Logo } from './Logo'
import { SearchBox } from './SearchBox'
import { UserMenu } from './UserMenu'
import { getCurrentNavItem } from './navItems'

export function Header() {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const current = getCurrentNavItem(pathname)
  const userName = getDisplayName(user)

  return (
    <header className="px-4 pb-5 pt-4 lg:px-8 lg:pb-6 lg:pt-7">
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <Logo />
        <Link
          to="/settings"
          aria-label="Open settings"
          className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Avatar name={userName} />
        </Link>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{current.title}</h1>
          <p className="mt-1 text-sm text-muted">{current.subtitle}</p>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <SearchBox />
          <UserMenu />
        </div>
      </div>

      <div className="mt-4 lg:hidden">
        <SearchBox />
      </div>
    </header>
  )
}