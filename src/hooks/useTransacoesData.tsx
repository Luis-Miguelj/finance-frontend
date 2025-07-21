import { getCategories } from '@/services/get-categories'
import { getItems } from '@/services/get-items'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

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
export function useTransacoesData() {
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const { data: transacoes, isLoading: trasancaoLoading } = useQuery<
    Transacao[]
  >({
    queryKey: ['transacoes', 'finance'],
    queryFn: getItems,
    placeholderData: keepPreviousData,
  })

  const { data: responseCategories, isLoading: categoriesLoading } = useQuery<
    Category[]
  >({
    queryKey: ['categories', 'finance'],
    queryFn: getCategories,
    placeholderData: keepPreviousData,
  })

  const isLoading = trasancaoLoading || categoriesLoading

  return {
    selectedType,
    setSelectedType,
    selectedCategory,
    setSelectedCategory,
    transacoes,
    responseCategories,
    isLoading,
  }
}
