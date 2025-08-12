import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'
import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import { DateRangePicker } from '@/components/date-range-picker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-receipt-in-period', dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  })

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map((chartItem) => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex items-center justify-between pb-4">
        <div className="space-y-1">
          <CardTitle className="font-medium text-base">Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {dailyRevenueInPeriod && (
          <ResponsiveContainer height={240} width="100%">
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <CartesianGrid className="stroke-muted" vertical={false} />
              <XAxis axisLine={false} dataKey="date" dy={16} tickLine={false} />
              <YAxis
                axisLine={false}
                stroke="#888"
                tickFormatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
                tickLine={false}
                width={80}
              />
              <Line dataKey="receipt" stroke={colors.green['400']} strokeWidth={2} type="linear" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
