import axios from 'axios'
import type { TypeFinance } from '@/types/finance'
import { env } from '@/types/env'
export async function editFinance(data: TypeFinance, id: string) {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const response = await axios.put(
      `${env.VITE_URL_API}/finance/${id}`,
      {
        category: data.categories,
        ...data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('Error editing finance data:', error)
    throw error
  }
}
