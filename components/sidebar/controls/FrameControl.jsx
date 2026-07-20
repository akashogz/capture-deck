'use client'
import { Section } from '@/components/ui/Section'
import { Ban, Moon, PanelTop, Square } from 'lucide-react'

const FRAMES = [
  { value: 'none',          label: 'None',    icon: "/none-preview.png" },
  { value: 'minimal',       label: 'Ring', icon: "/ring-preview.png" },
  { value: 'macos-light', label: 'macOS Light',   icon: "/macOS-light-preview.png" },
  { value: 'macos-dark',  label: 'macOS Dark',    icon: "/macOS-dark-preview.png" },
  { value: 'windows-light', label: 'Windows Light', icon: "/windows-light-preview.png"},
  { value: 'windows-dark', label: 'Windows Dark', icon: "/windows-dark-preview.png" },
  { value: "arc-light", label: "Arc Light", icon: "/arc-windows-preview2.png" },
  { value: "arc-dark", label: "Arc Dark", icon: "/arc-dark-preview.png" },
  { value: "mobile", label: "Mobile", icon: "/arc-dark-preview.png" }
]

export function FrameControl({ settings, onChange }) {
  return (
    <Section title="Frame">
      <div className="grid grid-cols-2 gap-1.5">
        {FRAMES.map(f => (
          <button key={f.value} onClick={() => onChange({ frameType: f.value })}
            className={`flex flex-col items-center gap-1 py-2.5 rounded-lg border transition-colors justify-between ${
              settings.frameType === f.value ? 'bg-zinc-700 border-zinc-600' : 'bg-zinc-800/50 border-transparent hover:bg-zinc-800'
            }`}>
              <img src={f.icon} className='w-20 p-2 object-cover shadow-2xl'/>
            <span className="text-[10px] text-zinc-400">{f.label}</span>
          </button>
        ))}
      </div>
    </Section>
  )
}
