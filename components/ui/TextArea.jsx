'use client'
export function TextArea({ label, value, onChange, placeholder, rows = 5, mono = false }) {
  return (
    <div className="space-y-1.5">
      {label && <span className="text-xs text-zinc-400 font-medium">{label}</span>}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-2.5 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 resize-none leading-relaxed ${mono ? 'font-mono' : ''}`}
      />
    </div>
  )
}
