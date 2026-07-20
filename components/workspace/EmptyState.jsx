'use client'
import { EXAMPLE_URLS } from '@/constants/viewports'

export function EmptyState({ onExampleClick }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6">
      <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 flex items-center justify-center text-3xl">📷</div>
      <div className="text-center space-y-1.5">
        <h2 className="text-base font-semibold text-zinc-200">Capture your first website</h2>
        <p className="text-sm text-zinc-500">Paste a URL above to begin</p>
      </div>
      <div className="flex flex-col items-center gap-2.5 mt-2">
        <span className="text-[11px] font-medium text-zinc-600 uppercase tracking-wider">Popular examples</span>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-sm">
          {EXAMPLE_URLS.map(ex => (
            <button key={ex.url} onClick={() => onExampleClick(ex.url)}
              className="text-xs px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors border border-zinc-700/50">
              {ex.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
