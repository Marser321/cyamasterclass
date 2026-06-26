import {
  Section,
  Container,
  Kicker,
  DisplayHeading,
  SectionHeader,
  GlassCard,
  CTAButton,
  Badge,
  Icon,
} from '../components/primitives'
import { Reveal, Stagger, RevealItem } from '../components/motion'
import { Hero, LandingLayout } from '../components/shell'
import { CalendarButton } from '../components/forms'
import { Img } from '../components/media'
import { FOUNDERS, MASTERCLASS } from '../content/brand'
import { img } from '../content/images'
import { sectionBg } from '../content/section-backgrounds'
import { toICSDate } from '../lib/ics'

// Fecha/hora — derivada de la fuente única (brand.ts) para que coincida con el
// contador de la página de reserva y con el .ics del botón de calendario.
const FECHA = `${MASTERCLASS.fechaLabel} · ${MASTERCLASS.horaLabel} · ${MASTERCLASS.zonaLabel}`

const PASOS = [
  {
    icon: <Icon.Whatsapp />,
    t: 'Revisa WhatsApp y tu correo',
    d: 'Ya te enviamos la confirmación con el enlace de acceso. Si no lo ves en unos minutos, revisa spam o escríbenos.',
  },
  {
    icon: <Icon.Calendar />,
    t: 'Añádela a tu calendario',
    d: 'Bloquea el horario para que nada se cruce. El recordatorio te llega también una hora antes de empezar.',
  },
  {
    icon: <Icon.Check />,
    t: 'Resérvate el horario',
    d: 'Guárdalo en tu calendario y conéctate en vivo el día de la masterclass. Las sesiones tienen capacidad real y limitada.',
  },
]

const CONEXION = [
  {
    icon: <Icon.Globe />,
    t: '100% online por Zoom',
    d: 'Desde el navegador o la app de Zoom — sin instalar nada complicado.',
  },
  {
    icon: <Icon.Document />,
    t: 'El enlace llega dos veces',
    d: 'Por WhatsApp y correo al reservar, y de nuevo una hora antes de la sesión.',
  },
  {
    icon: <Icon.Clock />,
    t: 'Conéctate 5 minutos antes',
    d: 'Entra con margen para acomodarte. Empezamos puntuales para respetar tu tiempo.',
  },
  {
    icon: <Icon.Whatsapp />,
    t: 'Si algo falla, escríbenos',
    d: '¿No te llega el enlace o tienes dudas técnicas? Escríbenos por WhatsApp y te ayudamos.',
  },
]

const PREPARACION = [
  'Papel y lápiz (o una nota en el teléfono) para anotar lo que quieras revisar después.',
  'El condado o estado que te interesa —Florida o Pennsylvania— para mirarlo con criterio.',
  'Mente abierta y tus preguntas: este es el momento de resolver dudas en vivo.',
]

