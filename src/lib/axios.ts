import axios from 'axios'
import { env } from '@/env'

const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

export default api

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, Math.round(Math.random() * 3000))) // Simulate a delay of up to 2 seconds
    return config
  })
}
