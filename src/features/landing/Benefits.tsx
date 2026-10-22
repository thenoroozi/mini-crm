import { ChartNoAxesCombined, CheckCircle2, Clock3 } from 'lucide-react'
import { SectionHeader } from './SectionHeader'

const benefits = [
  {
    icon: CheckCircle2,
    title: 'Stay Organized',
    description: 'Keep customer information structured and easy to manage in one place.',
  },
  {
    icon: Clock3,
    title: 'Save Time',
    description: 'Spend less time managing scattered information and more time on your work.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'See the Bigger Picture',
    description:
      'Get a clearer overview of your customer records through one central dashboard.',
  },
]

export function Benefits() {
  return (
    <section id="benefits" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="BENEFITS"
          title="Work Smarter with Relay CRM"
          description="Stay focused on your customers with a simpler way to manage information."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, description }) => (
            <article key={title} className="flex gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}