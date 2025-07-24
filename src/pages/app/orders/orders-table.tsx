import { ArrowRight, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { OrderDetails } from './orders-details'

export function OrderTable() {
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
      <TableCell className="font-medium font-mono text-xs">1546548955555</TableCell>
      <TableCell className="text-muted-foreground">há 15 minutos</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Natan Dourado</TableCell>
      <TableCell className="font-medium">R$ 100,00</TableCell>
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
