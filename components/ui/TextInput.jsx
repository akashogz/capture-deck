'use client'
export function TextInput({ label, value, onChange, placeholder }) {
  return (
    <div className="space-y-1.5">
      {label && <span className="text-xs text-zinc-400 font-medium">{label}</span>}
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-2.5 py-1.5 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
      />
    </div>
  )
}
