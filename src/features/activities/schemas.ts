import { z } from 'zod'

export const activitySchema = z.object({
  type: z.enum(['note', 'call', 'email']),
  description: z
    .string()
    .trim()
    .min(1, 'Write something first')
    .max(1000, 'Keep it under 1000 characters'),
})

export type ActivityFormValues = z.infer<typeof activitySchema>