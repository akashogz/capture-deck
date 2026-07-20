'use client'
import { Section } from '@/components/ui/Section'
import { TextArea } from '@/components/ui/TextArea'
import { TextInput } from '@/components/ui/TextInput'
import { Select } from '@/components/ui/Select'
import { Slider } from '@/components/ui/Slider'
import { Toggle } from '@/components/ui/Toggle'
import { LANGUAGES } from '@/constants/languages'
import { CODE_THEMES } from '@/constants/codeThemes'

export function CodeControl({ code, onChange }) {
  return (
    <Section title="Code">
      <TextArea label="Snippet" value={code.code} onChange={v => onChange({ code: v })} rows={8} mono placeholder="Paste your code..." />
      <TextInput label="Filename" value={code.fileName} onChange={v => onChange({ fileName: v })} placeholder="index.js" />
      <Select
        label="Language"
        value={code.language}
        onChange={v => onChange({ language: v })}
        options={LANGUAGES.map(l => ({ value: l.value, label: l.label }))}
      />

      <div className="space-y-1.5">
        <span className="text-xs text-zinc-400 font-medium">Theme</span>
        <div className="grid grid-cols-3 gap-1.5">
          {CODE_THEMES.map(t => (
            <button
              key={t.id}
              title={t.label}
              onClick={() => onChange({ theme: t.id })}
              className={`flex flex-col items-center gap-1.5 py-2 rounded-lg border transition-colors ${
                code.theme === t.id ? 'bg-zinc-700 border-zinc-600' : 'bg-zinc-800/50 border-transparent hover:bg-zinc-800'
              }`}
            >
              <div className="w-full h-4 rounded flex overflow-hidden">
                <span className="flex-1" style={{ background: t.background }} />
                <span className="w-1.5" style={{ background: t.keyword }} />
                <span className="w-1.5" style={{ background: t.string }} />
              </div>
              <span className="text-[9px] text-zinc-400 leading-none">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Slider label="Font size" value={code.fontSize} min={11} max={24} unit="px" onChange={v => onChange({ fontSize: v })} />

      <div className="space-y-3 pt-1">
        <Toggle label="Window chrome" description="macOS-style title bar" value={code.showWindowChrome} onChange={v => onChange({ showWindowChrome: v })} />
        <Toggle label="Line numbers" value={code.showLineNumbers} onChange={v => onChange({ showLineNumbers: v })} />
      </div>
    </Section>
  )
}
