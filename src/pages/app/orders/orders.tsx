import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { z } from 'zod'
import { getOrders } from '@/api/get-orders'
import { Pagination } from '@/components/pagination'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { OrderTableSkeleton } from './order-table-skeleton'
import { OrderTableFilters } from './orders-table-filters'
import { OrderTableRow } from './orders-table-rows'

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { data: result, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () => getOrders({ pageIndex, orderId, customerName, status: status === 'all' ? null : status }),
  })

  function handlePaginate(handlePageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', (handlePageIndex + 1).toString())

      return prev
    })
  }

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
              {isLoadingOrders && <OrderTableSkeleton />}

              {result?.orders.map((order) => (
                <OrderTableRow key={order.orderId} order={order} />
              ))}
            </TableBody>
          </Table>
        </div>

        {result && (
          <Pagination
            onPageChange={handlePaginate}
            pageIndex={pageIndex}
            perPage={result?.meta.perPage}
            totalCount={result?.meta.totalCount}
          />
        )}
      </div>
    </div>
  )
}
