export const FONT_OPTIONS = [
  { value: 'sans', label: 'Sans', family: 'var(--font-inter)' },
  { value: 'serif', label: 'Serif', family: 'var(--font-cormorant-garamond)' },
  { value: 'mono', label: 'Mono', family: 'var(--font-jetbrains)' },
  { value: 'hand', label: 'Handwritten', family: 'var(--font-indie-flower)' },
]

export function getFontFamily(value) {
  return FONT_OPTIONS.find(f => f.value === value)?.family ?? 'var(--font-inter)'
}
