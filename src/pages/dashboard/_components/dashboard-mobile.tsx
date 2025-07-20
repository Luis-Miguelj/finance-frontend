import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
// import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrency } from '@/functions/formatCurrency'
import { Grafico } from './grafico'

interface DashboardMobileProps {
  entradas: number
  saidas: number
  lucroAno: number
  lucroMes: number
  messageAno: string
  messageMes: string
  dataDashboard: {
    month: string
    type: string
    value: number
  }[]
}
export default function DashboardMobile({
  dataDashboard,
  entradas,
  lucroAno,
  lucroMes,
  messageAno,
  messageMes,
  saidas,
}: DashboardMobileProps) {
  return (
    <>
      <div className="flex flex-col gap-4 min-h-full overflow-hidden scroll-auto text-zinc-950">
        <div className="flex max-md:flex-col gap-5 max-md:gap-2.5 md:h-32">
          <div className="flex max-md:gap-2.5 ">
            <Card className="w-full bg-zinc-400 text-white">
              <CardContent className="flex flex-col gap-2">
                <CardTitle className="text-2xl max-md:text-lg">
                  Entradas
                </CardTitle>
                <CardDescription className="text-zinc-200 text-lg max-md:text-base">
                  {formatCurrency(entradas)}
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="w-full bg-zinc-700 text-white">
              <CardContent className="flex flex-col gap-2">
                <CardTitle className="text-2xl max-md:text-lg">
                  Saídas
                </CardTitle>
                <CardDescription className="text-zinc-200 text-lg max-md:text-base">
                  {formatCurrency(saidas)}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <Card
            className={`w-full ${(lucroAno) < 0 ? 'bg-red-50' : 'bg-blue-50'} text-zinc-950`}
          >
            <CardContent className="flex flex-col gap-2">
              <CardTitle className="text-2xl max-md:text-lg">
                {messageAno}
              </CardTitle>
              <CardDescription className="text-lg max-md:text-base">
                {lucroAno.toLocaleString('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                })}
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-2">
              <CardTitle className="text-2xl max-md:text-lg">
                {messageMes}
              </CardTitle>
              <CardDescription className="text-lg max-md:text-base">
                {lucroMes.toLocaleString('pt-BR', {
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
