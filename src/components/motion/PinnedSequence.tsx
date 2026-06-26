import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/**
 * Secuencia de pasos.
 *
 * Históricamente hacía scrollytelling "pinned" (un spacer alto + position:sticky
 * que avanzaba paso a paso con el scroll). En desktop eso dejaba un VACÍO ENORME:
 * el contenido fijo se despinea cerca del final y queda ~1 viewport de sección
 * vacía antes de la siguiente — agravado por la textura de fondo a pantalla
 * completa. Era frágil y reñido con la marca sobria.
 *
 * Hasta reconstruir una variante pinned sin-vacío verificada en navegador real,
 * renderizamos SIEMPRE el estado completo (todos los pasos revelados) — el mismo
 * layout estático que ya usábamos en móvil/táctil y que se ve bien. La firma se
 * mantiene intacta (incluido `vhPerStep`) para no tocar los call sites.
 */
export function PinnedSequence({
  count,
  children,
  className,
}: {
  count: number
  children: (active: number) => ReactNode
  className?: string
  /** Reservado (compatibilidad); ya no se usa en el render estático. */
  vhPerStep?: number
}) {
  return <div className={cn('relative', className)}>{children(count - 1)}</div>
}
