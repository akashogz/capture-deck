'use client'
export function Section({ title, children, defaultOpen = true, icon }) {
  return (
    <div className="border-b border-white/10 last:border-0 pb-3">
      <details open={defaultOpen} className="group">
        <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer select-none list-none hover:bg-zinc-800/30 transition-colors">
          <span className="flex items-center gap-2 text-[11px] font-semibold text-zinc-300 uppercase tracking-wider">
            {icon}{title}
          </span>
          <svg className="w-3 h-3 text-zinc-600 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="px-5 pb-5 space-y-4">{children}</div>
      </details>
    </div>
  )
}
