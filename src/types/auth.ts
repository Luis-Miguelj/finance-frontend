import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

//Tipagem para cadastro de usuário
export const registerSchema = z.object({
  name: z
    .string({ message: 'O nome é obrigarório' })
    .min(1, 'O nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export type TypeRegisterUser = z.infer<typeof registerSchema>
export type TypeUser = z.infer<typeof userSchema>
