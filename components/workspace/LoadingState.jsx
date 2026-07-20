'use client'
const STEPS = [
  { key: 'opening-browser',   label: 'Opening browser...' },
  { key: 'loading-page',      label: 'Loading website...' },
  { key: 'waiting-fonts',     label: 'Waiting for fonts...' },
  { key: 'taking-screenshot', label: 'Taking screenshot...' },
]

export function LoadingState({ status }) {
  const currentIdx = STEPS.findIndex(s => s.key === status)
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
      <div className="w-12 h-12 rounded-full border-[3px] border-violet-500/20 border-t-violet-500 animate-spin" />
      <div className="space-y-2.5 w-56">
        {STEPS.map((step, i) => {
          const isDone = i < currentIdx
          const isActive = i === currentIdx
          return (
            <div key={step.key} className="flex items-center gap-2.5">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                isDone ? 'bg-violet-500' : isActive ? 'bg-violet-500/20 border border-violet-500' : 'bg-zinc-800 border border-zinc-700'
              }`}>
                {isDone && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-xs transition-colors ${isActive ? 'text-zinc-200 font-medium' : isDone ? 'text-zinc-500' : 'text-zinc-600'}`}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
