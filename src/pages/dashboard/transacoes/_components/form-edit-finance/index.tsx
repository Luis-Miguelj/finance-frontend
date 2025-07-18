import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type TypeFinance, financeSchema } from '@/types/finance'
import Cleave from 'cleave.js/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { editFinance } from '@/services/edit-finance'
import { formatCurrency } from '@/functions/formatCurrency'

interface FormEditFinanceProps {
  id: string
  category: string
  type: string
  value: number
  categories: {
    id: string
    name: string
  }[]
}

export function FormEditFinance({
  categories,
  id,
  category,
  type,
  value,
}: FormEditFinanceProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeFinance>({
    resolver: zodResolver(financeSchema),
  })
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: async ({ data, id }: { data: TypeFinance; id: string }) => {
      await editFinance(data, id)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['transacoes', 'finance'] })
      alert('Transação editada com sucesso!')
    },
  })
  async function handleEditFinance(data: TypeFinance) {
    try {
      await mutateAsync({ data, id })
    } catch (error) {
      console.debug('Error editing finance data:', error)
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(handleEditFinance)}
        className="flex flex-col gap-5"
      >
        <div className="w-full flex flex-col gap-2">
          <span className="text-sm font-medium">Categoria:</span>
          <Controller
            name="categories"
            control={control}
            defaultValue={category}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue=""
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
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
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <span className="text-sm font-medium">Tipo:</span>
          <Controller
            name="type"
            defaultValue={type === 'entrada' ? 'e' : 's'}
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue=""
              >
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
            control={control}
            render={({ field }) => (
              <Cleave
                value={formatCurrency(value)}
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
          Editar Transação
        </Button>
      </form>
    </>
  )
}
