import { useTransacoesData } from '@/hooks/useTransacoesData'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Loading } from '@/components/loading'
import { DeleteCategories } from './_components/delete-categories'
import { EditCategories } from './_components/edit-categories'

export function Categorias() {
  const transacoes = useTransacoesData()

  if (transacoes.isLoading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col min-h-full gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Categorias</CardTitle>
          <CardDescription>
            Gerencie suas categorias de transações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody className="flex flex-col max-h-[550px]">
              <TableRow className="flex justify-baseline">
                <TableCell className="font-semibold w-full">
                  Categorias
                </TableCell>
                <TableCell className="font-semibold w-full">Opções</TableCell>
              </TableRow>
              {transacoes.categories.map(categoria => (
                <TableRow key={categoria.id} className="flex">
                  <TableCell className="w-full">{categoria.name}</TableCell>
                  <TableCell className="flex gap-2 w-full">
                    <EditCategories name={categoria.name} id={categoria.id} />|
                    <DeleteCategories id={categoria.id} />
                  </TableCell>
                </TableRow>
              ))}
              {transacoes.categories.map(categoria => (
                <TableRow key={categoria.id} className="flex">
                  <TableCell className="w-full">{categoria.name}</TableCell>
                  <TableCell className="flex gap-2 w-full">
                    <EditCategories name={categoria.name} id={categoria.id} />|
                    <DeleteCategories id={categoria.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
