import { Label } from '@radix-ui/react-label'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const signInForm = z.object({
  email: z.email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    try {
      // biome-ignore lint/suspicious/noConsole: <teste>
      console.log(data)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Enviamos um link para o seu e-mail. Acesse-o para entrar na plataforma.', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
      })
    } catch {
      toast.error('Credenciais Inválidas')
    }
  }

  return (
    <div className=" p-8">
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

          <Button className="w-full" disabled={isSubmitting} type="submit">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}
