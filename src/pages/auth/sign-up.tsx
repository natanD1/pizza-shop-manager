import { Label } from '@radix-ui/react-label'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const signUpForm = z.object({
  restaurantName: z.string(),
  managementName: z.string(),
  phone: z.number(),
  email: z.email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  async function handleSignUp(data: SignUpForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      })
    } catch {
      toast.error('Erro ao cadastrar o restaurante')
    }
  }

  return (
    <div className=" p-8">
      <Button asChild className="absolute top-8 right-8" variant={'ghost'}>
        <Link to={'/sign-in'}>Fazer Login</Link>
      </Button>

      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-semibold text-2xl tracking-tight">Criar conta grátis</h1>
          <p className="text-muted-foreground text-sm ">Seja um parceiro e come suas vendas!</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
          <div className="flex flex-col gap-2">
            <Label className="font-semibold" htmlFor="restaurantName">
              Nome do estabelecimento
            </Label>
            <Input id="restaurantName" type="text" {...register('restaurantName')} />

            <Label className="font-semibold" htmlFor="managementName">
              Nome do gerente
            </Label>
            <Input id="managementName" type="text" {...register('managementName')} />

            <Label className="font-semibold" htmlFor="phone">
              Telefone
            </Label>
            <Input id="phone" type="tel" {...register('phone')} />

            <Label className="font-semibold" htmlFor="email">
              E-mail
            </Label>
            <Input id="email" type="email" {...register('email')} />
          </div>

          <Button className="w-full" disabled={isSubmitting} type="submit">
            Entrar
          </Button>

          <p className="px-6 text-center text-muted-foreground text-sm leading-relaxed">
            Ao continuar você concorda com nossos{' '}
            <Link className="underline underline-offset-4" to="/terms">
              Termos de Uso
            </Link>{' '}
            e{' '}
            <Link className="underline underline-offset-4" to="/privacy">
              Política de Privacidade
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  )
}
