/** biome-ignore-all lint/complexity/noForEach: <using forEach to update cache> */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CheckCircle, Package, Search, TruckIcon, X } from 'lucide-react'
import { useState } from 'react'
import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import type { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { currencyFormatter } from '@/utils/currency-formatter'
import { OrderDetails } from './orders-details'

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const orderListCached = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })
    orderListCached.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }
      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((item) => {
          if (item.orderId === orderId) {
            return { ...item, status }
          }

          return item
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'canceled')
    },
  })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
    mutationFn: approveOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'processing')
    },
  })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } = useMutation({
    mutationFn: dispatchOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'delivering')
    },
  })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } = useMutation({
    mutationFn: deliverOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'delivered')
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog onOpenChange={setIsDetailsOpen} open={isDetailsOpen}>
          <DialogTrigger asChild>
            <Button size="xs" variant="outline">
              <Search className="h-3 w-3" />
              {/* FEAT: O "sr-only" só e disponível para o leitor de tela, trazendo acessibilidade*/}
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-medium font-mono text-xs">{order.orderId}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">{currencyFormatter.format(order.total / 100)}</TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            className="cursor-pointer hover:text-green-500 hover:dark:text-green-400"
            disabled={isApprovingOrder}
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            size="xs"
            variant="outline"
          >
            <CheckCircle className="h-3 w-3" />
            <span>Aprovar</span>
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            className="cursor-pointer hover:text-amber-500 hover:dark:text-amber-400"
            disabled={isDispatchingOrder}
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            size="xs"
            variant="outline"
          >
            <TruckIcon className="h-3 w-3" />
            <span>Em entrega</span>
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            className="cursor-pointer hover:text-green-500 hover:dark:text-green-400"
            disabled={isDeliveringOrder}
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            size="xs"
            variant="outline"
          >
            <Package className="h-3 w-3" />
            <span>Entregue</span>
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          className="cursor-pointer hover:text-rose-500 hover:dark:text-rose-400"
          disabled={!['pending', 'processing'].includes(order.status) || isCancelingOrder}
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          size="xs"
          variant="ghost"
        >
          <X className="h-3 w-3" />
          <span>Cancelar</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
