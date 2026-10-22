import { ArrowUpRight, Globe } from 'lucide-react'
import { Link } from 'react-router'
import logoMark from '../../assets/brand/logo-mark.png'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/thenoroozi',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.24-5.1 5.51.4.35.75 1.02.75 2.06v3.1c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/Hanocode',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.8" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Portfolio',
    href: 'https://portfolio-beryl-nine-42.vercel.app/',
    icon: <Globe size={20} />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hamed-noroozi-570465208/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM8.01 18.46H5.02V9.04h2.99v9.42ZM6.51 7.75a1.73 1.73 0 1 1 0-3.46 1.73 1.73 0 0 1 0 3.46Zm11.95 10.71h-2.98v-4.58c0-1.09-.02-2.49-1.52-2.49-1.52 0-1.75 1.18-1.75 2.41v4.66H9.23V9.04h2.86v1.29h.04c.4-.76 1.37-1.56 2.82-1.56 3.01 0 3.56 1.98 3.56 4.56v4.42Z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="bg-[#111426] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0 })}
              className="flex items-center gap-3"
            >
              <img src={logoMark} alt="" className="size-8" />
              <span className="text-xl font-bold">
                Relay <span className="text-primary">CRM</span>
              </span>
            </Link>

            <div className="max-w-md">
              <p className="mt-3 text-sm leading-7 text-white/75">
                A simpler way to manage customer relationships. Keep your information organized,
                stay focused, and bring everything into one clear view with Relay CRM.
              </p>

              <p className="mt-3 text-xs leading-6 text-white/55">
                Designed and built with care by Hamed Noroozi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                target="_blank"
                rel="noreferrer"
                className="flex size-11 items-center justify-center rounded-xl border border-white/20 text-white transition hover:bg-white hover:text-primary"
              >
                <span className="size-5">{icon}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-white/20 pt-6 text-sm text-white/75 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Relay CRM. All rights reserved.</p>

          <a
            href="https://relay-crm-six.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-white transition hover:text-white/70"
          >
            Live Demo <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}