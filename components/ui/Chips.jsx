'use client'
export function Chips({ options, value, onChange, size = 'sm' }) {
  const py = size === 'sm' ? 'py-1 px-2.5' : 'py-1.5 px-3'
  return (
    <div className="flex bg-[#353535] rounded-full p-0.5 gap-0.5">
      {options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)}
          className={`flex-1 text-xs font-medium rounded-full transition-all duration-150 ${py} ${value === opt.value ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}>
          {opt.label}
        </button>
      ))}
    </div>
  )
}
