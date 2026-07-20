'use client'
import { Section } from '@/components/ui/Section'
import { TextArea } from '@/components/ui/TextArea'
import { TextInput } from '@/components/ui/TextInput'
import { Chips } from '@/components/ui/Chips'
import { ColorSwatch } from '@/components/ui/ColorSwatch'
import { Slider } from '@/components/ui/Slider'
import { Toggle } from '@/components/ui/Toggle'
import { FONT_OPTIONS } from '@/constants/fonts'
import { Upload } from 'lucide-react'

const ALIGN = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
]

export function LyricsControl({ lyrics, onChange }) {
  function handleCoverUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      onChange({
        cover: reader.result,
      })
    }

    reader.readAsDataURL(file)
  }

  return (
    <Section title="Lyrics">
      <TextArea label="Lyrics" value={lyrics.text} onChange={v => onChange({ text: v })} rows={6} placeholder="Paste a verse or chorus..." />
      <TextInput label="Song title" value={lyrics.title} onChange={v => onChange({ title: v })} placeholder="Song title" />
      <TextInput label="Artist" value={lyrics.artist} onChange={v => onChange({ artist: v })} placeholder="Artist name" />

      <div className="space-y-1.5">
        <span className="text-xs text-zinc-400 font-medium">Font</span>
        <Chips options={FONT_OPTIONS} value={lyrics.font} onChange={v => onChange({ font: v })} />
      </div>

      <div className="space-y-1.5">
        <span className="text-xs text-zinc-400 font-medium">Alignment</span>
        <Chips options={ALIGN} value={lyrics.align} onChange={v => onChange({ align: v })} />
      </div>

      <Slider label="Text size" value={lyrics.fontSize} min={16} max={48} unit="px" onChange={v => onChange({ fontSize: v })} />
      <ColorSwatch label="Text color" value={lyrics.textColor} onChange={v => onChange({ textColor: v })} />
      <Toggle label="Music icon" value={lyrics.showMusicIcon} onChange={v => onChange({ showMusicIcon: v })} />
      <div className="flex justify-between items-center">
        <span className="text-xs text-zinc-400 font-medium">
          Upload Cover
        </span>

        <label
          htmlFor="cover-upload"
          className="p-2 bg-[#303030] rounded-lg hover:brightness-115 transition cursor-pointer"
        >
          <Upload size={14} />
        </label>

        <input
          id="cover-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverUpload}
        />
      </div>
    </Section>
  )
}
