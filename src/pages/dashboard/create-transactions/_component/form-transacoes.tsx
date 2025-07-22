import Cleave from 'cleave.js/react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import type { CategoriesFormData } from '@/types/categories'
import { type TypeFinance, financeSchema } from '@/types/finance'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { useState } from 'react'

import { createFinance } from '@/services/create-finance'
import { ModalCreateCategories } from './modal-create-categories'

interface FormTransacoesProps {
  categories: CategoriesFormData[]
}

export function FormTransacoes({ categories }: FormTransacoesProps) {
  const queryClient = useQueryClient()

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<TypeFinance>({
    resolver: zodResolver(financeSchema),
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [message, setMessage] = useState('')
  const router = useNavigate()

  const { mutateAsync, isError } = useMutation({
    mutationKey: ['finance', 'dashboard', 'transacoes', 'lucro'],
    mutationFn: async (items: TypeFinance) => await createFinance(items),
    onSuccess: () => {
      setDialogOpen(true)
      setMessage('Cadastro realizado com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['finance', 'dashboard', 'transacoes', 'lucro'],
      })
    },
    onError: () => {
      setDialogOpen(true)
      setMessage('Error ao cadastrar!')
    },
  })

  async function handleCreateFinance(data: TypeFinance) {
    reset()
    if (data.value <= 0) {
      alert('Valor deve ser maior que zero')
      return
    }
    await mutateAsync(data)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleCreateFinance)}
        className="flex flex-col gap-5"
      >
        <div className="w-full flex flex-col gap-2">
          <span className="text-sm font-medium">Categorias:</span>
          <Controller
            name="categories"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <div className="flex justify-between items-center">
            <span className="text-red-500 text-sm">
              {errors.categories ? `${errors.categories.message}` : ''}
            </span>
            <ModalCreateCategories />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <span className="text-sm font-medium">Tipo:</span>
          <Controller
            name="type"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="e">Entrada</SelectItem>
                  <SelectItem value="s">Saída</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <span className="text-red-500 text-sm">{errors.type.message}</span>
          )}
        </div>
        <div className="w-full flex flex-col gap-2">
          <span className="text-sm font-medium">Valor:</span>
          <Controller
            name="value"
            defaultValue={0}
            control={control}
            render={({ field }) => (
              <Cleave
                options={{
                  numeral: true,
                  numeralDecimalMark: ',',
                  delimiter: '.', // separador de milhar
                  numeralDecimalScale: 2,
                  numeralThousandsGroupStyle: 'thousand',
                  prefix: 'R$ ',
                  rawValueTrimPrefix: true,
                  stripLeadingZeroes: true,
                }}
                onChange={e => {
                  const raw = e.target.value
                    .replace('R$ ', '')
                    .replace('.', '')
                    .replace(',', '.')

                  console.log('raw:', raw) // exibe o valor bruto sem formatação
                  field.onChange(Number(raw)) // envia valor final como "5.05"
                }}
                placeholder="R$ 0,00"
                className="p-1.5 border rounded-md"
              />
            )}
          />

          {errors.value && (
            <span className="text-red-500 text-sm">{errors.value.message}</span>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-zinc-900 text-zinc-50 hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Cadastrar Transação
        </Button>

        <Dialog open={dialogOpen} defaultOpen={false}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">
                {isError
                  ? 'Error ao cadastrar!'
                  : 'Cadastro realizado com sucesso!'}
              </DialogTitle>
              <DialogDescription className="text-sm">
                {message}
              </DialogDescription>
            </DialogHeader>
            <DialogClose
              asChild
              className="bg-white text-zinc-900 hover:bg-zinc-300 border transition-all duration-300 p-1.5 rounded-md cursor-pointer"
            >
              <Button type="button" onClick={() => setDialogOpen(false)}>
                Fechar
              </Button>
            </DialogClose>
            <DialogClose
              onClick={() => router('/dashboard/transacoes')}
              className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800 transition-colors duration-300 p-1.5 rounded-md cursor-pointer"
            >
              Voltar para as transações
            </DialogClose>
          </DialogContent>
        </Dialog>
      </form>
    </>
  )
}
