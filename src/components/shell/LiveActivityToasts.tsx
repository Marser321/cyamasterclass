import { useEffect, useRef, useState } from 'react'
import { Users, X } from '../primitives/icons'
import { ACTIVITY_ACTION, ACTIVITY_DISCLAIMER, ACTIVITY_FEED, type ActivityEntry } from '../../content/social-proof'

// ─────────────────────────────────────────────────────────────────────────
//  Toasts flotantes de prueba social (abajo-izquierda; WhatsApp queda abajo-
//  derecha). Actividad SIMULADA e ILUSTRATIVA de la demo (ver social-proof.ts):
//  rotan nombre+ciudad de una lista. Descartable, pausa al hover, respeta
//  reduced-motion (sin slide), se oculta en viewports muy bajos. Honesto:
//  cada toast lleva su micro-nota "actividad ilustrativa de la demo".
// ─────────────────────────────────────────────────────────────────────────

const SHOW_MS = 6500 // visible
const GAP_MS = 9000 // oculto entre toasts
const FIRST_DELAY_MS = 4000 // no salta al instante de cargar

type Shown = ActivityEntry & { hace: number; key: number }

function pick(i: number): Shown {
  const e = ACTIVITY_FEED[i % ACTIVITY_FEED.length]
  // "hace N min" determinista por índice (sin Math.random, estable entre renders).
  const hace = 2 + ((i * 7) % 27)
  return { ...e, hace, key: i }
}

export function LiveActivityToasts({ enabled = true }: { enabled?: boolean }) {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const pausedRef = useRef(false) // ref, no estado: el ciclo lo lee sin closure stale
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!enabled || dismissed) return
    let cancelled = false

    const cycle = (firstDelay: number) => {
      timer.current = window.setTimeout(function show() {
        if (cancelled) return
        if (pausedRef.current) {
          // reintenta pronto sin avanzar mientras el cursor está encima
          timer.current = window.setTimeout(show, 1200)
          return
        }
        setVisible(true)
        timer.current = window.setTimeout(() => {
          if (cancelled) return
          setVisible(false)
          setIdx((n) => n + 1)
          cycle(GAP_MS)
        }, SHOW_MS)
      }, firstDelay)
    }

    cycle(FIRST_DELAY_MS)
    return () => {
      cancelled = true
      window.clearTimeout(timer.current)
    }
  }, [enabled, dismissed])

  if (!enabled || dismissed) return null

  const item = pick(idx)

  return (
    <div
      aria-live="polite"
      className={[
        'fixed bottom-5 left-5 z-40 hidden max-w-[19rem] [@media(min-height:520px)]:block',
        'transition-all duration-500 motion-reduce:transition-none',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      ].join(' ')}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="relative rounded-2xl bg-navy-soft/90 p-3.5 pr-9 shadow-glass-dark gold-hairline backdrop-blur-md">
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Ocultar avisos de actividad"
          className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-ivory/45 transition-colors hover:bg-white/5 hover:text-ivory/80"
        >
          <X />
        </button>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/12 text-gold">
            <Users />
          </span>
          <div>
            <p className="text-[13.5px] leading-snug text-ivory">
              <strong className="font-semibold text-ivory">{item.nombre}</strong>{' '}
              <span className="text-ivory/70">de {item.ciudad}</span>{' '}
              {ACTIVITY_ACTION}.
            </p>
            <p className="mt-0.5 text-[11px] text-ivory/45">
              hace {item.hace} min · {ACTIVITY_DISCLAIMER}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
