import api from '@/lib/axios'

export interface RegisterRestaurantBody {
  managerName: string
  restaurantName: string
  email: string
  phone: number
}

export async function registerRestaurant({ email, managerName, phone, restaurantName }: RegisterRestaurantBody) {
  await api.post('/restaurants', { email, managerName, phone, restaurantName })
}
