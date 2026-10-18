import { AuthLayout } from '../components/layout/AuthLayout'
import { LoginForm } from '../features/auth/LoginForm'

export function LoginPage() {
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your Relay account.">
      <LoginForm />
    </AuthLayout>
  )
}