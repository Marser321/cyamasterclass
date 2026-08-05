// ─────────────────────────────────────────────────────────────────────────
//  HORARIO RECURRENTE (evergreen) — resuelve la PRÓXIMA emisión real de un
//  evento semanal fijo: mismo día de la semana + misma hora local, en una zona
//  horaria IANA y respetando el horario de verano (en Miami, EDT ↔ EST).
//
//  Compliance (carve-out de content/compliance.ts): esto NO es un "countdown
//  falso". El contador sigue apuntando a un instante absoluto y REAL — la
//  próxima emisión de una clase que de hecho se da todas las semanas. Lo
//  prohibido sigue prohibido: un contador por visitante (que arranca al cargar
//  la página o se guarda en cookie) y un contador que no corresponde a ninguna
//  sesión real. Aquí la cuenta es la misma para todo el mundo y siempre cae en
//  una sesión que efectivamente se emite.
// ─────────────────────────────────────────────────────────────────────────

const MINUTE = 60_000

export type WeeklySchedule = {
  /** Día de la semana EN `timeZone`: 0 = domingo … 6 = sábado. */
  weekday: number
  /** Hora local de inicio (0–23). */
  hour: number
  /** Minuto local de inicio (por defecto 0). */
  minute?: number
  /** Zona horaria IANA, p. ej. 'America/New_York' (maneja EDT/EST sola). */
  timeZone: string
  /**
   * Minutos tras el inicio en los que la sesión se considera EN CURSO: el
   * contador se queda en cero (estado "empieza ahora") en vez de saltar ya a
   * la semana siguiente. Al agotarse, rueda a la próxima fecha.
   */
  graceMinutes?: number
}

const formatters = new Map<string, Intl.DateTimeFormat>()

function partsFormatter(timeZone: string): Intl.DateTimeFormat {
  let f = formatters.get(timeZone)
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    formatters.set(timeZone, f)
  }
  return f
}

/** Lee un instante como fecha/hora de PARED (calendario local) en la zona. */
function wallPartsOf(ts: number, timeZone: string) {
  const p: Record<string, string> = {}
  for (const { type, value } of partsFormatter(timeZone).formatToParts(ts)) p[type] = value
  return {
    year: Number(p.year),
    month: Number(p.month),
    day: Number(p.day),
    hour: Number(p.hour),
    minute: Number(p.minute),
    second: Number(p.second),
  }
}

/** Offset de la zona en ese instante, en ms (Miami en verano → −14 400 000). */
function offsetAt(ts: number, timeZone: string): number {
  const w = wallPartsOf(ts, timeZone)
  return Date.UTC(w.year, w.month - 1, w.day, w.hour, w.minute, w.second) - ts
}

/**
 * Instante absoluto (ms UTC) de una hora de pared concreta en la zona.
 * `day` puede desbordar el mes (Date.UTC normaliza), así que sirve para sumar
 * días sin pensar en fines de mes.
 */
function wallToInstant(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): number {
  const asUTC = Date.UTC(year, month - 1, day, hour, minute)
  // Primera pasada con el offset del tanteo; segunda pasada por si el tanteo
  // cayó al otro lado de un cambio de horario (marzo/noviembre).
  const first = asUTC - offsetAt(asUTC, timeZone)
  return asUTC - offsetAt(first, timeZone)
}

/**
 * Instante de inicio de la próxima emisión. Si la de hoy ya empezó pero sigue
 * dentro de `graceMinutes`, devuelve ESA (el contador marca "empieza ahora");
 * si ya terminó, devuelve la de la semana siguiente.
 */
export function nextSessionAt(schedule: WeeklySchedule, now: number = Date.now()): Date {
  const grace = (schedule.graceMinutes ?? 0) * MINUTE
  const today = wallPartsOf(now, schedule.timeZone)
  const todayWeekday = new Date(Date.UTC(today.year, today.month - 1, today.day)).getUTCDay()
  const daysAhead = (schedule.weekday - todayWeekday + 7) % 7
  const startOf = (addDays: number) =>
    wallToInstant(
      today.year,
      today.month,
      today.day + addDays,
      schedule.hour,
      schedule.minute ?? 0,
      schedule.timeZone,
    )

  const soonest = startOf(daysAhead)
  return new Date(now < soonest + grace ? soonest : startOf(daysAhead + 7))
}

/** ISO del inicio de la próxima emisión (instante absoluto, en UTC). */
export function nextSessionISO(schedule: WeeklySchedule, now: number = Date.now()): string {
  return nextSessionAt(schedule, now).toISOString()
}

/** `true` mientras la emisión está en el aire (dentro de `graceMinutes`). */
export function isSessionLive(schedule: WeeklySchedule, now: number = Date.now()): boolean {
  return nextSessionAt(schedule, now).getTime() <= now
}

/** Etiqueta legible del día en la zona del evento: "Viernes 24 de julio". */
export function formatSessionDay(date: Date, timeZone: string): string {
  const raw = new Intl.DateTimeFormat('es-419', {
    timeZone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date)
  // es-419 devuelve "viernes, 24 de julio" → sin coma y con inicial mayúscula,
  // para que coincida con el formato histórico de las etiquetas de marca.
  const clean = raw.replace(',', '')
  return clean.charAt(0).toUpperCase() + clean.slice(1)
}
