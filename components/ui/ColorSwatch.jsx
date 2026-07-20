'use client'
export function ColorSwatch({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between">
      {label && <span className="text-xs text-zinc-400 font-medium">{label}</span>}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-zinc-500 uppercase">{value}</span>
        <label className="relative cursor-pointer group">
          <div className="w-7 h-7 rounded-lg border border-zinc-600 group-hover:border-zinc-400 transition-colors shadow-inner cursor-pointer"
            style={{ background: value }} />
          <input type="color" value={value} onChange={e => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
        </label>
      </div>
    </div>
  )
}
