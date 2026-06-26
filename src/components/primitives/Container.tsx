import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

const widthClass = {
  default: 'max-w-stage',
  narrow: 'max-w-3xl',
  readable: 'max-w-readable',
} as const

/** Centra el contenido con un ancho máximo y gutters mobile-first. */
export function Container({
  children,
  width = 'default',
  className,
}: {
  children: ReactNode
  width?: keyof typeof widthClass
  className?: string
}) {
  return (
    <div className={cn('relative z-10 mx-auto px-5 sm:px-8', widthClass[width], className)}>{children}</div>
  )
}
