'use client'
import { Section } from '@/components/ui/Section'
import { Slider } from '@/components/ui/Slider'

export function LayoutControl({ settings, onChange, lyrics, onLyricsChange, quote, onQuoteChange }) {
  return (
    <Section title="Layout">
      <Slider label="Padding" value={settings.paddingValue} min={0} max={200} step={4} unit="px" onChange={v => onChange({ paddingPreset: 'custom', paddingValue: v })} />
      <Slider label="Corner radius" value={settings.borderRadius} min={0} max={32} unit="px" onChange={v => {onChange({ borderRadius: v }); onLyricsChange({ cardBorderRadius: v, }); onQuoteChange({ cardBorderRadius: v, })}} />
      <Slider label="Scale" value={Math.round(settings.imageScale * 100)} min={50} max={100} unit="%" onChange={v => onChange({ imageScale: v / 100 })} />
    </Section>
  )
}
