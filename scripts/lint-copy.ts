/**
 * Lint de compliance (dev-only): busca frases prohibidas como COPY en las
 * páginas. Heurística: una coincidencia es SEGURA si la línea la niega o la
 * entrecomilla (p. ej. 'No decimos "garantizado"'); si aparece como afirmación
 * suelta, es VIOLACIÓN. Reporta ambas; sale con código 1 sólo si hay violaciones.
 *
 * Uso: npm run lint:copy
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { PROHIBITED_PHRASES } from '../src/content/compliance'

const DIRS = ['src/landings']
const NEGATION_CUES = ['no ', 'ni ', 'sin ', 'nunca', 'jamás', 'prohibid', 'evita']

type Hit = { file: string; line: number; phrase: string; text: string; safe: boolean }

function scanFile(path: string): Hit[] {
  const hits: Hit[] = []
  const lines = readFileSync(path, 'utf8').split('\n')
  lines.forEach((raw, i) => {
    const line = raw.toLowerCase()
    for (const phrase of PROHIBITED_PHRASES) {
      const p = phrase.toLowerCase()
      if (!line.includes(p)) continue
      const quoted = line.includes(`"${p}`) || line.includes(`'${p}`) || line.includes(`“${p}`)
      const negated = NEGATION_CUES.some((c) => line.includes(c))
      hits.push({ file: path, line: i + 1, phrase, text: raw.trim(), safe: quoted || negated })
    }
  })
  return hits
}

function collect(): Hit[] {
  const out: Hit[] = []
  for (const dir of DIRS) {
    let files: string[] = []
    try {
      files = readdirSync(dir).filter((f) => f.endsWith('.tsx') || f.endsWith('.ts'))
    } catch {
      continue
    }
    for (const f of files) out.push(...scanFile(join(dir, f)))
  }
  return out
}

const hits = collect()
const violations = hits.filter((h) => !h.safe)
const safe = hits.filter((h) => h.safe)

if (safe.length) {
  console.log(`ℹ ${safe.length} coincidencia(s) en contexto negado/entrecomillado (OK):`)
  for (const h of safe) console.log(`  · ${h.file}:${h.line} — "${h.phrase}"`)
}

if (violations.length) {
  console.error(`\n✗ ${violations.length} VIOLACIÓN(ES) de compliance (frase prohibida como copy):`)
  for (const v of violations) console.error(`  ✗ ${v.file}:${v.line} — "${v.phrase}"\n     ${v.text}`)
  process.exit(1)
}

console.log(`\n✓ Sin frases prohibidas como copy en ${DIRS.join(', ')}.`)
