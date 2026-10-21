import { useEffect, useRef, useState } from 'react'
import { LogOut, Settings } from 'lucide-react'
import { Link } from 'react-router'
import { getDisplayName } from '../../features/auth/getDisplayName'
import { useAuth } from '../../features/auth/useAuth'
import { Avatar } from '../ui/Avatar'

const itemClass =
  'flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-ink transition-colors hover:bg-canvas focus-visible:outline-2 focus-visible:outline-primary'

export function UserMenu() {
  const { user, signOut } = useAuth()
  const name = getDisplayName(user)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') setOpen(true)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') setOpen(false)
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label="Account menu"
        aria-expanded={open}
        aria-controls="user-menu"
        onClick={() => setOpen(true)}
        className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Avatar name={name} />
      </button>

      {open && (
        // The top padding bridges the gap so the pointer never leaves the hover area.
        <div id="user-menu" className="absolute right-0 top-full z-30 w-64 pt-2">
          <div className="rounded-xl border border-line bg-surface p-2 shadow-card">
            <div className="flex items-center gap-3 px-3 py-3">
              <Avatar name={name} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{name}</p>
                <p className="truncate text-xs text-muted">{user?.email}</p>
              </div>
            </div>

            <div className="my-1 border-t border-line" />

            <Link to="/settings" onClick={() => setOpen(false)} className={itemClass}>
              <Settings className="size-4 text-muted" aria-hidden />
              Settings
            </Link>
            <button type="button" onClick={() => void signOut()} className={itemClass}>
              <LogOut className="size-4 text-muted" aria-hidden />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}