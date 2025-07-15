import { env } from '@/types/env'
import axios from 'axios'

export async function getCategories() {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${env.VITE_URL_API}/categories`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}
