'use client'
import { Section } from '@/components/ui/Section'
import { Chips } from '@/components/ui/Chips'
import { Toggle } from '@/components/ui/Toggle'
import { RESOLUTIONS } from '@/constants/resolutions'

const FORMATS = [{ value: 'png', label: 'PNG' }, { value: 'webp', label: 'WebP' }, { value: 'jpeg', label: 'JPEG' }]
const QUALITIES = [{ value: 'standard', label: 'Standard' }, { value: 'high', label: 'High' }, { value: 'maximum', label: 'Maximum' }]

// TODO: wire to real subscription/billing state once auth exists.
const isPremium = true

export function ExportControl({ settings, onChange, onExport, isExporting, hasImage }) {
  const resolutionOptions = RESOLUTIONS.map(r => ({
    value: r.value,
    label: r.premium && !isPremium ? `${r.label} 🔒` : r.label,
  }))

  return (
    <Section title="Export">
      <div className="space-y-1.5">
        <span className="text-xs text-zinc-400 font-medium">Format</span>
        <Chips options={FORMATS} value={settings.exportFormat} onChange={v => onChange({ exportFormat: v })} />
      </div>
      <div className="space-y-1.5">
        <span className="text-xs text-zinc-400 font-medium">
          Compression{settings.exportFormat === 'png' && <span className="text-zinc-600"> (PNG is lossless)</span>}
        </span>
        <Chips options={QUALITIES} value={settings.exportQuality} onChange={v => onChange({ exportQuality: v })}
          disabled={settings.exportFormat === 'png'} />
      </div>
      <div className="space-y-1.5">
        <span className="text-xs text-zinc-400 font-medium">Resolution</span>
        <Chips options={resolutionOptions} value={settings.exportResolution} onChange={v => {
          const target = RESOLUTIONS.find(r => r.value === v)
          if (target?.premium && !isPremium) return
          onChange({ exportResolution: v })
        }} />
      </div>
      {settings.backgroundType !== 'transparent' && (
        <Toggle label="Transparent background" value={settings.transparentBackground}
          onChange={v => onChange({ transparentBackground: v, backgroundType: v ? 'transparent' : 'gradient' })} />
      )}
      <div className="space-y-1.5">
        <span className="text-xs text-zinc-400 font-medium">Filename</span>
        <input value={settings.customFilename} onChange={e => onChange({ customFilename: e.target.value })}
          placeholder="screenshot-example-2026-06-29"
          className="w-full px-2.5 py-1.5 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500" />
      </div>
      <button onClick={onExport} disabled={!hasImage || isExporting}
        className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
          hasImage && !isExporting ? 'bg-white text-zinc-900 hover:bg-zinc-100 active:scale-[0.98]' : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
        }`}>
        {isExporting ? 'Exporting…' : `Export ${settings.exportFormat.toUpperCase()}`}
      </button>
    </Section>
  )
}
