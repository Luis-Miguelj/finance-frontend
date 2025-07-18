import { z } from 'zod'

export const envSchema = z.object({
  VITE_URL_API: z.string(),
  VITE_PRODUCTION_URL: z.string(),
})

export const env = envSchema.parse(import.meta.env)
