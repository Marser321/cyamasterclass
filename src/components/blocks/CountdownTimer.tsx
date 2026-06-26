import { useEffect, useState } from 'react'
import { cn } from '../../lib/cn'

// ─────────────────────────────────────────────────────────────────────────
//  Contador a una FECHA FIJA real (la próxima sesión de la masterclass).
//  Honesto a propósito: apunta a un instante absoluto; al pasar, muestra un
//  estado grácil — NO se reinicia solo (eso sería un "countdown falso").
//  Chips estilo póster con hairline dorado. reduced-motion: sin transiciones.
// ─────────────────────────────────────────────────────────────────────────

type Parts = { dias: number; horas: number; min: number; seg: number; done: boolean }

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
    <div className="flex min-w-[3.5rem] flex-col items-center rounded-xl bg-navy-soft/70 px-3 py-2 gold-hairline sm:min-w-[4.25rem]">
      <span className="font-display text-2xl font-semibold tabular-nums text-ivory sm:text-3xl">{value}</span>
      <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold/80">{label}</span>
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
  targetISO: string
  label?: string
  expiredLabel?: string
  /** `chips` = chips estilo póster (hero). `inline` = string compacto (barra slim). */
  variant?: 'chips' | 'inline'
  className?: string
}) {
  const target = new Date(targetISO).getTime()
  const [parts, setParts] = useState<Parts>(() => partsUntil(target, Date.now()))

  useEffect(() => {
    if (Number.isNaN(target)) return
    const tick = () => setParts(partsUntil(target, Date.now()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [target])

  if (Number.isNaN(target)) return null

  // Variante compacta para la barra de urgencia: `12d · 04h · 33m · 12s`.
  if (variant === 'inline') {
    if (parts.done) {
      return <span className={cn('text-[12px] font-medium text-ivory/70', className)}>{expiredLabel}</span>
    }
    return (
      <div
        role="timer"
        aria-label={`Faltan ${parts.dias} días`}
        className={cn('flex items-center gap-1.5 font-display text-[13px] font-semibold text-ivory sm:gap-2 sm:text-sm', className)}
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
