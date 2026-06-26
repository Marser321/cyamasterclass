import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { Magnetic } from '../motion/Magnetic'

type Variant = 'primary' | 'secondary' | 'whatsapp' | 'ghost' | 'light'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight focus-visible:ring-gold/60 disabled:opacity-60 disabled:pointer-events-none'

// Sistema oscuro-lujo: primario = dorado metálico (look "RESERVA TU CUPO" del
// flyer) con texto navy profundo; secundario = ring dorado; whatsapp conserva el
// verde de marca por reconocibilidad.
const variantClass: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-gold-bright via-gold to-gold-deep text-midnight hover:brightness-105 shadow-cta hover:-translate-y-0.5',
  secondary:
    'bg-transparent text-gold ring-1 ring-gold/40 hover:ring-gold/70 hover:bg-gold/[0.06]',
  whatsapp: 'bg-olive text-ivory hover:brightness-110 shadow-cta hover:-translate-y-0.5',
  ghost: 'bg-transparent text-ivory/80 hover:text-ivory underline-offset-4 hover:underline',
  light: 'bg-ivory text-charcoal hover:bg-white shadow-glass hover:-translate-y-0.5',
}

const sizeClass: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  icon?: ReactNode
}

/**
 * Botón/enlace de acción. Polimórfico: `to` → <Link> interno, `href` →
 * <a> externo (nueva pestaña), si no → <button onClick>.
 */
export function CTAButton({
  children,
  variant = 'primary',
  size = 'lg',
  className,
  icon,
  to,
  href,
  onClick,
  type = 'button',
  magnetic = false,
}: CommonProps & {
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  /** Tirón magnético sutil hacia el cursor (solo desktop). Para CTAs principales. */
  magnetic?: boolean
}) {
  const classes = cn(base, variantClass[variant], sizeClass[size], className)
  const content = (
    <>
      {children}
      {icon}
    </>
  )

  const el = to ? (
    <Link to={to} className={classes}>
      {content}
    </Link>
  ) : href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {content}
    </a>
  ) : (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  )

  return magnetic ? <Magnetic strength={7}>{el}</Magnetic> : el
}
