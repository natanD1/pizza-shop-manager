import { useQuery } from '@tanstack/react-query'
import { BarChart, Loader2 } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'
import { getPopularProducts } from '@/api/get-popular-products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const COLORS = [colors.sky[500], colors.amber[500], colors.violet[500], colors.emerald[500], colors.rose[500]]

export function PopularProductsChart() {
  const { data: popularProducts } = useQuery({
    queryKey: ['metrics', 'popular-products'],
    queryFn: getPopularProducts,
  })

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-medium text-base">Produtos mais populares</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {popularProducts ? (
          <ResponsiveContainer height={240} width="100%">
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                cx="50%"
                cy="50%"
                data={popularProducts}
                dataKey="amount"
                innerRadius={64}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                  const RADIAN = Math.PI / 180
                  const radius = 12 + innerRadius + (outerRadius - innerRadius)
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  return (
                    <text
                      className="fill-muted-foreground text-xs"
                      dominantBaseline="central"
                      textAnchor={x > cx ? 'start' : 'end'}
                      x={x}
                      y={y}
                    >
                      {popularProducts[index].product.length > 12
                        ? popularProducts[index].product.substring(0, 12).concat('...')
                        : popularProducts[index].product}{' '}
                      ({value})
                    </text>
                  )
                }}
                labelLine={false}
                nameKey="product"
                outerRadius={86}
                strokeWidth={8}
              >
                {popularProducts.map((item, index) => {
                  return <Cell className="stroke-card hover:opacity-80" fill={COLORS[index]} key={`cell-${item}`} />
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
