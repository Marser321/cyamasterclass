import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../primitives'
import { GHLForm } from './GHLForm'

/** Evento global para abrir el popup de reserva desde cualquier CTA
 *  (hero, CTA final y la barra de urgencia compartida). */
export const RESERVA_FORM_EVENT = 'mc:open-reserva'
export function openReservaForm() {
  window.dispatchEvent(new CustomEvent(RESERVA_FORM_EVENT))
}

/**
 * Popup "de lujo" con la estética de marca (navy profundo + hairline dorado,
 * glass, glow superior) que envuelve el form embebido de LeadConnector.
 *
 * Reemplaza la sección de formulario inline: los CTAs de la landing lo abren.
 * Bloquea el scroll del fondo mientras está abierto y cierra con Escape, con el
 * backdrop o con la X. El form solo se monta al abrir (carga fresca del iframe).
 */
export function FormModal({
  open,
  onClose,
  kicker = 'Masterclass gratis · en vivo',
  title = 'Reserva tu cupo',
  sub = 'Déjanos tu nombre y WhatsApp. Te enviamos el enlace de acceso por WhatsApp y correo.',
}: {
  open: boolean
  onClose: () => void
  kicker?: ReactNode
  title?: ReactNode
  sub?: ReactNode
}) {
  // Escape para cerrar + bloqueo del scroll del fondo mientras está abierto.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-midnight/85 px-4 py-6 backdrop-blur-md sm:items-center sm:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={typeof title === 'string' ? title : 'Reserva tu cupo'}
        >
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-navy gold-hairline shadow-[0_0_0_1px_rgba(201,162,75,0.35),0_30px_80px_-20px_rgba(0,0,0,0.7)]"
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow dorado superior (acento de marca) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(201,162,75,0.22),transparent_70%)]"
            />

            {/* Cerrar */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full text-ivory/70 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Encabezado */}
            <div className="relative px-6 pt-7 text-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                <Icon.Sparkles className="text-[13px]" /> {kicker}
              </span>
              <h2 className="mt-2.5 font-display text-2xl font-semibold text-ivory">{title}</h2>
              {sub && <p className="mx-auto mt-2 max-w-xs text-[13.5px] leading-snug text-ivory/65">{sub}</p>}
            </div>

            {/* Divisor hairline dorado */}
            <div className="mx-6 mt-5 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

            {/* Form embebido (LeadConnector) */}
            <div className="px-3 pb-4 pt-2 sm:px-4">
              <GHLForm formId="SuF59qryOrh5DqOu3hyR" formName="MASTERCLASS" title="MASTERCLASS" height={490} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
