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
import { EditFinance } from './edit-finance'
import { formatToUpperCase } from '@/functions/formatUpercase'
import { DeleteFinance } from './delete-finance'

interface Category {
  id: string
  name: string
}

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
  categories?: Category[]
}

export function TableItemsFinance({
  items,
  filteredItemsType,
  filteredItemsCategories,
  categories,
}: TableItemsFinanceProps) {
  const [page, setPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const itemsPerPage = isMobile ? 5 : 10

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
          <TableRow className="font-semibold">
            <TableCell>Categoria</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Opções</TableCell>
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
              <TableCell>{formatToUpperCase(item.type)}</TableCell>
              <TableCell>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(item.createdAt)
                )}
              </TableCell>
              <TableCell className="flex gap-2">
                <EditFinance
                  categories={categories || []}
                  id={item.id}
                  category={item.category}
                  type={item.type}
                  value={item.value}
                />
                |
                <DeleteFinance id={item.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4">
        <PaginationContent>
          {/* Botão anterior */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={e => {
                e.preventDefault()
                setPage(p => Math.max(1, p - 1))
              }}
              aria-disabled={page === 1}
              className={page === 1 ? 'opacity-50 pointer-events-none' : ''}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => {
              // mostra apenas a atual + vizinhas
              return Math.abs(p - page) <= 1
            })
            .map((p, i, arr) => {
              const prev = arr[i - 1]

              return (
                <PaginationItem key={`page-${p}`}>
                  {/* adiciona "..." se pular página */}
                  {prev && p - prev > 1 ? (
                    <span className="px-2">...</span>
                  ) : null}

                  <PaginationLink
                    href="#"
                    isActive={page === p}
                    onClick={e => {
                      e.preventDefault()
                      setPage(p)
                    }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

          {/* Botão próximo */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={e => {
                e.preventDefault()
                setPage(p => Math.min(totalPages, p + 1))
              }}
              aria-disabled={page === totalPages}
              className={
                page === totalPages ? 'opacity-50 pointer-events-none' : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
