'use client'
export function Select({ label, value, onChange, options }) {
  return (
    <div className="space-y-1.5">
      {label && <span className="text-xs text-zinc-400 font-medium">{label}</span>}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-2.5 py-1.5 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-zinc-200 focus:outline-none focus:border-zinc-500 cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
