import { useEffect, useState } from 'react'

// Puntero grueso (táctil) O viewport angosto (móvil). Lista separada por coma = OR.
const QUERY = '(pointer: coarse), (max-width: 767px)'

/**
 * `true` en táctil/puntero grueso O en viewport móvil (<768px).
 * Guardarraíl de rendimiento + marca: el parallax y el scrollytelling pinned se
 * DESACTIVAN en estos casos (perf en touch, layout simple en móvil). SSR-safe.
 * (Nombre histórico; hoy cubre también móvil por ancho.)
 */
export function useIsCoarsePointer(): boolean {
  const [match, setMatch] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia(QUERY)
    const update = () => setMatch(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  return match
}
