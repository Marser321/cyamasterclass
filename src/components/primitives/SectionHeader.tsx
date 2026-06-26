import type { ReactNode } from 'react'
import { Kicker } from './Kicker'
import { DisplayHeading } from './DisplayHeading'
import { Reveal } from '../motion/Reveal'
import { cn } from '../../lib/cn'

/** Encabezado de sección: kicker + titular + intro. Reutilizado en todas las landings. */
export function SectionHeader({
  kicker,
  title,
  intro,
  align = 'center',
  size = 'lg',
  tone = 'light',
  className,
}: {
  kicker?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'center' | 'left'
  size?: 'xl' | 'lg' | 'md'
  tone?: 'light' | 'dark'
  className?: string
}) {
  const centered = align === 'center'
  return (
    <Reveal
      className={cn(centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl', className)}
    >
      {kicker && <Kicker className="mb-3">{kicker}</Kicker>}
      <DisplayHeading size={size}>{title}</DisplayHeading>
      {intro && (
        <p
          className={cn(
            'mt-4 text-[16px] leading-relaxed text-pretty sm:text-[17px]',
            // Oscuro-lujo: ambos tonos viven sobre navy → texto ivory.
            tone === 'dark' ? 'text-ivory/70' : 'text-ivory/75',
            centered && 'mx-auto',
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  )
}
