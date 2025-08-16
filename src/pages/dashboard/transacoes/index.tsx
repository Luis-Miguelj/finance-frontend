import { TableItemsFinance } from './_components/table-items-finance'

import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTransacoesData } from '@/hooks/useTransacoesData'
import { Loading } from '@/components/loading'

export function Transacoes() {
  const transacoes = useTransacoesData()

  if (transacoes.isLoading) {
    return <Loading />
  }

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col w-full max-md:h-[70vh] gap-6">
        <div className="w-full flex max-md:flex-col max-md:gap-5 xl:justify-between gap-20">
          <h1 className="text-2xl font-semibold">Transações</h1>
          <div className="flex max-md:flex-col xl:justify-end gap-4 w-full">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Tipo de transação:</span>
              <Select onValueChange={e => transacoes.setSelectedType(e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um tipo de transação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as transações</SelectItem>
                  <SelectItem value="entrada">Entradas</SelectItem>
                  <SelectItem value="saida">Saidas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <span className="text-sm font-medium">Categorias:</span>
              <Select onValueChange={e => transacoes.setSelectedCategory(e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">
                    Todas as categorias
                  </SelectItem>
                  {transacoes.categories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <TableItemsFinance
          items={transacoes.transacoes || []}
          filteredItemsType={transacoes.selectedType}
          filteredItemsCategories={transacoes.selectedCategory}
          categories={transacoes.categories || []}
        />
      </CardContent>
    </Card>
  )
}
