import { Link, type LinkProps, useLocation } from 'react-router'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      className="flex items-center gap-1.5 font-medium text-muted-foreground text-sm transition duration-300 hover:text-foreground data-[current=true]:text-foreground"
      data-current={pathname === props.to}
      {...props}
    />
  )
}
