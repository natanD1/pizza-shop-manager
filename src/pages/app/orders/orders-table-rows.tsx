import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { ArrowRight, Search, X } from 'lucide-react'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { priceFormatter } from '@/utils/currency-formatter'
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
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="xs" variant="outline">
              <Search className="h-3 w-3" />
              {/* FEAT: O "sr-only" só e disponível para o leitor de tela, trazendo acessibilidade*/}
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails />
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
      <TableCell className="font-medium">{priceFormatter.format(order.total)}</TableCell>
      <TableCell>
        <Button className="hover:text-green-500 hover:dark:text-green-400" size="xs" variant="outline">
          <ArrowRight className="h-3 w-3" />
          <span>Aprovar</span>
        </Button>
      </TableCell>
      <TableCell>
        <Button className="hover:text-rose-500 hover:dark:text-rose-400" size="xs" variant="ghost">
          <X className="h-3 w-3" />
          <span>Cancelar</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
