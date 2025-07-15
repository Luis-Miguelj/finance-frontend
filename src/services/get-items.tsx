import { env } from '@/types/env'
import axios from 'axios'
export async function getItems() {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${env.VITE_URL_API}/finance/items`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  })

  if (response.status !== 200) {
    throw new Error('Failed to fetch items')
  }
  return response.data
}
