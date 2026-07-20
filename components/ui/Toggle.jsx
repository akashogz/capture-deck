'use client'
export function Toggle({ label, value, onChange, description }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <span className="text-xs text-zinc-400 font-medium">{label}</span>
        {description && <div className="text-xs text-zinc-500 mt-0.5">{description}</div>}
      </div>
      <button onClick={() => onChange(!value)} className={`relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${value ? 'bg-violet-600' : 'bg-zinc-700'}`}>
        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-0' : '-translate-x-4'}`} />
      </button>
    </div>
  )
}
