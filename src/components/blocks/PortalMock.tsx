import { Lock } from '../primitives/icons'
import { cn } from '../../lib/cn'

type Listing = { caso: string; condado: string; estado: 'Programada' | 'Cerrada' | 'En revisión'; deuda: string }

const SAMPLE: Listing[] = [
  { caso: 'TD-2026-0413', condado: 'Washington, PA', estado: 'Programada', deuda: '$7,512' },
  { caso: 'TD-2026-0419', condado: 'Hillsborough, FL', estado: 'En revisión', deuda: '$4,180' },
  { caso: 'TD-2026-0422', condado: 'Polk, FL', estado: 'Programada', deuda: '$9,940' },
  { caso: 'TD-2026-0431', condado: 'Allegheny, PA', estado: 'Cerrada', deuda: '$6,025' },
]

const estadoClass: Record<Listing['estado'], string> = {
  Programada: 'bg-olive/15 text-olive',
  'En revisión': 'bg-smoke/20 text-smoke',
  Cerrada: 'bg-charcoal/10 text-charcoal/55',
}

/**
 * Mock sobrio de un portal público de subastas del condado (prueba de pericia,
 * receta M3). Datos ilustrativos: muestran la MECÁNICA pública (caso, condado,
 * deuda fiscal), nunca proyección de ganancia.
 */
export function PortalMock({ rows = SAMPLE, className }: { rows?: Listing[]; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-glass', className)}>
      {/* Chrome del navegador */}
      <div className="flex items-center gap-2 border-b border-charcoal/10 bg-ivory-dim px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-smoke/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-smoke/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-smoke/40" />
        <div className="ml-3 flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-[11px] text-smoke">
          <Lock className="text-[11px]" />
          condado.gov / tax-deed-sales
        </div>
      </div>
      {/* Encabezado */}
      <div className="border-b border-charcoal/10 px-4 py-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-olive">Portal público de subastas</div>
        <div className="font-display text-base font-semibold text-charcoal">Calendario de Tax Deed Sales</div>
      </div>
      {/* Tabla */}
      <table className="w-full text-left text-[12.5px]">
        <thead className="text-[10.5px] uppercase tracking-[0.1em] text-smoke">
          <tr className="border-b border-charcoal/10">
            <th className="px-4 py-2 font-semibold">Caso</th>
            <th className="px-4 py-2 font-semibold">Condado</th>
            <th className="px-4 py-2 font-semibold">Estado</th>
            <th className="px-4 py-2 text-right font-semibold">Deuda fiscal</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.caso} className="border-b border-charcoal/[0.06] last:border-0">
              <td className="px-4 py-2.5 font-mono text-[11.5px] text-charcoal/70">{r.caso}</td>
              <td className="px-4 py-2.5 text-charcoal/80">{r.condado}</td>
              <td className="px-4 py-2.5">
                <span className={cn('rounded-full px-2 py-0.5 text-[10.5px] font-semibold', estadoClass[r.estado])}>
                  {r.estado}
                </span>
              </td>
              <td className="px-4 py-2.5 text-right font-display tabular-nums text-charcoal">{r.deuda}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
