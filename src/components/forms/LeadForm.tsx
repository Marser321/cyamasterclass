import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CTAButton } from '../primitives/CTAButton'
import { Check, ArrowRight } from '../primitives/icons'
import { ease } from '../../theme/tokens'
import { cn } from '../../lib/cn'

type Errors = Partial<Record<'nombre' | 'whatsapp' | 'email', string>>

/**
 * Formulario de captación (mock funcional): nombre + WhatsApp + email opcional.
 * Valida, muestra estado de éxito y persiste en localStorage `mc_leads`. Si
 * `redirectTo`, navega tras confirmar (p. ej. 01 → 02-gracias-reserva).
 */
export function LeadForm({
  ctaLabel,
  redirectTo,
  tone = 'light',
}: {
  ctaLabel: string
  redirectTo?: string
  tone?: 'light' | 'dark'
}) {
  const dark = tone === 'dark'
  const navigate = useNavigate()
  const [values, setValues] = useState({ nombre: '', whatsapp: '', email: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState(false)
  const refs = {
    nombre: useRef<HTMLInputElement>(null),
    whatsapp: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
  }

  function validate(): Errors {
    const e: Errors = {}
    if (values.nombre.trim().length < 2) e.nombre = 'Escribe tu nombre.'
    const digits = values.whatsapp.replace(/[^\d]/g, '')
    if (digits.length < 8) e.whatsapp = 'Escribe un WhatsApp válido (con código de país).'
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = 'Revisa el correo.'
    setErrors(e)
    return e
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const e = validate()
    const firstError = (['nombre', 'whatsapp', 'email'] as const).find((k) => e[k])
    if (firstError) {
      refs[firstError].current?.focus()
      return
    }
    try {
      const prev = JSON.parse(localStorage.getItem('mc_leads') || '[]')
      prev.push({ ...values, ts: new Date().toISOString() })
      localStorage.setItem('mc_leads', JSON.stringify(prev))
    } catch {
      /* almacenamiento no disponible: la demo sigue */
    }
    setDone(true)
    if (redirectTo) window.setTimeout(() => navigate(redirectTo), 1400)
  }

  // Oscuro-lujo: el formulario siempre vive sobre navy → campos oscuros, foco dorado.
  const fieldClass = cn(
    'mt-1 w-full rounded-xl border px-4 py-3 text-[15px] outline-none transition-colors',
    'border-white/15 bg-white/[0.06] text-ivory placeholder:text-ivory/40 focus:border-gold',
  )
  const labelClass = cn('text-[12px] font-semibold uppercase tracking-[0.1em]', dark ? 'text-ivory/70' : 'text-ivory/70')

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: ease.out }}
        className={cn(
          'rounded-2xl border p-6 text-center',
          'border-gold/30 bg-gold/[0.08]',
        )}
      >
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-2xl text-gold">
          <Check />
        </div>
        <h3 className={cn('mt-3 font-display text-xl font-semibold', 'text-ivory')}>
          ¡Tu lugar está reservado!
        </h3>
        <p className={cn('mt-1 text-[14px]', 'text-ivory/70')}>
          Te enviamos los detalles por WhatsApp y correo. {redirectTo && 'Te llevamos a los siguientes pasos…'}
        </p>
        {redirectTo && (
          <div className="mt-4">
            <CTAButton to={redirectTo} variant="primary" size="md" icon={<ArrowRight />}>
              Continuar
            </CTAButton>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label className={labelClass} htmlFor="lf-nombre">
          Nombre
        </label>
        <input
          id="lf-nombre"
          ref={refs.nombre}
          type="text"
          name="name"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? 'lf-nombre-err' : undefined}
          className={fieldClass}
          placeholder="Tu nombre"
          value={values.nombre}
          onChange={(e) => setValues((v) => ({ ...v, nombre: e.target.value }))}
        />
        {errors.nombre && (
          <p id="lf-nombre-err" role="alert" className="mt-1 text-[12px] text-red-400">
            {errors.nombre}
          </p>
        )}
      </div>
      <div>
        <label className={labelClass} htmlFor="lf-wa">
          WhatsApp
        </label>
        <input
          id="lf-wa"
          ref={refs.whatsapp}
          type="tel"
          name="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          aria-required="true"
          aria-invalid={!!errors.whatsapp}
          aria-describedby={errors.whatsapp ? 'lf-wa-err' : undefined}
          className={fieldClass}
          placeholder="+1 555 555 0123"
          value={values.whatsapp}
          onChange={(e) => setValues((v) => ({ ...v, whatsapp: e.target.value }))}
        />
        {errors.whatsapp && (
          <p id="lf-wa-err" role="alert" className="mt-1 text-[12px] text-red-400">
            {errors.whatsapp}
          </p>
        )}
      </div>
      <div>
        <label className={labelClass} htmlFor="lf-email">
          Correo <span className="font-normal normal-case opacity-70">(opcional)</span>
        </label>
        <input
          id="lf-email"
          ref={refs.email}
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'lf-email-err' : undefined}
          className={fieldClass}
          placeholder="tucorreo@ejemplo.com"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        />
        {errors.email && (
          <p id="lf-email-err" role="alert" className="mt-1 text-[12px] text-red-400">
            {errors.email}
          </p>
        )}
      </div>
      <CTAButton type="submit" variant="primary" size="lg" className="w-full">
        {ctaLabel}
      </CTAButton>
      <p className={cn('text-center text-[12px]', dark ? 'text-ivory/55' : 'text-ivory/55')}>
        Gratis · en vivo · en español · sin compromiso.
      </p>
    </form>
  )
}
