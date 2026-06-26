/**
 * Convierte una fecha ISO (p. ej. '2026-07-14T20:00:00-04:00') al formato
 * ICS en UTC ('20260715T000000Z'). Permite derivar el evento de calendario
 * desde la fuente única de la fecha (brand.ts) en vez de hardcodearla.
 */
export function toICSDate(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

/**
 * Genera y descarga un archivo .ics (calendario) en el navegador. Para la demo
 * usamos fechas explícitas (sin depender del reloj). Sólo runtime de browser.
 */
export function downloadICS(opts: {
  title: string
  description?: string
  start: string // formato ICS UTC: 20260626T230000Z
  end: string
  filename?: string
}) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Magic Capital//Landings Demo//ES',
    'BEGIN:VEVENT',
    `UID:mc-${opts.start}@magiccapital.example`,
    `DTSTAMP:${opts.start}`,
    `DTSTART:${opts.start}`,
    `DTEND:${opts.end}`,
    `SUMMARY:${escapeICS(opts.title)}`,
    opts.description ? `DESCRIPTION:${escapeICS(opts.description)}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean)

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = opts.filename || 'masterclass-magic-capital.ics'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function escapeICS(s: string): string {
  return s.replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n')
}
