import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './global.css'

//Routes
import { Login } from '@/pages/auth/login'
import { LayoutDashboard } from '@/pages/dashboard/layout-dashboard'
import { Dashboard } from '@/pages/dashboard'
import { Register } from '@/pages/auth/register'
import { Transacoes } from '@/pages/dashboard/transacoes'

// Middleware function
import { middleware } from '@/middleware'
import { CreateTransactionsPage } from './pages/dashboard/create-transactions'
import { Home } from '@/pages/home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: middleware,
  },
  {
    path: '/login',
    element: <Login />,
    loader: middleware,
  },
  {
    path: '/register',
    element: <Register />,
    loader: middleware,
  },
  {
    path: '/dashboard',
    element: <LayoutDashboard />,
    loader: middleware,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'transacoes',
        element: <Transacoes />,
      },
      {
        path: 'criar-transacao',
        element: <CreateTransactionsPage />,
      },
    ],
  },
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
