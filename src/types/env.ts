import { z } from 'zod'

console.log('Environment variables loaded:', import.meta.env)

export const envSchema = z.object({
  VITE_URL_API: z.string(),
})

export const env = envSchema.parse(import.meta.env)
