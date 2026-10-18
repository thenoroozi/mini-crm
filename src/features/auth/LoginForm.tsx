import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { PasswordInput } from '../../components/ui/PasswordInput'
import { supabase } from '../../lib/supabase'
import { loginSchema } from './schemas'
import type { LoginValues } from './schemas'

export function LoginForm() {
   const [serverError, setServerError] = useState<string | null>(null)
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

   async function onSubmit(values: LoginValues) {
      setServerError(null)
      const { error } = await supabase.auth.signInWithPassword(values)
      if (error) setServerError(error.message)
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
         <Input
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
         />
         <PasswordInput
            label="Password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password')}
         />

         {serverError && (
            <p role="alert" className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
               {serverError}
            </p>
         )}

         <Button type="submit" loading={isSubmitting}>
            Sign in
         </Button>

         <p className="text-center text-sm text-muted">
            No account?{' '}
            <Link to="/register" className="font-semibold text-primary hover:underline">
               Create one
            </Link>
         </p>
      </form>
   )
}