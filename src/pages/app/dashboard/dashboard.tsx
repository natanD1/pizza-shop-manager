import { DayOrdersAmountCard } from './day-orders-amount-card'
import { MonthCanceledOrderAmountCard } from './month-canceled-orders-amount-card'
import { MonthOrdersAmountCard } from './month-orders-amount-card'
import { MonthRevenueCard } from './month-revenue-card'

export function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <MonthRevenueCard />
        <MonthOrdersAmountCard />
        <DayOrdersAmountCard />
        <MonthCanceledOrderAmountCard />
      </div>
    </div>
  )
}
