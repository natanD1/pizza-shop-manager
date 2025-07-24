import { RouterProvider } from 'react-router'
import { Toaster } from 'sonner'
import { router } from '@/routes'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="pizzashop-theme">
      <Toaster richColors />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
