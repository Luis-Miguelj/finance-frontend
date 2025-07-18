import axios from 'axios'
import { env } from '@/types/env'
export async function deleteFinance(id: string) {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }

    const response = await axios.delete(`${env.VITE_URL_API}/finance/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error retrieving token:', error)
    throw error
  }
}
