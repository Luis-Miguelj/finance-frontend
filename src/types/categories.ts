import { z } from 'zod'

export const categoriesSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

export type CategoriesFormData = z.infer<typeof categoriesSchema>
