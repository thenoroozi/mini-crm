import { LogOut } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useAuth } from '../features/auth/useAuth'
import { PasswordForm } from '../features/settings/components/PasswordForm'
import { ProfileForm } from '../features/settings/components/ProfileForm'
import { SettingsSection } from '../features/settings/components/SettingsSection'

export function SettingsPage() {
  const { signOut } = useAuth()

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <SettingsSection title="Profile" description="Your name is shown in the sidebar and header.">
        <ProfileForm />
      </SettingsSection>

      <SettingsSection title="Password" description="Use at least 8 characters.">
        <PasswordForm />
      </SettingsSection>

      <SettingsSection title="Session" description="Sign out of Relay on this device.">
        <Button variant="outline" onClick={() => void signOut()}>
          <LogOut className="size-4" aria-hidden />
          Sign out
        </Button>
      </SettingsSection>
    </div>
  )
}