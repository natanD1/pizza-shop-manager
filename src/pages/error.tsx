import { Link, useRouteError } from 'react-router'
import NotFoundImage from '@/assets/error404alien.svg'

export function ErrorPage() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <picture>
        <img alt="Página não encontrada" className="w-64 md:w-96" src={NotFoundImage} />
      </picture>
      <h1 className="font-bold text-4xl">Whoops, algo aconteceu...</h1>
      <p className="space-y-1.5 text-center text-accent-foreground">
        Um erro aconteceu na aplicação, abaixo estão mais detalhes:
        <pre>{error?.message || JSON.stringify(error)}</pre>
        <Link className="text-sky-600 dark:text-sky-400" to="/">
          Voltar para o Dashboard
        </Link>
      </p>
    </div>
  )
}
