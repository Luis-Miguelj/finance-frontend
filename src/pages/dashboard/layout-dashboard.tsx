import { Menu } from '@/components/menu'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Outlet } from 'react-router'

import { Suspense } from 'react'
import { env } from '@/types/env'

interface User {
  id: string
  name: string
  createdAt: Date
}

export function LayoutDashboard() {
  const { data, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await axios.get(`${env.VITE_URL_API}/user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      })
      if (!response.data) {
        throw new Error('Error loading user data')
      }
      return response.data
    },
  })

  if (isLoading) {
    return <Suspense fallback={<div>Loading...</div>} />
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex min-h-screen">
        <Menu name={data?.name} createdAt={data?.createdAt as Date} />
        <div className="w-5/6 min-h-screen max-md:p-4 p-10 bg-white text-zinc-950">
          <Outlet />
        </div>
      </div>
    </Suspense>
  )
}
