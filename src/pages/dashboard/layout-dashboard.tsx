import { Menu } from '@/components/menu/menu'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Outlet } from 'react-router'

import { env } from '@/types/env'
import { Skeleton } from '@/components/ui/skeleton'

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
    placeholderData: keepPreviousData,
  })

  if (isLoading) {
    return <Skeleton className="bg-white" />
  }

  return (
    <div className="flex max-md:flex-col min-h-screen">
      <Menu name={data?.name} createdAt={data?.createdAt as Date} />
      <div className="w-5/6 max-md:w-full min-h-screen max-md:p-4 p-10 bg-white text-zinc-950">
        <Outlet />
      </div>
    </div>
  )
}
