import { z } from 'zod'

export const profileSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name').max(80, 'Name is too long'),
})

export const passwordSchema = z
  .object({
    password: z.string().min(8, 'Use at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export type ProfileFormValues = z.infer<typeof profileSchema>
export type PasswordFormValues = z.infer<typeof passwordSchema>