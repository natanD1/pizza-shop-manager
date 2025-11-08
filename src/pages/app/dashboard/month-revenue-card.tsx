import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'
import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { currencyFormatter } from '@/utils/currency-formatter'
import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ['metrics', 'month-receipt'],
    queryFn: getMonthRevenue,
  })

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-semibold text-base">Receita total (mês)</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {monthRevenue ? (
          <>
            <span className="font-bold text-2xl tracking-tight">
              {currencyFormatter.format(monthRevenue.receipt / 100)}
            </span>
            <p className="text-muted-foreground text-xs">
              {monthRevenue.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">+ {monthRevenue?.diffFromLastMonth} %</span>{' '}
                  em relação a ontem
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">{monthRevenue?.diffFromLastMonth} %</span> em
                  relação a ontem
                </>
              )}
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
