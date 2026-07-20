import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { UrgencyBar } from './UrgencyBar'
import { Footer } from './Footer'
import { SeguridadNote } from './SeguridadNote'
import { FloatingWhatsApp } from './FloatingWhatsApp'
import { LANDINGS } from '../../content/registry'

/** Envuelve cada landing: barra fija + contenido + aviso de seguridad + pie +
 *  WhatsApp flotante. `hideWhatsApp` oculta el botón flotante de WhatsApp
 *  (p. ej. en el funnel de masterclass, donde el único CTA debe llevar a
 *  registrarse).
 *
 *  ⚠ Los toasts de actividad (`LiveActivityToasts`) se quitaron al pasar el sitio
 *  a producción: mostraban nombres INVENTADOS de `content/social-proof.ts` como
 *  si fueran registros reales. Para reactivarlos hay que alimentarlos con datos
 *  reales del CRM — fabricar prueba social es una implicación FTC. */
export function LandingLayout({
  children,
  waMessage,
  hideWhatsApp = false,
}: {
  children: ReactNode
  waMessage?: string
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
      <SeguridadNote />
      <Footer />
      {!hideWhatsApp && <FloatingWhatsApp message={waMessage} />}
    </div>
  )
}
