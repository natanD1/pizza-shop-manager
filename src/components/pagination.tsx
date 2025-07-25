import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from './ui/button'

export interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
}

export function Pagination({ pageIndex, totalCount, perPage }: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage)

  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-sm">Total de {totalCount} item(s)</span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="font-medium text-sm">
          Pagina {pageIndex + 1} de {pages}
        </div>

        <div className="flex items-center gap-2">
          <Button className="h-8 w-8 p-0" variant="outline">
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button className="h-8 w-8 p-0" variant="outline">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button className="h-8 w-8 p-0" variant="outline">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Página Anterior</span>
          </Button>
          <Button className="h-8 w-8 p-0" variant="outline">
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última Página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
