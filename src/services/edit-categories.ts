import { env } from '@/types/env'
import axios from 'axios'
export async function editCategorie(id: string, name: string) {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Token not found')
  }

  const response = await axios.put(
    `${env.VITE_URL_API}/categories/${id}`,
    {
      name,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }
  )

  if (!response.data) {
    throw new Error('Failed to edit category')
  }
  return response.data
}
