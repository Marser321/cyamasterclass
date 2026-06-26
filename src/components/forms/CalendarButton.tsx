import { CTAButton } from '../primitives/CTAButton'
import { Calendar } from '../primitives/icons'
import { downloadICS } from '../../lib/ics'

/** Botón que descarga un .ics. Para la demo usamos una fecha fija de ejemplo. */
export function CalendarButton({
  title,
  description,
  start,
  end,
  label = 'Añadir a calendario',
  variant = 'secondary',
}: {
  title: string
  description?: string
  start: string
  end: string
  label?: string
  variant?: 'primary' | 'secondary' | 'light'
}) {
  return (
    <CTAButton
      variant={variant}
      size="md"
      icon={<Calendar />}
      onClick={() => downloadICS({ title, description, start, end })}
    >
      {label}
    </CTAButton>
  )
}
