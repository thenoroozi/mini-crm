import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../../components/ui/Button'
import { PasswordInput } from '../../../components/ui/PasswordInput'
import { getErrorMessage } from '../../../lib/errors'
import { changePassword } from '../api'
import { passwordSchema } from '../schemas'
import type { PasswordFormValues } from '../schemas'

const emptyValues: PasswordFormValues = { password: '', confirmPassword: '' }

export function PasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: emptyValues,
  })

  async function onSubmit(values: PasswordFormValues) {
    setServerError(null)
    setSaved(false)
    try {
      await changePassword(values.password)
      reset(emptyValues)
      setSaved(true)
    } catch (error) {
      setServerError(getErrorMessage(error))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <PasswordInput
        label="New password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <PasswordInput
        label="Confirm new password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      {serverError && (
        <p role="alert" className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
          {serverError}
        </p>
      )}

      <div className="flex items-center justify-end gap-3">
        {saved && !isDirty && (
          <p role="status" className="text-sm text-success">
            Password updated
          </p>
        )}
        <Button type="submit" loading={isSubmitting} disabled={!isDirty}>
          Update password
        </Button>
      </div>
    </form>
  )
}