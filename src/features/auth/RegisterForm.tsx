import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { PasswordInput } from '../../components/ui/PasswordInput'
import { supabase } from '../../lib/supabase'
import { registerSchema } from './schemas'
import type { RegisterValues } from './schemas'

export function RegisterForm() {
   const [serverError, setServerError] = useState<string | null>(null)
   const [needsConfirmation, setNeedsConfirmation] = useState(false)
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) })

   async function onSubmit({ fullName, email, password }: RegisterValues) {
      setServerError(null)
      const { data, error } = await supabase.auth.signUp({
         email,
         password,
         options: { data: { full_name: fullName } },
      })
      if (error) {
         setServerError(error.message)
         return
      }
      // No session means Supabase is waiting for the user to confirm their email.
      if (!data.session) setNeedsConfirmation(true)
   }

   if (needsConfirmation) {
      return (
         <div role="status" className="flex flex-col gap-4 text-sm">
            <p className="rounded-lg bg-success-soft px-3 py-2 text-success">
               Account created. Check your email and confirm your address to sign in.
            </p>
            <Link to="/login" className="text-center font-semibold text-primary hover:underline">
               Back to sign in
            </Link>
         </div>
      )
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
         <Input
            label="Full name"
            autoComplete="name"
            error={errors.fullName?.message}
            {...register('fullName')}
         />
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
            Create account
         </Button>

         <p className="text-center text-sm text-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
               Sign in
            </Link>
         </p>
      </form>
   )
}