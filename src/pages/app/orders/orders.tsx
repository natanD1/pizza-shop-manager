import { Pagination } from '@/components/pagination'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { OrderTable } from './orders-table'
import { OrderTableFilters } from './orders-table-filters'

export function Orders() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl tracking-tight">Pedidos</h1>
      <div className="space-y-2.5">
        <OrderTableFilters />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]" />
                <TableHead className="w-[140px]">Identificador</TableHead>
                <TableHead className="w-[180px]">Realizado há</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[140px]">Total de pedido</TableHead>
                <TableHead className="w-[164px]" />
                <TableHead className="w-[132px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, item) => {
                return <OrderTable key={item} />
              })}
            </TableBody>
          </Table>
        </div>
        <Pagination pageIndex={0} perPage={10} totalCount={105} />
      </div>
    </div>
  )
}
