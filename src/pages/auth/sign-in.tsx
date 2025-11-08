import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const signInForm = z.object({
  email: z.email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate(data)

      toast.success('Enviamos um link para o seu e-mail. Acesse-o para entrar na plataforma.', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
      })
    } catch {
      toast.error('E-mail inválido ou não cadastrado.')
    }
  }

  return (
    <div className="p-8">
      <Button asChild className="absolute top-8 right-8" variant={'ghost'}>
        <Link to={'/sign-up'}>Cadastrar-se</Link>
      </Button>

      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-semibold text-2xl tracking-tight">Acessar painel</h1>
          <p className="text-muted-foreground text-sm ">Acompanhe suas vendas pelo painel do parceiro!</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <div className="flex flex-col gap-2">
            <Label className="font-semibold" htmlFor="email">
              E-mail
            </Label>
            <Input id="email" type="email" {...register('email')} />
          </div>

          <Button className="w-full cursor-pointer text-white" disabled={isSubmitting} type="submit">
            Acessar Painel
          </Button>
        </form>
      </div>
    </div>
  )
}
