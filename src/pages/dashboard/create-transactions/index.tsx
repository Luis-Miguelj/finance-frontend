import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from '@/components/ui/card'

import { getCategories } from '@/services/get-categories'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { FormTransacoes } from './_component/form-transacoes'
import { Suspense } from 'react'
import type { CategoriesFormData } from '@/types/categories'

export function CreateTransactionsPage() {
  const { data: categories } = useQuery<CategoriesFormData[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
    placeholderData: keepPreviousData,
  })

  return (
    <div className="h-full flex justify-center items-center">
      <Card className="md:w-1/2 w-full md:h-[60vh] h-full">
        <CardContent>
          <CardHeader>
            <CardTitle className="text-2xl">
              Cadastrar suas movimentações
            </CardTitle>
            <CardDescription>
              Aqui você pode cadastrar suas movimentações financeiras, como
              despesas e receitas. Utilize o formulário abaixo para inserir os
              detalhes da sua transação.
            </CardDescription>
          </CardHeader>
          <div className="p-5">
            <Suspense fallback={<div>Carregando...</div>}>
              <FormTransacoes categories={categories || []} />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
