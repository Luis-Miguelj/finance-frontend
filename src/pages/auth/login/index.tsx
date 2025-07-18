import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Eye, EyeOff } from 'lucide-react'

import { Link, useNavigate } from 'react-router'

import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, type TypeUser } from '@/types/auth'
import { env } from '@/types/env'

import { Container } from '../_component/container'

export function Login() {
  const [showPassword, setShowPassword] = useState<string>('password')
  const [isError, setError] = useState<boolean>(false)
  const [isSuccess, setSuccess] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(33)
  const navigate = useNavigate()
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<TypeUser>({
    resolver: zodResolver(userSchema),
  })

  async function handleLogin(data: TypeUser) {
    try {
      const response = await fetch(`${env.VITE_URL_API}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      setLoading(true)
      if (!response.ok) {
        setLoading(false)
        setError(true)
        throw new Error('Erro ao fazer login')
      }
      const result = await response.json()
      setTimeout(() => {
        setProgress(70)
      }, 1000)

      if (result) {
        setProgress(100)
        setSuccess(true)
        setSuccessMessage(result.message)
        window.localStorage.setItem('token', result.token)
        reset()
        console.log('Login bem-sucedido')
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    }
  }

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col gap-1 bg-zinc-950 backdrop-blur-2xl p-5 rounded-md shadow-lg text-center">
            <h1 className="text-2xl text-white font-black">Carregando...</h1>
            <h2 className="text-md text-zinc-300 font-medium">
              Aguarde um momento, o sistema está conferindo suas credenciais
              para iniciar a sessão.
            </h2>
            <Progress className="w-full" value={progress} />
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <Card className="w-1/3 h-full p-5 bg-zinc-950 text-white border-zinc-900 shadow-lg">
        <CardContent className="flex flex-col gap-8">
          <CardHeader>
            <CardTitle className="text-xl md:text-4xl font-black">
              Login
            </CardTitle>
            <CardDescription className="text-xs md:text-sm font-medium">
              Por favor, insira suas credenciais para acessar o sistema.
            </CardDescription>
          </CardHeader>
          <div className="w-full flex flex-col gap-10">
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300"
                >
                  E-mail:
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full p-2 border border-zinc-800 bg-zinc-900 rounded-md ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:border-zinc-100 transition-all outline-none duration-300`}
                  placeholder="exemplo@gmail.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300"
                >
                  Senha:
                </label>
                <div className="flex gap-2">
                  <input
                    type={showPassword}
                    {...register('password')}
                    className={`w-full p-2 border border-zinc-800 bg-zinc-900 rounded-md ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:border-zinc-100 transition-all outline-none duration-300`}
                    placeholder="Digite sua senha..."
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        showPassword === 'password' ? 'text' : 'password'
                      )
                    }
                    className="bg-zinc-900 rounded-md px-4 border border-zinc-800 transition-all duration-300 cursor-pointer text-gray-400 hover:text-gray-200 "
                  >
                    {showPassword === 'password' ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-900 p-2 rounded-md cursor-pointer text-white font-semibold hover:bg-blue-800 transition-all duration-300"
              >
                Entrar
              </button>
            </form>
            <div className="flex justify-center">
              <p className="text-sm text-gray-400">
                Não tem uma conta?{' '}
                <Link
                  to="/register"
                  className="text-blue-500 hover:text-blue-400 transition-all duration-300"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {isError && (
        <Alert className="absolute bottom-16 left-1/2 transform -translate-x-1/2 duration-300 w-1/4 border border-red-600 bg-zinc-950 alert-error">
          <AlertTitle className="text-red-600 text-lg font-medium">
            Erro ao fazer login
          </AlertTitle>
          <AlertDescription className="text-red-500 font-medium">
            Verifique suas credenciais e tente novamente.
          </AlertDescription>
        </Alert>
      )}
      {isSuccess && (
        <Alert className="absolute bottom-16 left-1/2 transform -translate-x-1/2 duration-300 w-1/4 border border-blue-900 bg-zinc-950 alert-success">
          <AlertTitle className="text-blue-600 text-lg font-medium">
            {successMessage}
          </AlertTitle>
          <AlertDescription className="text-blue-600 font-medium">
            Você será redirecionado para a página inicial.
          </AlertDescription>
        </Alert>
      )}
    </Container>
  )
}
