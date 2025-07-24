import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  {
    date: '2023-10-01',
    revenue: 1200,
  },
  {
    date: '2023-10-02',
    revenue: 1500,
  },
  {
    date: '2023-10-03',
    revenue: 1700,
  },
  {
    date: '2023-10-04',
    revenue: 900,
  },
  {
    date: '2023-10-05',
    revenue: 2000,
  },
  {
    date: '2023-10-06',
    revenue: 1800,
  },
  {
    date: '2023-10-07',
    revenue: 2200,
  },
]

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-4">
        <div className="space-y-1">
          <CardTitle className="font-medium text-base">Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer height={240} width="100%">
          <LineChart data={data} style={{ fontSize: 12 }}>
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
            <Line dataKey="revenue" stroke={colors.green['400']} strokeWidth={2} type="linear" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
