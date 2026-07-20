'use client'
import { PRESETS } from '@/constants/presets'
import { Section } from '@/components/ui/Section'

export function PresetsControl({ onApply }) {
  return (
    <Section title="Presets" defaultOpen={false}>
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map(p => (
          <button key={p.id} onClick={() => onApply(p.id)}
            className="flex flex-col items-start gap-1 p-2.5 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/50 hover:border-zinc-600 transition-colors text-left">
            <span className="text-base">{p.icon}</span>
            <span className="text-xs font-medium text-zinc-200">{p.label}</span>
            <span className="text-[10px] text-zinc-500 leading-tight">{p.description}</span>
          </button>
        ))}
      </div>
    </Section>
  )
}
