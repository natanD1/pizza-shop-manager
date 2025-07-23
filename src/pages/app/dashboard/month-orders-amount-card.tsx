import { Utensils } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthOrdersAmountCard() {
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-semibold text-base">Total de pedidos (mês)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <span className="font-bold text-2xl tracking-tight">980</span>
        <p className="text-muted-foreground text-xs">
          <span className="text-emerald-500 dark:text-emerald-400">+ 6%</span>
          {''} em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
