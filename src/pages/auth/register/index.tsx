import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog'
import { Container } from '../_component/container'
import { Eye, EyeOff } from 'lucide-react'

import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type TypeRegisterUser, registerSchema } from '@/types/auth'
import { Link } from 'react-router'
import { env } from '@/types/env'

export function Register() {
  const [showPassword, setShowPassword] = useState<string>('password')
  const [isError, setError] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const navigate = useNavigate()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeRegisterUser>({
    resolver: zodResolver(registerSchema),
  })

  async function handleRegister(data: TypeRegisterUser) {
    try {
      const response = await fetch(`${env.VITE_URL_API}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        setError(true)
        setOpenAlert(true)
        setErrorMessage(
          'Erro ao registrar usuário, verifique os dados fornecidos.'
        )
        throw new Error(
          'Erro ao registrar usuário, verifique os dados fornecidos.'
        )
      }

      const result = await response.json()
      setSuccessMessage(result.message)
      setError(false)
      setOpenAlert(true)
      reset()
      console.log('Registro bem-sucedido')
    } catch (error) {
      console.error(error)
      // setErrorMessage(error as string)
    }
  }

  return (
    <>
      <Container>
        <Card className="w-1/3 max-md:w-full h-full p-5 bg-zinc-950 text-white border-zinc-900 shadow-lg">
          <CardContent className="flex flex-col gap-6">
            <CardHeader>
              <CardTitle className="text-xl md:text-4xl font-black">
                Registrar
              </CardTitle>
              <CardDescription className="text-xs md:text-sm font-medium">
                Crie uma nova conta
              </CardDescription>
            </CardHeader>
            <div className="flex flex-col gap-8">
              <form
                onSubmit={handleSubmit(handleRegister)}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome:
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="Digite seu nome..."
                    className="p-2 border rounded-md bg-zinc-900 border-zinc-800 focus:border-zinc-100 transition-all outline-none duration-300"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
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
                  <label htmlFor="password" className="text-sm font-medium">
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
                  Cadastrar-se
                </button>
              </form>
              <div>
                <p className="text-sm text-center text-gray-400">
                  Já possui uma conta?{' '}
                  <Link
                    to={'/login'}
                    className="text-blue-600 hover:text-blue-500 transition-all duration-300"
                  >
                    Voltar para login
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
      <Dialog open={openAlert} defaultOpen={false}>
        <DialogContent
          className={`bg-zinc-950 w-96 border ${isError ? 'border-red-900' : 'border-blue-900'} shadow-lg max-md:w-full`}
        >
          {isError ? (
            <DialogHeader>
              <DialogTitle className="text-red-600 text-xl">
                Erro ao registrar
              </DialogTitle>
              <DialogDescription>{errorMessage}</DialogDescription>
            </DialogHeader>
          ) : (
            <DialogHeader>
              <DialogTitle className="text-blue-600 text-xl">
                Registro bem-sucedido
              </DialogTitle>
              <DialogDescription>{successMessage}</DialogDescription>
            </DialogHeader>
          )}
          {isError ? (
            <DialogFooter>
              <DialogClose asChild>
                <button
                  type="button"
                  onClick={() => {
                    setOpenAlert(false)
                  }}
                  className="text-white rounded-md px-2 py-1.5 bg-red-600 hover:bg-red-500 cursor-pointer border-red-500 transition-all duration-300"
                >
                  Fechar
                </button>
              </DialogClose>
            </DialogFooter>
          ) : (
            <DialogFooter>
              <DialogClose
                onClick={() => {
                  setOpenAlert(false)
                  navigate('/login')
                }}
                className="bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 py-1.5 px-2 cursor-pointer rounded-md"
              >
                Voltar para login
              </DialogClose>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
