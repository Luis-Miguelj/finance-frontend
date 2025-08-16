import { env } from '@/types/env'
import axios from 'axios'
export async function deleteCategorie(id: string) {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Token not found')
  }
  const response = await axios.delete(`${env.VITE_URL_API}/categories/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })

  if (!response.data) {
    throw new Error('Failed to delete category')
  }

  return response.data
}
