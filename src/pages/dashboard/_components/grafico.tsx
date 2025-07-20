import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ChartConfig } from '@/components/ui/chart'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

interface GraficoProps {
  data: {
    month: string
    type: string
    value: number
  }[]
}

export function Grafico({ data }: GraficoProps) {
  const chartConfig = {
    entradas: {
      label: 'entradas',
      color: 'var(--color-zinc-400)',
    },
    saidas: {
      label: 'saidas',
      color: 'var(--color-zinc-600)',
    },
  } satisfies ChartConfig

  return (
    <Card className="min-h-full">
      <CardHeader>
        <CardTitle>Resumo de gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full max-md:h-[18vh] xl:h-[40vh] 2xl:h-[440px]"
        >
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              lang="pt-BR"
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="Entrada" fill="var(--color-entradas)" radius={10} />
            <Bar dataKey="Saida" fill="var(--color-saidas)" radius={10} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
