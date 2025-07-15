import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination'

interface TableItemsFinanceProps {
  items: {
    id: string
    value: number
    type: string
    createdAt: Date
    category: string
  }[]
  filteredItemsType?: string
  filteredItemsCategories?: string
}
export function TableItemsFinance({
  items,
  filteredItemsType,
  filteredItemsCategories,
}: TableItemsFinanceProps) {
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const filteredItems = items.filter(item => {
    const typeFilter =
      !filteredItemsType ||
      filteredItemsType === 'all' ||
      item.type === filteredItemsType
    const categoryFilter =
      !filteredItemsCategories ||
      filteredItemsCategories === 'all-categories' ||
      item.category === filteredItemsCategories
    return typeFilter && categoryFilter
  })

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage))
  const paginatedItems = filteredItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [totalPages, page])

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Categoria</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedItems.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(item.value)}
              </TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(item.createdAt)
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={e => {
                e.preventDefault()
                setPage(p => Math.max(1, p - 1))
              }}
              aria-disabled={page === 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={`page-${i + 1}`}>
              <PaginationLink
                href="#"
                isActive={page === i + 1}
                onClick={e => {
                  e.preventDefault()
                  setPage(i + 1)
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={e => {
                e.preventDefault()
                setPage(p => Math.min(totalPages, p + 1))
              }}
              aria-disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
