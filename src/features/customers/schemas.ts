import { z } from 'zod'
import type { CustomerInput } from './types'

export const customerSchema = z.object({
  name: z.string().trim().min(2, 'Enter the customer name').max(100, 'Name is too long'),
  phone: z.string().trim().max(30, 'Phone number is too long'),
  email: z.union([z.literal(''), z.email('Enter a valid email address')]),
  address: z.string().trim().max(200, 'Address is too long'),
  status: z.enum(['active', 'inactive']),
  total_spent: z
    .number({ error: 'Enter a valid amount' })
    .min(0, 'Amount cannot be negative')
    .max(9_999_999_999, 'Amount is too large'),
})

export type CustomerFormValues = z.infer<typeof customerSchema>

// Empty optional fields are stored as NULL, not as empty strings.
export function toCustomerInput(values: CustomerFormValues): CustomerInput {
  return {
    name: values.name,
    phone: values.phone || null,
    email: values.email || null,
    address: values.address || null,
    status: values.status,
    total_spent: values.total_spent,
  }
}