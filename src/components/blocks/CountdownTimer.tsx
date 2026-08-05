import { useEffect, useState } from 'react'
import { cn } from '../../lib/cn'

// ─────────────────────────────────────────────────────────────────────────
//  Contador a una fecha REAL: o un instante fijo (`targetISO` string), o el
//  inicio de la próxima emisión de un evento recurrente (`targetISO` función,
//  ver lib/schedule.ts). En el caso recurrente el objetivo se re-evalúa en cada
//  tick, así que al terminar una sesión el contador RUEDA solo a la siguiente
//  sin recargar la página. Sigue siendo honesto: la cuenta es la misma para
//  todo el mundo y siempre cae en una sesión que de verdad se emite — nunca un
//  contador por visitante que arranca al cargar la página.
//  Chips estilo póster con hairline dorado. reduced-motion: sin transiciones.
// ─────────────────────────────────────────────────────────────────────────

type Parts = { dias: number; horas: number; min: number; seg: number; done: boolean }

/** Resuelve el objetivo (ms). Con función, se lee de nuevo en cada tick. */
function resolveTarget(target: string | (() => string)): number {
  return new Date(typeof target === 'function' ? target() : target).getTime()
}

function partsUntil(target: number, now: number): Parts {
  let diff = Math.max(0, target - now)
  const done = diff <= 0
  const dia = 24 * 60 * 60 * 1000
  const dias = Math.floor(diff / dia)
  diff -= dias * dia
  const horas = Math.floor(diff / (60 * 60 * 1000))
  diff -= horas * 60 * 60 * 1000
  const min = Math.floor(diff / (60 * 1000))
  diff -= min * 60 * 1000
  const seg = Math.floor(diff / 1000)
  return { dias, horas, min, seg, done }
}

const pad = (n: number) => String(n).padStart(2, '0')

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-[3.75rem] flex-col items-center rounded-xl bg-navy-soft/70 px-3.5 py-2 gold-hairline sm:min-w-[4.75rem]">
      <span className="font-display text-3xl font-semibold tabular-nums text-ivory sm:text-4xl">{value}</span>
      <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/80">{label}</span>
    </div>
  )
}

// Unidad compacta para la variante `inline` (barra de urgencia del header).
function InlineUnit({ value, unit }: { value: string; unit: string }) {
  return (
    <span className="tabular-nums">
      {value}
      <span className="text-gold/70">{unit}</span>
    </span>
  )
}

export function CountdownTimer({
  targetISO,
  label,
  expiredLabel = 'La próxima fecha se anunciará pronto.',
  variant = 'chips',
  className,
}: {
  /** Instante fijo (ISO) o función que devuelve el ISO de la próxima sesión.
   *  Si es función debe ser una referencia ESTABLE (definida a nivel de módulo,
   *  p. ej. `MASTERCLASS.targetISO`) para no recrear el intervalo en cada tick. */
  targetISO: string | (() => string)
  label?: string
  expiredLabel?: string
  /** `chips` = chips estilo póster (hero). `inline` = string compacto (barra slim). */
  variant?: 'chips' | 'inline'
  className?: string
}) {
  const [parts, setParts] = useState<Parts>(() => partsUntil(resolveTarget(targetISO), Date.now()))

  useEffect(() => {
    if (Number.isNaN(resolveTarget(targetISO))) return
    const tick = () => setParts(partsUntil(resolveTarget(targetISO), Date.now()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [targetISO])

  if (Number.isNaN(resolveTarget(targetISO))) return null

  // Variante compacta para la barra de urgencia: `12d · 04h · 33m · 12s`.
  if (variant === 'inline') {
    if (parts.done) {
      return <span className={cn('text-[12px] font-medium text-ivory/70', className)}>{expiredLabel}</span>
    }
    return (
      <div
        role="timer"
        aria-label={`Faltan ${parts.dias} días`}
        className={cn('flex items-center gap-1.5 font-display text-sm font-semibold text-ivory sm:gap-2.5 sm:text-[15px]', className)}
      >
        <InlineUnit value={pad(parts.dias)} unit="d" />
        <span className="text-gold/40">·</span>
        <InlineUnit value={pad(parts.horas)} unit="h" />
        <span className="text-gold/40">·</span>
        <InlineUnit value={pad(parts.min)} unit="m" />
        <span className="text-gold/40">·</span>
        <InlineUnit value={pad(parts.seg)} unit="s" />
      </div>
    )
  }

  if (parts.done) {
    return (
      <div className={cn('rounded-xl bg-navy-soft/70 px-4 py-3 text-center text-[14px] text-ivory/80 gold-hairline', className)}>
        {expiredLabel}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{label}</div>
      )}
      <div className="flex items-center gap-2 sm:gap-3" role="timer" aria-label={`Faltan ${parts.dias} días`}>
        <Unit value={pad(parts.dias)} label="Días" />
        <Unit value={pad(parts.horas)} label="Horas" />
        <Unit value={pad(parts.min)} label="Min" />
        <Unit value={pad(parts.seg)} label="Seg" />
      </div>
    </div>
  )
}
