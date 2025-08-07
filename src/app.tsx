import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import { Toaster } from 'sonner'
import { router } from '@/routes'
import { ThemeProvider } from './components/theme/theme-provider'
import { queryClient } from './lib/react-query'

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="pizzashop-theme">
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
