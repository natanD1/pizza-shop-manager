import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>x</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="font-bold text-2xl tracking-tight">246</span>
            <p className="text-muted-foreground text-xs">
              <span className="text-emerald-500 dark:text-emerald-400">6%</span>
              em relação ao mês passado
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
