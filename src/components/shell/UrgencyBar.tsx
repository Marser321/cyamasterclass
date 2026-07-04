import { Link, useLocation } from 'react-router-dom'
import { CountdownTimer } from '../blocks'
import { DEADLINES } from '../../content/brand'
import { ArrowRight } from '../primitives/icons'
import { openReservaForm } from '../forms/FormModal'

const ctaClass =
  'inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-b from-gold-bright to-gold-deep px-3.5 py-1.5 text-[12.5px] font-bold text-midnight transition hover:brightness-110 sm:text-[13px]'

/**
 * Barra slim de urgencia, FIJA sobre el header. CONTEXTUAL por ruta: solo aparece
 * en landings con una FECHA REAL (masterclass, intensivo) tomada de `DEADLINES`.
 * En páginas sin deadline (mentoría, comunidad, gracias, autoridad) se OCULTA —
 * así no se promociona la masterclass fuera de contexto ni se inventa urgencia.
 * Honesta: el contador apunta a un instante fijo; al pasar, estado grácil sin
 * reinicio (carve-out de compliance). El conteo lo delega al CountdownTimer.
 */
function formatBarLabel(label: string) {
  // Coincide con fechas en español como "Martes 21 de julio", "10 de julio", etc.
  const regex = /(?:lunes|martes|miércoles|jueves|viernes|sábado|domingo)?\s*\d+\s+de\s+[a-zA-Záéíóú]+/i;
  const match = label.match(regex);
  if (!match) return label;

  const dateStr = match[0];
  const index = label.indexOf(dateStr);
  const before = label.substring(0, index);
  const after = label.substring(index + dateStr.length);

  return (
    <>
      {before}
      <span className="text-[1.05em] font-bold text-gold-bright drop-shadow-[0_0_5px_rgba(227,199,122,0.45)] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(227,199,122,0.7)] px-1 align-baseline inline-block">
        {dateStr}
      </span>
      {after}
    </>
  );
}

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
      <div className="mx-auto flex h-[50px] max-w-stage items-center justify-center gap-2.5 px-4 sm:h-[54px] sm:gap-4 sm:px-6">
        <span className="hidden text-[13.5px] font-semibold uppercase tracking-[0.1em] text-gold sm:inline sm:text-[14.5px]">
          {formatBarLabel(deadline.barLabel)}
        </span>
        <span aria-hidden className="hidden text-gold/25 sm:inline">
          |
        </span>
        <CountdownTimer targetISO={deadline.targetISO} variant="inline" expiredLabel="Próxima fecha: pronto" />
        {deadline.barCta.openForm ? (
          <button type="button" onClick={openReservaForm} className={ctaClass}>
            {deadline.barCta.label}
            <ArrowRight className="text-[11px]" />
          </button>
        ) : (
          <Link to={deadline.barCta.to ?? '/'} className={ctaClass}>
            {deadline.barCta.label}
            <ArrowRight className="text-[11px]" />
          </Link>
        )}
      </div>
    </div>
  )
}
