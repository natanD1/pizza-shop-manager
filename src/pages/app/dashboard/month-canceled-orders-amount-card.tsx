import { useQuery } from '@tanstack/react-query'
import { CircleX } from 'lucide-react'
import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthCanceledOrderAmountCard() {
  const { data: monthCanceledOrderAmount } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  })

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-semibold text-base">Cancelamentos (mês)</CardTitle>
        <CircleX className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {monthCanceledOrderAmount && (
          <>
            <span className="font-bold text-2xl tracking-tight">
              {monthCanceledOrderAmount?.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-muted-foreground text-xs">
              {monthCanceledOrderAmount.diffFromLastMonth < 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {monthCanceledOrderAmount?.diffFromLastMonth} %
                  </span>{' '}
                  em relação a ontem
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthCanceledOrderAmount?.diffFromLastMonth} %
                  </span>{' '}
                  em relação a ontem
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
