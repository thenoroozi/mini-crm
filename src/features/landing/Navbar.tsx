import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link } from 'react-router'
import logoMark from '../../assets/brand/logo-mark.png'
import { cn } from '../../lib/cn'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'About', href: '#about' },
]

function GetStartedLink({ className }: { className: string }) {
  return (
    <Link
      to="/register"
      className={cn(
        'inline-flex items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-[#4938ed]',
        className,
      )}
    >
      Get Started Free
      <ArrowUpRight size={16} />
    </Link>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const MenuIcon = open ? X : Menu

  return (
    <header className="fixed z-50 w-full border-b border-slate-100 bg-white/30 backdrop-blur-2xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10"
      >
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0 })}
          aria-label="Relay CRM home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <img src={logoMark} alt="" className="size-8" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Relay<span className="text-primary"> CRM</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-primary"
          >
            Sign In
          </Link>
          <GetStartedLink className="py-2.5 transition-all hover:shadow-lg hover:shadow-primary/20" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 md:hidden"
        >
          <MenuIcon size={21} />
        </button>
      </nav>

      {open && (
        <div id="mobile-navigation" className="border-t border-slate-100 bg-white p-5 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg p-3 text-sm font-medium text-slate-700 transition-colors hover:bg-primary-soft hover:text-primary"
              >
                {label}
              </a>
            ))}

            <div className="my-3 border-t border-slate-100" />

            <Link
              to="/login"
              className="rounded-lg p-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Sign In
            </Link>
            <GetStartedLink className="mt-1 justify-center py-3 transition-colors" />
          </div>
        </div>
      )}
    </header>
  )
}