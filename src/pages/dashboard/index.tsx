import { Suspense, useState, useEffect, lazy } from 'react'

import { useDashboardData } from '@/hooks/useDashboardData'
import { Loading } from '@/components/loading'

const DashboardMobile = lazy(() => import('./_components/dashboard-mobile'))
const DashboardDesktop = lazy(() => import('./_components/dashboard-desktop'))

export function Dashboard() {
  const dashboard = useDashboardData()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <Suspense fallback={<Loading />}>
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
