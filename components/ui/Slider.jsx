'use client'
export function Slider({ label, value, min, max, step = 1, unit = '', onChange }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-xs text-zinc-400 font-medium">{label}</span>
        <span className="text-xs font-mono text-zinc-300 tabular-nums">{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))} className="slider w-full" />
    </div>
  )
}
