import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CTAButton } from '../primitives/CTAButton'
import { Check, X, Lock, ArrowRight } from '../primitives/icons'
import { ease } from '../../theme/tokens'
import { DEMO_NOTE } from '../../content/compliance'
import { cn } from '../../lib/cn'

export type CheckoutProduct = {
  name: string
  price: string
  priceNote?: string
  bullets?: string[]
}

/**
 * Modal de checkout SIMULADO (decisión de marca: mock funcional, sin cobro real).
 * Banner DEMO siempre visible. Nunca usa countdowns falsos (el cupo es por
 * capacidad real de la cohorte). Controlado por el padre vía `open`.
 */
export function CheckoutMock({
  open,
  onClose,
  product,
  continueTo,
}: {
  open: boolean
  onClose: () => void
  product: CheckoutProduct
  continueTo?: string
}) {
  const [paid, setPaid] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  // Reinicia el estado de pago al cerrar.
  useEffect(() => {
    if (!open) {
      const t = window.setTimeout(() => setPaid(false), 250)
      return () => window.clearTimeout(t)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Checkout — ${product.name}`}
        >
          <div className="absolute inset-0 bg-midnight/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-navy text-ivory shadow-glass-dark gold-hairline"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: ease.out }}
          >
            {/* Banner DEMO */}
            <div className="flex items-center gap-2 bg-gold/12 px-4 py-2 text-[11.5px] font-medium text-gold">
              <Lock className="text-[12px]" />
              {DEMO_NOTE}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-3 top-9 grid h-8 w-8 place-items-center rounded-full text-ivory/50 hover:bg-white/5 hover:text-ivory"
            >
              <X />
            </button>

            {paid ? (
              <div className="p-7 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-3xl text-gold">
                  <Check />
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold text-ivory">Pago confirmado (demo)</h3>
                <p className="mt-1.5 text-[14px] text-ivory/70">
                  En producción aquí se procesaría el pago de <strong>{product.name}</strong> y se enviaría el
                  acceso por correo y WhatsApp.
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  {continueTo && (
                    <CTAButton to={continueTo} variant="primary" size="md" icon={<ArrowRight />}>
                      Ver la página de gracias
                    </CTAButton>
                  )}
                  <CTAButton variant="secondary" size="md" onClick={onClose}>
                    Cerrar
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-7">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Resumen del pedido</div>
                <h3 className="mt-1 font-display text-xl font-semibold text-ivory">{product.name}</h3>

                <div className="mt-4 flex items-baseline justify-between border-y border-white/10 py-3">
                  <span className="text-[14px] text-ivory/70">Total</span>
                  <div className="text-right">
                    <div className="font-display text-3xl font-semibold tabular-nums text-ivory">{product.price}</div>
                    {product.priceNote && <div className="text-[12px] text-ivory/55">{product.priceNote}</div>}
                  </div>
                </div>

                {product.bullets && (
                  <ul className="mt-4 space-y-1.5">
                    {product.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-[13.5px] text-ivory/75">
                        <Check className="mt-0.5 shrink-0 text-gold" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6">
                  <CTAButton variant="primary" size="lg" className="w-full" onClick={() => setPaid(true)}>
                    Pagar {product.price} (simulado)
                  </CTAButton>
                  <p className="mt-2 text-center text-[12px] text-ivory/55">
                    Cupos limitados por el tamaño real del grupo — sin urgencia artificial.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
