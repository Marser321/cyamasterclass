# Copia las imágenes curadas al public/img del proyecto de landings.
# Fuente: landings-listas/<NN>/imagenes, _fondos, lead-magnets + fotos reales de fundadores.
# Idempotente: sobrescribe. No genera imágenes, sólo copia.

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot          # ...\magic-capital-landings
$src  = Split-Path -Parent $root                  # ...\Magic Capital
$pub  = Join-Path $root 'public\img'

function Ensure-Dir($p) { if (-not (Test-Path $p)) { New-Item -ItemType Directory -Force -Path $p | Out-Null } }
function Copy-Set($from, $to, $filter) {
  if (-not (Test-Path $from)) { Write-Host "  (omitido, no existe) $from"; return 0 }
  Ensure-Dir $to
  $files = Get-ChildItem -Path $from -Filter $filter -File -ErrorAction SilentlyContinue
  foreach ($f in $files) { Copy-Item $f.FullName -Destination (Join-Path $to $f.Name) -Force }
  Write-Host ("  {0,3} archivos -> {1}" -f $files.Count, (Split-Path $to -Leaf))
  return $files.Count
}

$total = 0

# 1) Imágenes curadas por landing: landings-listas/<NN>-*/imagenes -> public/img/<NN>
$kits = Get-ChildItem -Path (Join-Path $src 'landings-listas') -Directory | Where-Object { $_.Name -match '^\d\d-' }
foreach ($kit in $kits) {
  $nn = $kit.Name.Substring(0,2)
  Write-Host "Landing $nn ($($kit.Name)):"
  $total += Copy-Set (Join-Path $kit.FullName 'imagenes') (Join-Path $pub $nn) '*.png'
}

# 2) Fondos animables
Write-Host "Fondos:"
$total += Copy-Set (Join-Path $src 'landings-listas\_fondos') (Join-Path $pub 'backgrounds') '*.png'

# 3) Lead magnets
Write-Host "Lead magnets:"
$total += Copy-Set (Join-Path $src 'landings-listas\lead-magnets\imagenes') (Join-Path $pub 'lead-magnets') '*.png'

# 4) Fotos reales de fundadores (estudio)
Write-Host "Fundadores (estudio):"
$total += Copy-Set (Join-Path $src 'imagenes-landings\fundadores-estudio') (Join-Path $pub 'founders') '*.jpg'

Write-Host ""
Write-Host ("TOTAL copiado: {0} archivos." -f $total)
