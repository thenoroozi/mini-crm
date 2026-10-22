import { SectionHeader } from './SectionHeader'

const stack = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Vite',
  'TanStack Query',
  'React Router',
  'Supabase',
  'PostgreSQL',
]

const cardClass = 'rounded-2xl border border-slate-100 bg-white p-7 shadow-lg'

export function About() {
  return (
    <section id="about" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="ABOUT"
          title="A Small CRM, Built with Care"
          description="The idea behind Relay CRM and the tools it is built with."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <article className={cardClass}>
            <h3 className="text-lg font-semibold text-slate-900">About the project</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Relay CRM is a compact customer management app. It covers the everyday basics: adding
              and editing customers, searching and filtering your list, and keeping an activity
              history for each customer.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              A dashboard summarizes your customers in one place. Every account sees only its own
              data, protected at the database level with Row Level Security.
            </p>
          </article>

          <article className={cardClass}>
            <h3 className="text-lg font-semibold text-slate-900">Built with</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              A typed React front end talking to a real PostgreSQL database through Supabase, with
              authentication and server data handled end to end.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}