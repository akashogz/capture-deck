'use client'
import { MODES } from '@/constants/modes'

export function ModeSwitcher({ mode, onChange }) {
  return (
    <div className="px-2">
      <div className="flex bg-[#1c1c1c] rounded-xl p-1 gap-1">
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            title={m.label}
            className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg text-[10px] font-medium transition-colors ${
              mode === m.id ? 'bg-white text-black shadow-sm' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            {m.icon}
            {m.label}
          </button>
        ))}
      </div>
    </div>
  )
}
