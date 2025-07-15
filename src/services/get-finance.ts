import { env } from '@/types/env'
import axios from 'axios'

export async function getFinance() {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Token not found')
  }

  try {
    const response = await axios.get(`${env.VITE_URL_API}/finance/values`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })

    if (!response.data) {
      throw new Error('No data received from the server')
    }

    return response.data
  } catch (error) {
    console.error('Error fetching finance data:', error)
    throw error
  }
}
