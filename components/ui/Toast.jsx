'use client'
export function Toast({ message, variant = 'success' }) {
  const colors = variant === 'error'
    ? 'bg-red-950/90 border-red-800 text-red-300'
    : 'bg-zinc-900/90 border-zinc-700 text-zinc-200'
  return (
    <div className={`fixed bottom-5 right-5 px-4 py-3 rounded-lg border text-xs font-medium z-50 shadow-xl backdrop-blur ${colors}`}>
      {message}
    </div>
  )
}
