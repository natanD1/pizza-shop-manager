import { zodResolver } from '@hookform/resolvers/zod'
import { Sliders, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } = useForm({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      orderId: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all',
    },
  })

  function handleFilter(data: OrderFiltersSchema) {
    setSearchParams((state) => {
      if (data.orderId) {
        state.set('orderId', data.orderId)
      } else {
        state.delete('orderId')
      }

      if (data.customerName) {
        state.set('customerName', data.customerName)
      } else {
        state.delete('customerName')
      }

      if (data.status) {
        state.set('status', data.status)
      } else {
        state.delete('status')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleRemoveFilters() {
    setSearchParams((state) => {
      state.delete('orderId')
      state.delete('status')
      state.delete('customerName')
      state.set('pages', '1')

      return state
    })

    reset({
      orderId: '',
      customerName: '',
      status: 'all',
    })
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit(handleFilter)}>
      <span className="font-semibold text-sm">Filtros: </span>
      <Input className="h-8 w-auto" placeholder="ID do pedido" {...register('orderId')} />
      <Input className="h-8 w-[320px]" placeholder="Nome do cliente" {...register('customerName')} />

      <Controller
        control={control}
        name="status"
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select defaultValue="all" disabled={disabled} name={name} onValueChange={onChange} value={value}>
              <SelectTrigger className="w-[180px]" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelados</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <Button size="xs" type="submit" variant="secondary">
        <Sliders className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button onClick={handleRemoveFilters} size="xs" type="button" variant="outline">
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
