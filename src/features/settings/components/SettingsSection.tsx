import type { ReactNode } from 'react'
import { Card } from '../../../components/ui/Card'

type SettingsSectionProps = {
  title: string
  description: string
  children: ReactNode
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mb-5 mt-1 text-xs text-muted">{description}</p>
      {children}
    </Card>
  )
}