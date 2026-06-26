import { RouterProvider } from 'react-router-dom'
import { router } from './router'

export default function App() {
  // v7_startTransition: opt-in temprano al envoltorio en React.startTransition
  // (silencia el future-flag warning de React Router en consola).
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />
}
