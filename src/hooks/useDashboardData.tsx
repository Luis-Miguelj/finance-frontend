import { getDashboard } from '@/services/get-dashboard'
import { getFinance } from '@/services/get-finance'
import { getLucro } from '@/services/get-lucro'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

interface Lucro {
  mes: {
    message: string
    lucroDoMes: number
  }
  ano: {
    message: string
    lucroAnual: number
  }
}

interface Finance {
  entradas: number
  saidas: number
}

export function useDashboardData() {
  const { data: dataFinance } = useQuery<Finance>({
    queryKey: ['finance'],
    queryFn: getFinance,
    retry: false,
    placeholderData: keepPreviousData,
  })

  const { data: dataLucro } = useQuery<Lucro>({
    queryKey: ['lucro', 'finance'],
    queryFn: getLucro,
    placeholderData: keepPreviousData,
  })

  const { data: dataDashboard } = useQuery({
    queryKey: ['dashboard', 'finance'],
    queryFn: getDashboard,
    placeholderData: keepPreviousData,
  })

  return {
    dataFinance,
    dataLucro,
    dataDashboard,
  }
}
