import { Suspense, useState, useEffect, lazy } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

import { useDashboardData } from '@/hooks/useDashboardData'

const DashboardMobile = lazy(() => import('./_components/dashboard-mobile'))
const DashboardDesktop = lazy(() => import('./_components/dashboard-desktop'))

export function Dashboard() {
  const dashboard = useDashboardData()
  const [isMobile, setIsMobile] = useState(false)

  console.log('passou aqui')

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <Suspense fallback={<Skeleton />}>
      {isMobile ? (
        <DashboardMobile
          dataDashboard={dashboard.dataDashboard}
          entradas={dashboard.dataFinance?.entradas ?? 0}
          saidas={dashboard.dataFinance?.saidas ?? 0}
          lucroAno={dashboard.dataLucro?.ano.lucroAnual ?? 0}
          lucroMes={dashboard.dataLucro?.mes.lucroDoMes ?? 0}
          messageAno={dashboard.dataLucro?.ano.message ?? ''}
          messageMes={dashboard.dataLucro?.mes.message ?? ''}
        />
      ) : (
        <DashboardDesktop
          dataDashboard={dashboard.dataDashboard}
          entradas={dashboard.dataFinance?.entradas ?? 0}
          saidas={dashboard.dataFinance?.saidas ?? 0}
          lucroAno={dashboard.dataLucro?.ano.lucroAnual ?? 0}
          lucroMes={dashboard.dataLucro?.mes.lucroDoMes ?? 0}
          messageAno={dashboard.dataLucro?.ano.message ?? ''}
          messageMes={dashboard.dataLucro?.mes.message ?? ''}
        />
      )}
    </Suspense>
  )
}
