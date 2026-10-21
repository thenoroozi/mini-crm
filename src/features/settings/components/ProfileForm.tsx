import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { getErrorMessage } from '../../../lib/errors'
import { useAuth } from '../../auth/useAuth'
import { updateProfileName } from '../api'
import { profileSchema } from '../schemas'
import type { ProfileFormValues } from '../schemas'

export function ProfileForm() {
  const { user } = useAuth()
  const [serverError, setServerError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: String(user?.user_metadata?.full_name ?? '') },
  })

  async function onSubmit(values: ProfileFormValues) {
    if (!user) return
    setServerError(null)
    setSaved(false)
    try {
      await updateProfileName(user.id, values.fullName)
      reset({ fullName: values.fullName })
      setSaved(true)
    } catch (error) {
      setServerError(getErrorMessage(error))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Input label="Email" value={user?.email ?? ''} disabled readOnly />
      <Input
        label="Full name"
        autoComplete="name"
        error={errors.fullName?.message}
        {...register('fullName')}
      />

      {serverError && (
        <p role="alert" className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
          {serverError}
        </p>
      )}

      <div className="flex items-center justify-end gap-3">
        {saved && !isDirty && (
          <p role="status" className="text-sm text-success">
            Saved
          </p>
        )}
        <Button type="submit" loading={isSubmitting} disabled={!isDirty}>
          Save changes
        </Button>
      </div>
    </form>
  )
}