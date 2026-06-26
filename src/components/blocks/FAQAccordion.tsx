import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ease } from '../../theme/tokens'
import { ChevronDown } from '../primitives/icons'
import { cn } from '../../lib/cn'

export type QA = { q: string; a: string }

/** Acordeón de preguntas frecuentes (accesible: button + región + aria-expanded). */
export function FAQAccordion({ items, tone = 'light' }: { items: QA[]; tone?: 'light' | 'dark' }) {
  const [open, setOpen] = useState<number | null>(0)
  const dark = tone === 'dark'

  return (
    <div className="mx-auto max-w-2xl divide-y divide-current/10">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.q} className="text-ivory">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="font-display text-base font-medium sm:text-lg">{it.q}</span>
              <ChevronDown
                className={cn(
                  'shrink-0 text-lg text-gold transition-transform duration-300',
                  isOpen && 'rotate-180',
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: ease.out }}
                  className="overflow-hidden"
                >
                  <p className={cn('pb-4 text-[14.5px] leading-relaxed', dark ? 'text-ivory/70' : 'text-ivory/75')}>
                    {it.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
