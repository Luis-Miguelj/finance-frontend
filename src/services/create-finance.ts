import axios from 'axios'
import type { TypeFinance } from '@/types/finance'
import { env } from '@/types/env'
export async function createFinance(items: TypeFinance) {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Token not found')
  }

  const response = await axios.post(
    `${env.VITE_URL_API}/finance`,
    {
      categoryId: items.categories,
      ...items,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }
  )

  if (!response) {
    throw new Error('Failed to create finance record')
  }

  const data = await response.data

  return data
}
