import { ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router'
import banner from '../../assets/banner/dashboard-banner.svg'
import { cn } from '../../lib/cn'

const buttonBase =
   'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition'

export function Hero() {
   return (
      <section className="overflow-hidden bg-white">
         <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-28 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-28">
            <div>
               <span className="mb-6 inline-flex rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-primary">
                  <svg
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     className="mr-2 w-4 animate-spin"
                  >
                     <path d="M22 12a1 1 0 01-10 0 1 1 0 00-10 0" />
                     <path d="M7 20.7a1 1 0 115-8.7 1 1 0 105-8.6" />
                     <path d="M7 3.3a1 1 0 115 8.6 1 1 0 105 8.6" />
                     <circle cx="12" cy="12" r="10" />
                  </svg>
                  A clearer way to manage your customers
               </span>

               <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  Your Customers.
                  <span className="mt-2 block text-primary">One Clear View.</span>
               </h1>

               <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                  Keep your customer information organized, manage relationships with ease, and get a
                  clearer picture of your business — all in one simple dashboard.
               </p>

               <div className="mt-8 justify-center lg:justify-start flex flex-col gap-3 sm:flex-row">
                  <Link
                     to="/register"
                     className={cn(buttonBase, 'bg-primary text-white hover:opacity-90')}
                  >
                     Get Started Free <ArrowRight size={18} />
                  </Link>

                  <a
                     href="#features"
                     className={cn(
                        buttonBase,
                        'border border-primary-soft text-slate-700 hover:bg-primary-soft',
                     )}
                  >
                     <Play size={16} /> Explore Features
                  </a>
               </div>
            </div>

            <div className="mx-auto w-full max-w-185 lg:ml-auto">
               <img
                  src={banner}
                  alt="Relay CRM dashboard preview"
                  width={741}
                  height={541}
                  className="h-auto w-full rounded-3xl shadow-2xl"
               />
            </div>
         </div>
      </section>
   )
}