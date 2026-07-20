/**
 * lib/styles.js
 *
 * Single source of truth for all visual style computations, consumed by the
 * live CSS preview (components/canvas/ExportCanvas.jsx). Export rasterizes
 * that same preview DOM via html-to-image (see lib/exportImage.js), so
 * preview and export are pixel-identical by construction — there's no
 * parallel implementation left to keep in sync.
 */

// ─── Padding ──────────────────────────────────────────────────────────────────

const PADDING_MAP = {
  tight:       16,
  comfortable: 60,
  spacious:    100,
  custom:      null,
}

export function getPaddingValue(settings) {
  if (settings.paddingPreset === 'custom') return settings.paddingValue
  return PADDING_MAP[settings.paddingPreset] ?? settings.paddingValue
}

// ─── Shadow ───────────────────────────────────────────────────────────────────

const SHADOW_DEFS = {
  none:     { blur: 0,   offsetY: 0,  spread: 0,  opacity: 0 },
  soft:     { blur: 16,  offsetY: 6,  spread: 0,  opacity: 0.12 },
  medium:   { blur: 32,  offsetY: 12, spread: 0,  opacity: 0.20 },
  large:    { blur: 60,  offsetY: 24, spread: 0,  opacity: 0.28 },
  floating: { blur: 100, offsetY: 40, spread: 8,  opacity: 0.35 },
}

export function getShadowDef(size) {
  return SHADOW_DEFS[size]
}

export function getShadowCSS(settings) {
  if (settings.shadowSize === 'none') return 'none'
  const def = SHADOW_DEFS[settings.shadowSize]
  const { r, g, b } = hexToRgb(settings.shadowColor)
  return `0 ${def.offsetY}px ${def.blur}px ${def.spread}px rgba(${r},${g},${b},${def.opacity})`
}

// ─── Background ───────────────────────────────────────────────────────────────

export function getBackgroundCSS(settings) {
  switch (settings.backgroundType) {
    case 'solid':
      return settings.backgroundColor
    case 'transparent':
      return 'transparent'
    case 'gradient':
      return `linear-gradient(${settings.gradientAngle}deg, ${settings.gradientFrom}, ${settings.gradientTo})`
    case 'mesh':
      return getMeshGradient(settings.gradientFrom, settings.gradientTo)
    case 'noise':
      return settings.gradientFrom
    default:
      return settings.backgroundColor
  }
}

function getMeshGradient(c1, c2) {
  return `
    radial-gradient(at 40% 20%, ${c1}cc 0px, transparent 50%),
    radial-gradient(at 80% 0%, ${c2}88 0px, transparent 50%),
    radial-gradient(at 0% 50%, ${c1}99 0px, transparent 50%),
    radial-gradient(at 80% 50%, ${c2}66 0px, transparent 50%),
    radial-gradient(at 0% 100%, ${c1}88 0px, transparent 50%),
    radial-gradient(at 80% 100%, ${c2}aa 0px, transparent 50%)
  `.trim()
}

// ─── Utils ────────────────────────────────────────────────────────────────────

export function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean.padEnd(6, '0')
  return {
    r: parseInt(full.slice(0, 2), 16) || 0,
    g: parseInt(full.slice(2, 4), 16) || 0,
    b: parseInt(full.slice(4, 6), 16) || 0,
  }
}

function slugify(str, fallback) {
  const slug = (str ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug || fallback
}

/**
 * Builds a suggested export filename. `context` is either a legacy string
 * (a captured URL, for backwards compatibility) or an object shaped like
 * `{ mode, url, code, quote, lyrics }` as produced by useEditor.
 */
export function generateFilename(settings, context) {
  if (settings.customFilename) return `${settings.customFilename}.${settings.exportFormat}`

  const date = new Date().toISOString().slice(0, 10)
  const ctx = typeof context === 'string' ? { mode: 'website', url: context } : (context ?? {})

  switch (ctx.mode) {
    case 'code': {
      const base = ctx.code?.fileName ? slugify(ctx.code.fileName.replace(/\.[^.]+$/, ''), 'snippet') : 'snippet'
      return `code-${base}-${date}.${settings.exportFormat}`
    }
    case 'quote': {
      const base = slugify(ctx.quote?.author, 'quote')
      return `quote-${base}-${date}.${settings.exportFormat}`
    }
    case 'lyrics': {
      const base = slugify(ctx.lyrics?.title, 'lyrics')
      return `lyrics-${base}-${date}.${settings.exportFormat}`
    }
    default: {
      try {
        const hostname = new URL(ctx.url).hostname.replace('www.', '')
        return `screenshot-${hostname}-${date}.${settings.exportFormat}`
      } catch {
        return `screenshot-${date}.${settings.exportFormat}`
      }
    }
  }
}
