import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { getErrorMessage } from '../../../lib/errors'
import { useCreateCustomer, useUpdateCustomer } from '../hooks'
import { customerSchema, toCustomerInput } from '../schemas'
import type { CustomerFormValues } from '../schemas'
import type { Customer } from '../types'

type CustomerFormProps = {
  customer?: Customer
  onDone: () => void
  onCancel: () => void
}

function getDefaultValues(customer?: Customer): CustomerFormValues {
  if (!customer) {
    return { name: '', phone: '', email: '', address: '', status: 'active', total_spent: 0 }
  }
  return {
    name: customer.name,
    phone: customer.phone ?? '',
    email: customer.email ?? '',
    address: customer.address ?? '',
    status: customer.status === 'inactive' ? 'inactive' : 'active',
    total_spent: customer.total_spent,
  }
}

export function CustomerForm({ customer, onDone, onCancel }: CustomerFormProps) {
  const createCustomer = useCreateCustomer()
  const updateCustomer = useUpdateCustomer()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: getDefaultValues(customer),
  })

  async function onSubmit(values: CustomerFormValues) {
    setServerError(null)
    const input = toCustomerInput(values)
    try {
      if (customer) await updateCustomer.mutateAsync({ id: customer.id, input })
      else await createCustomer.mutateAsync(input)
      onDone()
    } catch (error) {
      setServerError(getErrorMessage(error))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Input label="Name" autoComplete="off" error={errors.name?.message} {...register('name')} />
      <Input label="Phone" type="tel" autoComplete="off" error={errors.phone?.message} {...register('phone')} />
      <Input label="Email" type="email" autoComplete="off" error={errors.email?.message} {...register('email')} />
      <Input label="Address" autoComplete="off" error={errors.address?.message} {...register('address')} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Status" error={errors.status?.message} {...register('status')}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
        <Input
          label="Total spent (USD)"
          type="number"
          step="0.01"
          min="0"
          inputMode="decimal"
          error={errors.total_spent?.message}
          {...register('total_spent', { valueAsNumber: true })}
        />
      </div>

      {serverError && (
        <p role="alert" className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
          {serverError}
        </p>
      )}

      <div className="mt-2 flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {customer ? 'Save changes' : 'Add customer'}
        </Button>
      </div>
    </form>
  )
}