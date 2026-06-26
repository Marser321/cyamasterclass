import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { ease, revealItem, revealItemSubtle, stagger } from '../../theme/tokens'

const viewport = { once: true, margin: '-12% 0px' } as const

/** Revela un bloque al entrar en viewport (sube + aparece). Reduced-motion safe. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, ease: ease.out, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Contenedor que escalona la entrada de sus <RevealItem/>. */
export function Stagger({
  children,
  className,
  gap = 0.09,
}: {
  children: ReactNode
  className?: string
  gap?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={stagger(gap)}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  subtle = false,
}: {
  children: ReactNode
  className?: string
  subtle?: boolean
}) {
  return (
    <motion.div className={cn(className)} variants={subtle ? revealItemSubtle : revealItem}>
      {children}
    </motion.div>
  )
}
