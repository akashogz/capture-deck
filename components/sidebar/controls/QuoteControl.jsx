'use client'
import { Section } from '@/components/ui/Section'
import { TextArea } from '@/components/ui/TextArea'
import { TextInput } from '@/components/ui/TextInput'
import { Chips } from '@/components/ui/Chips'
import { ColorSwatch } from '@/components/ui/ColorSwatch'
import { Slider } from '@/components/ui/Slider'
import { Toggle } from '@/components/ui/Toggle'
import { FONT_OPTIONS } from '@/constants/fonts'

const ALIGN = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
]

export function QuoteControl({ quote, onChange }) {
  return (
    <Section title="Quote">
      <TextArea label="Quote" value={quote.text} onChange={v => onChange({ text: v })} rows={4} placeholder="Type or paste a quote..." />
      <TextInput label="Author" value={quote.author} onChange={v => onChange({ author: v })} placeholder="Author name" />
      <TextInput label="Role / source" value={quote.role} onChange={v => onChange({ role: v })} placeholder="e.g. Movie title, book, title" />

      <div className="space-y-1.5">
        <span className="text-xs text-zinc-400 font-medium">Font</span>
        <Chips options={FONT_OPTIONS} value={quote.font} onChange={v => onChange({ font: v })} />
      </div>

      <div className="space-y-1.5">
        <span className="text-xs text-zinc-400 font-medium">Alignment</span>
        <Chips options={ALIGN} value={quote.align} onChange={v => onChange({ align: v })} />
      </div>

      <Slider label="Text size" value={quote.fontSize} min={20} max={72} unit="px" onChange={v => onChange({ fontSize: v })} />
      <ColorSwatch label="Text color" value={quote.textColor} onChange={v => onChange({ textColor: v })} />
      <Toggle label="Quotation mark" value={quote.showQuoteMark} onChange={v => onChange({ showQuoteMark: v })} />
    </Section>
  )
}
