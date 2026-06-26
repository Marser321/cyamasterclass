import { createBrowserRouter, Navigate, Link } from 'react-router-dom'
import ReservaMasterclass from './landings/ReservaMasterclass'
import GraciasReserva from './landings/GraciasReserva'

function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-ivory px-6 text-center">
      <div>
        <p className="font-display text-5xl font-semibold text-charcoal">404</p>
        <p className="mt-2 text-smoke">Esta página no existe.</p>
        <Link to="/reserva-masterclass" className="mt-5 inline-block rounded-full bg-petrol px-6 py-3 font-semibold text-ivory">
          Ir a la masterclass
        </Link>
      </div>
    </div>
  )
}

export const router = createBrowserRouter([
  // El dominio abre directo en el registro de la masterclass.
  { path: '/', element: <Navigate to="/reserva-masterclass" replace /> },
  { path: '/reserva-masterclass', element: <ReservaMasterclass /> },
  { path: '/gracias-reserva', element: <GraciasReserva /> },
  // Redirects legacy (rutas del monorepo original) por si quedó algún enlace.
  { path: '/l/01-reserva', element: <Navigate to="/reserva-masterclass" replace /> },
  { path: '/l/02-gracias-reserva', element: <Navigate to="/gracias-reserva" replace /> },
  { path: '*', element: <NotFound /> },
], {
  // Opt-in temprano a los future flags de v7 (silencia warnings en consola).
  future: { v7_relativeSplatPath: true },
})
