// src/middleware.ts
import { redirect } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'

export function middleware({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const path = url.pathname
  const hasToken = localStorage.getItem('token') !== null

  // Se não tem token, redireciona para login (exceto se já estiver em login ou register)
  if (!hasToken && path !== '/login' && path !== '/register' && path !== '/') {
    return redirect('/login')
  }

  // Se tem token e está tentando acessar login ou register, redireciona para dashboard
  if (hasToken && (path === '/' || path === '/register' || path === '/login')) {
    return redirect('/dashboard')
  }

  return null // deixa a rota carregar normalmente
}
