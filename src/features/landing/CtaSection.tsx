import { Link } from 'react-router'

export function CtaSection() {
  return (
    <section className="relative isolate mx-5 my-10 overflow-hidden rounded-2xl bg-[#1c1c3b] px-5 py-9 text-center sm:mx-8 lg:mx-24 lg:max-w-7xl">
      <div
        aria-hidden="true"
        className="absolute -right-6 -top-24 -z-10 size-48 rounded-full bg-primary opacity-20 sm:size-56"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 right-0 -z-10 size-40 rounded-full bg-primary opacity-15 sm:size-48"
      />

      <p className="text-[10px] font-semibold uppercase tracking-wide text-primary-soft">
        Get Started with Relay
      </p>

      <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Ready to Get Organized?</h2>

      <p className="mt-2 text-sm text-white/70">
        Start managing your customer information with Relay.
      </p>

      <Link
        to="/register"
        className="mx-auto mt-3 flex min-h-10 w-full max-w-52 items-center justify-center rounded-lg bg-primary px-4 py-2 text-base font-semibold text-white transition hover:opacity-90"
      >
        Create Your Account
      </Link>
    </section>
  )
}