import axios from 'axios'
import { env } from '@/types/env'
export async function createCategories(categoryName: string) {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.post(
      `${env.VITE_URL_API}/categories`,
      {
        name: categoryName,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    )

    if (!response) throw new Error('Failed to create category')

    return await response.data
  } catch (error) {
    console.error('Error creating category:', error)
    return new Error(
      `${error}, verifique se essa categoria já existe, caso não, erro no servidor.`
    )
  }
}
