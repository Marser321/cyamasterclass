import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { UrgencyBar } from './UrgencyBar'
import { Footer } from './Footer'
import { FloatingWhatsApp } from './FloatingWhatsApp'
import { LiveActivityToasts } from './LiveActivityToasts'
import { LANDINGS } from '../../content/registry'

/** Envuelve cada landing: barra fija + contenido + pie + WhatsApp flotante +
 *  toasts de actividad (prueba social simulada de la demo). `activity=false`
 *  los desactiva en páginas donde no aportan (p. ej. páginas de gracias).
 *  `hideWhatsApp` oculta el botón flotante de WhatsApp (p. ej. en el funnel de
 *  masterclass, donde el único CTA debe llevar a registrarse). */
export function LandingLayout({
  children,
  waMessage,
  activity = true,
  hideWhatsApp = false,
}: {
  children: ReactNode
  waMessage?: string
  activity?: boolean
  hideWhatsApp?: boolean
}) {
  const { pathname } = useLocation()

  // Al cambiar de landing, vuelve arriba.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  // Título de pestaña por página (para compartir cada URL como página independiente).
  useEffect(() => {
    const meta = LANDINGS.find((l) => l.route === pathname)
    if (meta?.docTitle) document.title = meta.docTitle
  }, [pathname])

  return (
    <div className="min-h-screen bg-midnight">
      <UrgencyBar />
      <main>{children}</main>
      <Footer />
      {!hideWhatsApp && <FloatingWhatsApp message={waMessage} />}
      <LiveActivityToasts enabled={activity} />
    </div>
  )
}
