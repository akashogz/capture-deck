'use client'
import { VIEWPORT_PRESETS } from '@/constants/viewports'
import { Section } from '@/components/ui/Section'
import { Slider } from '@/components/ui/Slider'
import { Toggle } from '@/components/ui/Toggle'

export function ViewportControl({ viewport, onChange }) {
  return (
    <Section title="Capture" defaultOpen={false}>
      <div className="grid grid-cols-4 gap-1.5">
        {VIEWPORT_PRESETS.map(v => (
          <button key={v.preset} onClick={() => onChange({ preset: v.preset, width: v.width, height: v.height })} title={`${v.width}×${v.height}`}
            className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${viewport.preset === v.preset ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}>
            <span className="text-sm">{v.icon}</span>
            <span className="text-[9px] text-zinc-400">{v.label}</span>
          </button>
        ))}
      </div>
      <Slider label="Width" value={viewport.width} min={320} max={2560} step={20} unit="px"
        onChange={v => onChange({ width: v, preset: 'custom' })} />
      <Slider label="Height" value={viewport.height} min={320} max={2560} step={20} unit="px"
        onChange={v => onChange({ height: v, preset: 'custom' })} />
      <div className="space-y-3 pt-1">
        <Toggle label="Full page" description="Capture entire scrollable height" value={viewport.fullPage} onChange={v => onChange({ fullPage: v })} />
        <Toggle label="Dark mode" description="Emulate prefers-color-scheme: dark" value={viewport.darkMode} onChange={v => onChange({ darkMode: v })} />
        <Toggle label="Block ads" description="Block known ad & analytics scripts" value={viewport.blockAds} onChange={v => onChange({ blockAds: v })} />
        <Toggle label="Hide cookie banners" description="Attempt to hide consent popups" value={viewport.hideCookieBanner} onChange={v => onChange({ hideCookieBanner: v })} />
      </div>
      <Slider label="Extra delay" value={viewport.delay} min={0} max={5000} step={250} unit="ms" onChange={v => onChange({ delay: v })} />
    </Section>
  )
}