export default function GraciasReserva() {
  return (
    <LandingLayout hideWhatsApp>
      {/* 1 · Confirmación (hero a fondo, centrado) */}
      <Hero
        tone="charcoal"
        image={{
          src: img('02', '02-gracias-reserva__hero-confirmacion-serena.png'),
          alt: 'Confirmación de tu lugar en la masterclass de Magic Capital',
          focal: '50% 35%',
          scrim: 'full',
        }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/20 text-3xl text-gold ring-1 ring-gold/40">
              <Icon.Check />
            </span>
          </Reveal>
          <Kicker className="mt-6">Magic Capital · Masterclass gratis</Kicker>
          <DisplayHeading as="h1" size="xl" className="mt-4">
            ¡Tu lugar está reservado!
          </DisplayHeading>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-ivory/80">
            Te enviamos los detalles por WhatsApp y correo. Guarda este horario: nos vemos en vivo, en
            español, para mostrarte el proceso paso a paso.
          </p>
          <div className="mt-6 flex justify-center">
            <Badge tone="ivory">
              <Icon.Calendar /> {FECHA}
            </Badge>
          </div>
          <div className="mt-7 flex justify-center">
            <CalendarMasterclassButton variant="light" />
          </div>
          <p className="mt-4 text-[13px] text-ivory/55">
            Revisa tu WhatsApp y correo para el enlace de acceso.
          </p>
        </div>
      </Hero>

      {/* 2 · Tres pasos rápidos */}
      <Section tone="ivory" pad="lg" texture={sectionBg('02-gracias-reserva', 1)}>
        <Container>
          <SectionHeader
            kicker="Listo, ahora solo falta esto"
            title="Tres pasos rápidos para no perderte nada"
          />
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
            {PASOS.map((p, i) => (
              <RevealItem key={p.t}>
                <GlassCard tone="solid" className="flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/10 font-display text-sm font-semibold text-gold">
                      {i + 1}
                    </span>
                    <span className="text-xl text-gold">{p.icon}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ivory">{p.t}</h3>
                  <p className="mt-2 text-[14.5px] leading-snug text-ivory/70">{p.d}</p>
                  {i === 1 && (
                    <div className="mt-4">
                      <CalendarMasterclassButton variant="secondary" />
                    </div>
                  )}
                </GlassCard>
              </RevealItem>
            ))}
          </Stagger>

          {/* Cómo conectarte — plegado aquí (tips esenciales, sin sección aparte ni imagen) */}
          <div className="mt-12">
            <h3 className="text-center font-display text-xl font-semibold text-ivory">El día de la masterclass</h3>
            <Stagger className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
              {CONEXION.map((c) => (
                <RevealItem key={c.t} subtle>
                  <div className="flex h-full items-start gap-3 rounded-xl bg-navy-soft/60 px-4 py-3.5 ring-1 ring-white/5">
                    <span className="mt-0.5 shrink-0 text-lg text-gold">{c.icon}</span>
                    <div>
                      <h4 className="font-display text-[15px] font-semibold text-ivory">{c.t}</h4>
                      <p className="mt-1 text-[13.5px] leading-snug text-ivory/70">{c.d}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* 3 · Cómo prepararte (editorial) */}
      <Section tone="charcoal" pad="lg" texture={sectionBg('02-gracias-reserva', 3)}>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal className="order-last lg:order-first">
              <Img
                src={img('02', '02-gracias-reserva__preparacion-que-traer.png')}
                alt="Mesa con papel, lápiz y notas para preparar la masterclass"
                className="aspect-square w-full rounded-2xl shadow-glass-dark"
                focal="50% 50%"
              />
            </Reveal>
            <div>
              <SectionHeader
                align="left"
                tone="dark"
                kicker="Cómo prepararte"
                title="Llega con lo justo para sacarle provecho"
              />
              <Stagger className="mt-6 space-y-3">
                {PREPARACION.map((b) => (
                  <RevealItem key={b} subtle>
                    <div className="flex gap-3">
                      <Icon.Check className="mt-1 shrink-0 text-gold" />
                      <p className="text-[15px] leading-snug text-ivory/80">{b}</p>
                    </div>
                  </RevealItem>
                ))}
              </Stagger>
              <Reveal className="mt-6">
                <p className="border-l-2 border-gold/50 pl-4 font-display text-lg italic text-ivory/85">
                  No te pediremos pujar por intuición. Primero, criterio.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4 · Mini credibilidad */}
      <Section tone="petrol" pad="md" texture={sectionBg('02-gracias-reserva', 5)}>
        <Container width="narrow" className="text-center">
          <Reveal>
            <Icon.Shield className="mx-auto text-3xl text-gold" />
            <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-ivory/80">
              Magic Capital es la firma educativa de {FOUNDERS.argenis.name} y {FOUNDERS.carmen.name}.
              Enseñamos tax deed en Florida y Pennsylvania con los portales públicos del condado — criterio
              antes que promesa.
            </p>
          </Reveal>
        </Container>
      </Section>

    </LandingLayout>
  )
}

/** Botón de calendario derivado de la fecha real de la masterclass (brand.ts).
 *  Duración ~60 min, así que el fin es una hora después del inicio. */
function CalendarMasterclassButton({ variant }: { variant: 'secondary' | 'light' }) {
  const start = toICSDate(MASTERCLASS.fechaISO)
  const end = toICSDate(new Date(new Date(MASTERCLASS.fechaISO).getTime() + 60 * 60 * 1000).toISOString())
  return (
    <CalendarButton
      variant={variant}
      title="Masterclass Magic Capital"
      description={`Cómo Adquirir Propiedades en Subasta Paso a Paso — masterclass gratis, en vivo y en español. El enlace de ${MASTERCLASS.plataforma} llega por WhatsApp y correo.`}
      start={start}
      end={end}
    />
  )
}
