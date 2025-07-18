import axios from 'axios'
import { env } from '@/types/env'
import type { TypeUser } from '@/types/auth'

export async function loginUser(
  data: TypeUser
): Promise<{ message: string; token: string }> {
  try {
    const response = await axios.post(`${env.VITE_URL_API}/auth/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.status !== 200) {
      throw new Error('Erro ao fazer login')
    }

    return response.data
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    throw error
  }
}
