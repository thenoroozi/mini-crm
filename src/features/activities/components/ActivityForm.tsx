import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../../components/ui/Button'
import { Select } from '../../../components/ui/Select'
import { Textarea } from '../../../components/ui/Textarea'
import { getErrorMessage } from '../../../lib/errors'
import { useCreateActivity } from '../hooks'
import { activitySchema } from '../schemas'
import type { ActivityFormValues } from '../schemas'

export function ActivityForm({ customerId }: { customerId: string }) {
  const createActivity = useCreateActivity()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: { type: 'note', description: '' },
  })

  async function onSubmit(values: ActivityFormValues) {
    setServerError(null)
    try {
      await createActivity.mutateAsync({ customer_id: customerId, ...values })
      // Keep the chosen type, clear the text.
      reset({ type: values.type, description: '' })
    } catch (error) {
      setServerError(getErrorMessage(error))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-[10rem_1fr]">
        <Select label="Type" error={errors.type?.message} {...register('type')}>
          <option value="note">Note</option>
          <option value="call">Call</option>
          <option value="email">Email</option>
        </Select>
        <Textarea
          label="Details"
          rows={3}
          placeholder="What happened?"
          error={errors.description?.message}
          {...register('description')}
        />
      </div>

      {serverError && (
        <p role="alert" className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
          {serverError}
        </p>
      )}

      <div className="flex justify-end">
        <Button type="submit" loading={isSubmitting}>
          Add activity
        </Button>
      </div>
    </form>
  )
}