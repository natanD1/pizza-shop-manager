import { Utensils } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DayOrdersAmountCard() {
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-semibold text-base">Pedidos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <span className="font-bold text-2xl tracking-tight">20</span>
        <p className="text-muted-foreground text-xs">
          <span className="text-rose-500 dark:text-rose-400">- 4%</span>
          {''} em relação a ontem
        </p>
      </CardContent>
    </Card>
  )
}
