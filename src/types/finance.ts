import { z } from 'zod'

export const financeSchema = z.object({
  categories: z.string(),
  value: z.number(),
  type: z.string(),
})

export type TypeFinance = z.infer<typeof financeSchema>
