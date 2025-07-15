import { env } from '@/types/env'
import axios from 'axios'
export async function getLucro() {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Token not found')
  }

  try {
    const response = await axios.get(`${env.VITE_URL_API}/finance/lucro`, {
      headers: {
        Authorization: token,
      },
    })

    if (!response.data) {
      throw new Error('No data received from the server')
    }

    return response.data
  } catch (error) {
    console.error('Error fetching lucro data:', error)
    throw error
  }
}
