import { Link, useLocation } from 'react-router-dom'
import { CountdownTimer } from '../blocks'
import { DEADLINES } from '../../content/brand'
import { ArrowRight } from '../primitives/icons'

/**
 * Barra slim de urgencia, FIJA sobre el header. CONTEXTUAL por ruta: solo aparece
 * en landings con una FECHA REAL (masterclass, intensivo) tomada de `DEADLINES`.
 * En páginas sin deadline (mentoría, comunidad, gracias, autoridad) se OCULTA —
 * así no se promociona la masterclass fuera de contexto ni se inventa urgencia.
 * Honesta: el contador apunta a un instante fijo; al pasar, estado grácil sin
 * reinicio (carve-out de compliance). El conteo lo delega al CountdownTimer.
 */
export function UrgencyBar() {
  const { pathname } = useLocation()
  const deadline = DEADLINES[pathname]
  if (!deadline) return null

  return (
    <div
      role="region"
      aria-label={deadline.barLabel}
      className="fixed inset-x-0 top-0 z-50 border-b border-gold/25 bg-midnight/95 backdrop-blur-md"
    >
      <div className="mx-auto flex h-11 max-w-stage items-center justify-center gap-2.5 px-4 sm:h-12 sm:gap-4 sm:px-6">
        <span className="hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-gold sm:inline">
          {deadline.barLabel}
        </span>
        <span aria-hidden className="hidden text-gold/25 sm:inline">
          |
        </span>
        <CountdownTimer targetISO={deadline.targetISO} variant="inline" expiredLabel="Próxima fecha: pronto" />
        <Link
          to={deadline.barCta.to}
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-b from-gold-bright to-gold-deep px-3 py-1 text-[12px] font-semibold text-midnight transition hover:brightness-110"
        >
          {deadline.barCta.label}
          <ArrowRight className="text-[11px]" />
        </Link>
      </div>
    </div>
  )
}
