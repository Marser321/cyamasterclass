import { useEffect, useState } from 'react'

/**
 * Mantiene sincronizado un objetivo RECURRENTE (evergreen, ver lib/schedule.ts).
 *
 * El `CountdownTimer` ya re-evalúa su objetivo en cada tick, pero los textos que
 * lo acompañan (la etiqueta "Viernes 7 de agosto" de la barra, el chip de fecha
 * del gracias, el .ics) se calculan durante el render del componente que los
 * contiene. En una pestaña abierta desde antes de la clase ese componente no
 * vuelve a renderizarse por su cuenta, así que la fecha quedaría vieja mientras
 * el contador ya apunta a la semana siguiente. Este hook fuerza el re-render en
 * el instante en que el objetivo cambia de semana.
 *
 * Devuelve el ISO ya resuelto. Con un objetivo fijo (string) no hace nada.
 */
export function useEvergreenTarget(target?: string | (() => string)): string | undefined {
  const resolve = () => (typeof target === 'function' ? target() : target)
  const [iso, setIso] = useState<string | undefined>(resolve)

  useEffect(() => {
    if (typeof target !== 'function') {
      setIso(target)
      return
    }
    const tick = () => setIso((prev) => (prev === target() ? prev : target()))
    tick()
    // Cada segundo, pero con `prev === next` React descarta el re-render: solo
    // redibuja en el segundo exacto del salto de semana.
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [target])

  return iso
}
