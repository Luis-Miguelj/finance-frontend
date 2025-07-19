import { useQuery, keepPreviousData } from '@tanstack/react-query'

import { Suspense } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getFinance } from '@/services/get-finance'
import { getLucro } from '@/services/get-lucro'
import { formatCurrency } from '@/functions/formatCurrency'
import { Grafico } from './_components/grafico'
import { getDashboard } from '@/services/get-dashboard'

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

export function Dashboard() {
  const { data: dataFinance, isLoading: loadingFinance } = useQuery<Finance>({
    queryKey: ['finance'],
    queryFn: getFinance,
    retry: false,
    placeholderData: keepPreviousData,
  })
  const { data: dataLucro, isLoading: loadingLucro } = useQuery<Lucro>({
    queryKey: ['lucro', 'finance'],
    queryFn: getLucro,
    placeholderData: keepPreviousData,
  })
  const { data: dataDashboard, isLoading: loadingDashboard } = useQuery({
    queryKey: ['dashboard', 'finance'],
    queryFn: getDashboard,
    placeholderData: keepPreviousData,
  })

  if (loadingFinance || loadingLucro || loadingDashboard) {
    return <Suspense fallback={<Skeleton />} />
  }

  if (typeof window !== 'undefined') {
    if (window.innerWidth < 768) {
      return (
        <>
          <div className="flex flex-col gap-10 min-h-full overflow-hidden scroll-auto text-zinc-950">
            <div className="flex max-md:flex-col gap-5 max-md:gap-2.5 md:h-32">
              <div className="flex max-md:gap-2.5 ">
                <Card className="w-full bg-zinc-400 text-white">
                  <CardContent className="flex flex-col gap-2">
                    <CardTitle className="text-2xl max-md:text-lg">
                      Entradas
                    </CardTitle>
                    <CardDescription className="text-zinc-200 text-lg max-md:text-base">
                      {formatCurrency(dataFinance?.entradas as number)}
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="w-full bg-zinc-700 text-white">
                  <CardContent className="flex flex-col gap-2">
                    <CardTitle className="text-2xl max-md:text-lg">
                      Saídas
                    </CardTitle>
                    <CardDescription className="text-zinc-200 text-lg max-md:text-base">
                      {formatCurrency(dataFinance?.saidas as number)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
              <Card
                className={`w-full ${(dataLucro?.ano.lucroAnual as number) < 0 ? 'bg-red-50' : 'bg-blue-50'} text-zinc-950`}
              >
                <CardContent className="flex flex-col gap-2">
                  <CardTitle className="text-2xl max-md:text-lg">
                    {dataLucro?.ano.message}
                  </CardTitle>
                  <CardDescription className="text-lg max-md:text-base">
                    {dataLucro?.ano.lucroAnual.toLocaleString('pt-BR', {
                      currency: 'BRL',
                      style: 'currency',
                    })}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardContent className="flex flex-col gap-2">
                  <CardTitle className="text-2xl max-md:text-lg">
                    {dataLucro?.mes.message}
                  </CardTitle>
                  <CardDescription className="text-lg max-md:text-base">
                    {dataLucro?.mes.lucroDoMes.toLocaleString('pt-BR', {
                      currency: 'BRL',
                      style: 'currency',
                    })}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            <Grafico data={dataDashboard} />
          </div>
        </>
      )
    }
  }

  return (
    <div className="flex flex-col gap-10 min-h-full overflow-hidden scroll-auto text-zinc-950">
      <div className="flex max-md:flex-col gap-5 max-md:gap-2.5 md:h-32">
        <Card
          className={`w-full ${(dataLucro?.ano.lucroAnual as number) < 0 ? 'bg-red-50' : 'bg-blue-50'} text-zinc-950`}
        >
          <CardContent className="flex flex-col gap-2">
            <CardTitle className="text-lg max-md:text-lg">
              {dataLucro?.ano.message}
            </CardTitle>
            <CardDescription className="text-lg max-md:text-base">
              {dataLucro?.ano.lucroAnual.toLocaleString('pt-BR', {
                currency: 'BRL',
                style: 'currency',
              })}
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="flex flex-col gap-2">
            <CardTitle className="text-lg md:w-60">
              {dataLucro?.mes.message}
            </CardTitle>
            <CardDescription className="text-lg max-md:text-base">
              {dataLucro?.mes.lucroDoMes.toLocaleString('pt-BR', {
                currency: 'BRL',
                style: 'currency',
              })}
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="w-full bg-zinc-400 text-white">
          <CardContent className="flex flex-col gap-2">
            <CardTitle className="text-xl max-md:text-lg">Entradas</CardTitle>
            <CardDescription className="text-zinc-200 text-lg max-md:text-base">
              {formatCurrency(dataFinance?.entradas as number)}
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="w-full bg-zinc-700 text-white">
          <CardContent className="flex flex-col gap-2">
            <CardTitle className="text-xl max-md:text-lg">Saídas</CardTitle>
            <CardDescription className="text-zinc-200 text-lg max-md:text-base">
              {formatCurrency(dataFinance?.saidas as number)}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <Grafico data={dataDashboard} />
    </div>
  )
}
