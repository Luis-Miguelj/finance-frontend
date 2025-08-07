import { env } from '@/types/env'
import axios from 'axios'
export async function getDashboard() {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Token not found')
  }

  try {
    const response = await axios.get(`${env.VITE_URL_API}/dashboard`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })

    if (!response.data) {
      throw new Error('No data received from the server')
    }

    console.log('Dashboard data fetched successfully:', response.data)

    return response.data
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    throw error
  }
}
