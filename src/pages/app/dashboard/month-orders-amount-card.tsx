import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'
import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthOrdersAmountCard() {
  const { data: monthOrderAmount } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount,
  })

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-semibold text-base">Total de pedidos (mês)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {monthOrderAmount && (
          <>
            <span className="font-bold text-2xl tracking-tight">
              {monthOrderAmount?.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-muted-foreground text-xs">
              {monthOrderAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    + {monthOrderAmount?.diffFromLastMonth} %
                  </span>{' '}
                  em relação a ontem
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">{monthOrderAmount?.diffFromLastMonth} %</span> em
                  relação a ontem
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
