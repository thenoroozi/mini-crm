import type { ReactNode } from 'react'
import { Card } from '../ui/Card'
import { Logo } from './Logo'

type AuthLayoutProps = {
   title: string
   subtitle: string
   children: ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
   return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
         <Logo />
         <Card className="mt-8 w-full max-w-sm p-6 sm:p-8">
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="mb-6 mt-1 text-sm text-muted">{subtitle}</p>
            {children}
         </Card>
      </div>
   )
}