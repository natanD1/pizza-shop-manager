import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-foreground/5 border-r bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 font-medium text-foreground text-lg">
          <Pizza className="h-6 w-6" /> pizza.shop
        </div>

        <footer className="text-muted-foreground text-xs">
          Copyright &copy; {new Date().getFullYear()} Developed by{' '}
          <a href="https://github.com/natanD1" rel="noopener noreferrer" target="_blank">
            Natan Dourado
          </a>
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
