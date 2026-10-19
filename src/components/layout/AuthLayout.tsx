import type { ReactNode } from 'react'
import logoMark from '../../assets/brand/logo-icon-dark.png'
import { Card } from '../ui/Card'

type AuthLayoutProps = {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-4">
      <Card className="w-full max-w-sm p-6 sm:p-8">
        <img src={logoMark} alt="Relay" className="mb-2 size-12 mx-auto" />
        <h1 className="text-xl font-bold text-center">{title}</h1>
        <p className="mb-6 mt-1 text-sm text-muted">{subtitle}</p>
        {children}
      </Card>
    </div>
  )
}