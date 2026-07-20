'use client'
export function ErrorState({ message }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-6">
      <div className="bg-red-950/40 border border-red-900/60 rounded-2xl px-7 py-6 max-w-sm text-center space-y-2.5">
        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
          <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <div className="text-red-300 font-semibold text-sm">Capture failed</div>
        <div className="text-red-400/70 text-xs leading-relaxed">{message}</div>
      </div>
    </div>
  )
}
