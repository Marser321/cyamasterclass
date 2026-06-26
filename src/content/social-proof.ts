// ─────────────────────────────────────────────────────────────────────────
//  PRUEBA SOCIAL — actividad ILUSTRATIVA para los toasts flotantes de la demo.
//  ⚠ NO son registros reales. En producción, alimentar desde el CRM/registro
//  real; mostrar datos inventados como si fueran reales sería prueba social
//  fabricada (implicación FTC). Mientras es demo, el banner DEMO global + la
//  micro-nota del propio toast lo dejan claro.
// ─────────────────────────────────────────────────────────────────────────

export type ActivityEntry = {
  /** Nombre de pila (sin apellido, por privacidad). */
  nombre: string
  /** Ciudad de un mercado ICP latino en EE.UU. */
  ciudad: string
}

/** Acción mostrada en el toast (sin promesas ni hype). */
export const ACTIVITY_ACTION = 'reservó su lugar'

/** Nota honesta al pie del toast (refuerza el banner DEMO). */
export const ACTIVITY_DISCLAIMER = 'Actividad ilustrativa de la demo'

// Nombres + ciudades de mercados con alta presencia latina en EE.UU.
export const ACTIVITY_FEED: readonly ActivityEntry[] = [
  { nombre: 'María', ciudad: 'Orlando, FL' },
  { nombre: 'José', ciudad: 'Hialeah, FL' },
  { nombre: 'Carolina', ciudad: 'Houston, TX' },
  { nombre: 'Luis', ciudad: 'Miami, FL' },
  { nombre: 'Daniela', ciudad: 'Filadelfia, PA' },
  { nombre: 'Roberto', ciudad: 'Tampa, FL' },
  { nombre: 'Andrea', ciudad: 'San Antonio, TX' },
  { nombre: 'Carlos', ciudad: 'Allentown, PA' },
  { nombre: 'Gabriela', ciudad: 'Kissimmee, FL' },
  { nombre: 'Miguel', ciudad: 'Newark, NJ' },
  { nombre: 'Valentina', ciudad: 'Pittsburgh, PA' },
  { nombre: 'Jorge', ciudad: 'Dallas, TX' },
  { nombre: 'Patricia', ciudad: 'Fort Lauderdale, FL' },
  { nombre: 'Fernando', ciudad: 'Reading, PA' },
  { nombre: 'Lucía', ciudad: 'Atlanta, GA' },
  { nombre: 'Ricardo', ciudad: 'Charlotte, NC' },
]
