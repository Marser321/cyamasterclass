import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DISCLAIMER_FULL } from '../../content/compliance'
import { ease } from '../../theme/tokens'
import { ChevronDown } from './icons'
import { cn } from '../../lib/cn'

/**
 * Bloque de descargo de responsabilidad — texto íntegro de 00-SISTEMA §8.
 * Nunca enterrado: con `collapsible` se pliega tras un botón (cerrado por
 * defecto) para restarle protagonismo, pero el encabezado-toggle queda visible
 * y la línea-resumen "No somos asesores…" vive aparte en el Footer (salvaguarda
 * de compliance). Va al pie de TODAS las páginas.
 */
export function Disclaimer({
  tone = 'light',
  collapsible = false,
  defaultOpen = !collapsible,
}: {
  tone?: 'light' | 'dark'
  collapsible?: boolean
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  const box = cn(
    'rounded-xl border p-4 text-[12px] leading-relaxed',
    // Oscuro-lujo: ambos tonos sobre navy.
    tone === 'dark'
      ? 'border-white/10 bg-white/[0.03] text-ivory/60'
      : 'border-gold/15 bg-white/[0.03] text-ivory/60',
  )
  const body = DISCLAIMER_FULL.replace('Descargo de responsabilidad: ', '')

  if (!collapsible) {
    return (
      <div className={box}>
        <p className="mb-1 font-semibold uppercase tracking-[0.14em] text-[10px] text-gold">
          Descargo de responsabilidad
        </p>
        {body}
      </div>
    )
  }

  return (
    <div className={box}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="font-semibold uppercase tracking-[0.14em] text-[10px] text-gold">
          Descargo de responsabilidad
        </span>
        <ChevronDown
          className={cn(
            'shrink-0 text-base text-gold transition-transform duration-300',
            open && 'rotate-180',
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: ease.out }}
            className="overflow-hidden"
          >
            <p className="pt-2">{body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
