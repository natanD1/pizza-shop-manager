import axios from 'axios'
import { env } from '@/env'

const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

export default api

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate a delay of 2 seconds
    return config
  })
}
