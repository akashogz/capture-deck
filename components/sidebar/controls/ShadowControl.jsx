'use client'
import { Section } from '@/components/ui/Section'
import { ColorSwatch } from '@/components/ui/ColorSwatch'

const SHADOWS = [
  { value: 'none',     label: 'None',     preview: 'none' },
  { value: 'soft',     label: 'Soft',     preview: '0 4px 10px rgba(0,0,0,0.18)' },
  { value: 'medium',   label: 'Medium',   preview: '0 10px 20px rgba(0,0,0,0.25)' },
  { value: 'large',    label: 'Large',    preview: '0 18px 36px rgba(0,0,0,0.32)' },
  { value: 'floating', label: 'Floating', preview: '0 30px 60px rgba(0,0,0,0.4)' },
]

export function ShadowControl({ settings, onChange }) {
  return (
    <Section title="Shadow">
      <div className="grid grid-cols-5 gap-1.5">
        {SHADOWS.map(s => (
          <button key={s.value} onClick={() => onChange({ shadowSize: s.value })} title={s.label}
            className={`flex flex-col items-center gap-1.5 py-2 rounded-lg transition-colors ${settings.shadowSize === s.value ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}>
            <div className="w-5 h-5 rounded bg-zinc-300" style={{ boxShadow: s.preview }} />
            <span className="text-[9px] text-zinc-400 leading-none">{s.label}</span>
          </button>
        ))}
      </div>
      {settings.shadowSize !== 'none' && (
        <ColorSwatch label="Color" value={settings.shadowColor} onChange={v => onChange({ shadowColor: v })} />
      )}
    </Section>
  )
}
