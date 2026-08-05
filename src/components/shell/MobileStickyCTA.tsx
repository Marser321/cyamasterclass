import { useEffect, useState } from 'react'
import { CTAButton, Icon } from '../primitives'
import { cn } from '../../lib/cn'

/**
 * CTA fijo al pie, SOLO en móvil (`sm:hidden`): en el teléfono el botón de
 * registro queda siempre a un pulgar de distancia, sin importar dónde esté el
 * scroll.
 *
 * No duplica: se muestra únicamente cuando NINGÚN CTA real está en pantalla. Los
 * CTAs de la página se marcan con `data-cta-anchor`; mientras uno esté visible
 * (el del hero, el del cierre) la barra se retira, así no tapa el botón que el
 * usuario ya tiene delante ni el pie de página.
 *
 * Entra y sale con una transición CSS (`translate-y-full` → `translate-y-0`), no
 * con montaje/desmontaje: el estado final se aplica al instante aunque el
 * navegador no esté animando, y `motion-reduce` la desactiva. Respeta el área
 * segura del iPhone (`env(safe-area-inset-bottom)`).
 */
export function MobileStickyCTA({
  label,
  note,
  onClick,
}: {
  label: string
  /** Línea corta sobre el botón (p. ej. "Gratis · Martes 11 de agosto"). */
  note?: string
  onClick: () => void
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Se calcula por rect en `scroll`/`resize`, no con IntersectionObserver: es
    // trivial de razonar y resuelve bien en el primer render, sin depender de que
    // el navegador entregue un frame antes del primer callback.
    let anchors: Element[] = []
    const update = () => {
      if (!anchors.length) anchors = Array.from(document.querySelectorAll('[data-cta-anchor]'))
      const vh = window.innerHeight
      const algunoALaVista = anchors.some((a) => {
        const r = a.getBoundingClientRect()
        return r.bottom > 0 && r.top < vh
      })
      setVisible(anchors.length > 0 && !algunoALaVista)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-gold/25 bg-midnight/95 px-4 pt-2 backdrop-blur-md transition-transform duration-200 ease-out motion-reduce:transition-none sm:hidden',
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full',
      )}
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      {note && (
        <p className="mb-1 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-gold/90">
          {note}
        </p>
      )}
      <CTAButton onClick={onClick} icon={<Icon.ArrowRight />} size="md" className="w-full py-3 text-[15px]">
        {label}
      </CTAButton>
    </div>
  )
}
