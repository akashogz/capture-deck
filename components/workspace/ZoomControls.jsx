'use client'
export function ZoomControls({ zoom, onZoomIn, onZoomOut, onZoomFit }) {
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-zinc-900/95 backdrop-blur border border-zinc-800 rounded-xl px-1.5 py-1.5 shadow-2xl">
      <button onClick={onZoomOut} className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors text-base font-medium">−</button>
      <button onClick={onZoomFit} className="px-2.5 h-7 flex items-center justify-center text-xs font-mono text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors min-w-[52px] tabular-nums">
        {Math.round(zoom * 100)}%
      </button>
      <button onClick={onZoomIn} className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors text-base font-medium">+</button>
      <div className="w-px h-4 bg-zinc-700 mx-0.5" />
      <button onClick={onZoomFit} className="px-2.5 h-7 flex items-center justify-center text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">Fit</button>
    </div>
  )
}
