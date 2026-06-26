import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

const sizeClass = {
  xl: 'text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em]',
  lg: 'text-3xl sm:text-4xl lg:text-5xl tracking-[-0.015em]',
  md: 'text-2xl sm:text-3xl lg:text-4xl tracking-[-0.01em]',
  sm: 'text-xl sm:text-2xl tracking-[-0.004em]',
} as const

/** Titular display editorial (Fraunces serif): tracking suave, leading ajustado, balance. */
export function DisplayHeading({
  children,
  size = 'lg',
  as: As = 'h2',
  className,
}: {
  children: ReactNode
  size?: keyof typeof sizeClass
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}) {
  return (
    <As
      className={cn(
        'font-display font-semibold leading-[1.08] text-balance',
        sizeClass[size],
        className,
      )}
    >
      {children}
    </As>
  )
}
