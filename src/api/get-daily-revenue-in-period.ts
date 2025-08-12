import api from '@/lib/axios'

export interface GetDailyRevenueInPeriodQuery {
  to?: Date
  from?: Date
}

export type GetDailyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

export async function getDailyRevenueInPeriod({ from, to }: GetDailyRevenueInPeriodQuery) {
  const response = await api.get<GetDailyRevenueInPeriodResponse>('/metrics/daily-receipt-in-period', {
    params: {
      to,
      from,
    },
  })

  return response.data
}
