import { AuthLayout } from '../components/layout/AuthLayout'
import { RegisterForm } from '../features/auth/RegisterForm'

export function RegisterPage() {
  return (
    <AuthLayout title="Create your account" subtitle="Start managing your customers with Relay.">
      <RegisterForm />
    </AuthLayout>
  )
}