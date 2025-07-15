import { Suspense, useState } from 'react'
import { TableItemsFinance } from './_components/table-items-finance'
import { getItems } from '@/services/get-items'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getCategories } from '@/services/get-categories'

interface Transacao {
  id: string
  value: number
  type: string
  createdAt: Date
  category: string
}

interface Category {
  id: string
  name: string
}

export function Transacoes() {
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const { data } = useQuery<Transacao[]>({
    queryKey: ['transacoes', 'finance'],
    queryFn: getItems,
    placeholderData: keepPreviousData,
  })

  const { data: responseCategories } = useQuery<Category[]>({
    queryKey: ['categories', 'finance'],
    queryFn: getCategories,
    placeholderData: keepPreviousData,
  })

  return (
    <div className="flex flex-col gap-10 min-h-full overflow-hidden scroll-auto text-zinc-950">
      <Card className="w-full">
        <CardContent className="flex flex-col gap-4">
          <Suspense fallback={<h1>Carregando...</h1>}>
            <div className="flex justify-between gap-20">
              <h1 className="text-2xl font-semibold">Transações</h1>
              <div className="flex gap-4 w-full">
                <Select onValueChange={e => setSelectedType(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um tipo de transação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as transações</SelectItem>
                    <SelectItem value="entrada">Entradas</SelectItem>
                    <SelectItem value="saida">Saidas</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={e => setSelectedCategory(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-categories">
                      Todas as categorias
                    </SelectItem>
                    {responseCategories?.map(category => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <TableItemsFinance
              items={data || []}
              filteredItemsType={selectedType}
              filteredItemsCategories={selectedCategory}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
