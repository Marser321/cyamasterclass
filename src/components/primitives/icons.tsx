import type { SVGProps } from 'react'

// Set de íconos línea (stroke = currentColor). Mínimos y sobrios (regla de marca).
type P = SVGProps<SVGSVGElement>

function Svg({ children, ...p }: P & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...p}
    >
      {children}
    </svg>
  )
}

export const Check = (p: P) => (
  <Svg {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
)
export const ArrowRight = (p: P) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
)
export const ArrowUpRight = (p: P) => (
  <Svg {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
)
export const Whatsapp = (p: P) => (
  <Svg {...p} strokeWidth={1.6}>
    <path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21Z" />
    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1l-.2-1.2-2 .6-1.8-1.8.6-2-1.2-.2c-.5 0-1 .4-1 1Z" />
  </Svg>
)
export const Calendar = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="4.5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 2.5v4M16 2.5v4" />
  </Svg>
)
export const Shield = (p: P) => (
  <Svg {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 9.5C8 19 5 15.5 5 11V6l7-3Z" />
  </Svg>
)
export const Filter = (p: P) => (
  <Svg {...p}>
    <path d="M3 5h18l-7 8v5l-4 2v-7L3 5Z" />
  </Svg>
)
export const Percent = (p: P) => (
  <Svg {...p}>
    <path d="M19 5 5 19" />
    <circle cx="7.5" cy="7.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </Svg>
)
export const Landmark = (p: P) => (
  <Svg {...p}>
    <path d="M3 21h18M5 21v-8M10 21v-8M14 21v-8M19 21v-8M3 10l9-6 9 6Z" />
  </Svg>
)
export const Document = (p: P) => (
  <Svg {...p}>
    <path d="M6 3h8l4 4v14H6V3Z" />
    <path d="M14 3v4h4M9 12h6M9 16h6" />
  </Svg>
)
export const Globe = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
  </Svg>
)
export const Lock = (p: P) => (
  <Svg {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </Svg>
)
export const Star = (p: P) => (
  <Svg {...p}>
    <path d="M12 4l2.4 5 5.6.7-4 3.8 1 5.5L12 16.8 6 19l1-5.5-4-3.8 5.6-.7L12 4Z" />
  </Svg>
)
export const Quote = (p: P) => (
  <Svg {...p}>
    <path d="M9 7H5v6h4l-1 4M19 7h-4v6h4l-1 4" />
  </Svg>
)
export const Play = (p: P) => (
  <Svg {...p}>
    <path d="M8 5v14l11-7L8 5Z" />
  </Svg>
)
export const ChevronDown = (p: P) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
)
export const X = (p: P) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
)
export const Menu = (p: P) => (
  <Svg {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </Svg>
)
export const Clock = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
)
export const MapPin = (p: P) => (
  <Svg {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
)
export const Users = (p: P) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5M16 6a3 3 0 0 1 0 6M21 20c0-2.3-1.3-4-3.5-4.7" />
  </Svg>
)
export const Sparkles = (p: P) => (
  <Svg {...p}>
    <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4ZM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
  </Svg>
)
export const AlertTriangle = (p: P) => (
  <Svg {...p}>
    <path d="M12 3 2 20h20L12 3Z" />
    <path d="M12 9v5M12 17.5v.5" />
  </Svg>
)
export const CreditCard = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18M7 15h4" />
  </Svg>
)
export const Compass = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15 9-2 5-4 1 2-5 4-1Z" />
  </Svg>
)
