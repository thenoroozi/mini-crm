import { ContactRound, LayoutDashboard, Users } from 'lucide-react'
import { SectionHeader } from './SectionHeader'

const features = [
   {
      icon: Users,
      title: 'Customer Management',
      description:
         'Keep customer information organized and manage your customer records in one place.',
   },
   {
      icon: LayoutDashboard,
      title: 'Dashboard Overview',
      description: 'Get a clear overview of your CRM data through an organized dashboard.',
   },
   {
      icon: ContactRound,
      title: 'Easy Customer Access',
      description: 'Access customer details easily and keep important information within reach.',
   },
]

export function Features() {
   return (
      <section id="features" className="bg-slate-50 py-20 sm:py-24">
         <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeader
               eyebrow="FEATURES"
               title="Everything You Need to Stay Organized"
               description="Simple tools to help you manage customer information with clarity and ease."
            />

            <div className="grid gap-6 md:grid-cols-3">
               {features.map(({ icon: Icon, title, description }) => (
                  <article
                     key={title}
                     className="rounded-2xl border border-slate-100 bg-white p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-primary/5"
                  >
                     <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <Icon size={24} />
                     </div>
                     <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                     <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
                  </article>
               ))}
            </div>
         </div>
      </section>
   )
}