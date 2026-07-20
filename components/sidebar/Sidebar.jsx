'use client'
import { PresetsControl } from './controls/PresetsControl'
import { BackgroundControl } from './controls/BackgroundControl'
import { FrameControl } from './controls/FrameControl'
import { LayoutControl } from './controls/LayoutControl'
import { ShadowControl } from './controls/ShadowControl'
import { ViewportControl } from './controls/ViewportControl'
import { ExportControl } from './controls/ExportControl'
import { ModeSwitcher } from './controls/ModeSwitcher'
import { CodeControl } from './controls/CodeControl'
import { QuoteControl } from './controls/QuoteControl'
import { LyricsControl } from './controls/LyricsControl'
import { useState } from 'react'
import { Camera } from 'lucide-react'

export function Sidebar({
  mode, onModeChange, captureStatus, onCapture, capturedUrl, settings, viewport,
  code, quote, lyrics, onContentChange,
  onSettingsChange, onViewportChange, onApplyPreset, onExport, isExporting, hasContent, onReset,
}) {
  const [url, setUrl] = useState(capturedUrl)
  const isLoading = !['idle', 'done', 'error'].includes(captureStatus)

  function handleSubmit(e) {
    e.preventDefault()
    if (url.trim()) onCapture(url.trim())
  }

  return (
    <aside className="w-[300px] pt-5 shrink-0 border-r border-zinc-800 overflow-y-auto flex gap-3 flex-col no-scrollbar" style={{ background: '#242424' }}>
      <ModeSwitcher mode={mode} onChange={onModeChange} />

      {mode === 'website' && (
        <form onSubmit={handleSubmit} className="flex items-center gap-1 px-2">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="Paste a URL — e.g. stripe.com"
              disabled={isLoading}
              className="w-full pl-8 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 disabled:opacity-50 transition-colors"
            />
          </div>
          <button type="submit" disabled={isLoading || !url.trim()}
            className={`p-2 aspect-square h-full flex items-center justify-center rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-150 ${isLoading || !url.trim() ? 'bg-[#353535] text-white/20 cursor-not-allowed' : 'bg-[#353535] text-white hover:bg-violet-500 active:scale-95'
              }`}>
              {isLoading ? (
                '…'
              ) : (
                <Camera size={14} />
              )}
          </button>
        </form>
      )}

      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 mt-2">
        <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Inspector</span>
        <button onClick={onReset} className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors font-medium">Reset</button>
      </div>

      <PresetsControl onApply={onApplyPreset} />

      {mode === 'code' && <CodeControl code={code} onChange={onContentChange} />}
      {mode === 'quote' && <QuoteControl quote={quote} onChange={onContentChange} />}
      {mode === 'lyrics' && <LyricsControl lyrics={lyrics} onChange={onContentChange} />}

      <BackgroundControl settings={settings} onChange={onSettingsChange} />
      {mode === 'website' && <FrameControl settings={settings} onChange={onSettingsChange} />}
      <LayoutControl settings={settings} lyrics={lyrics} onChange={onSettingsChange} onLyricsChange={onContentChange} quote={quote}  onQuoteChange={onContentChange}/>
      {(mode === 'website' || mode === 'code') && <ShadowControl settings={settings} onChange={onSettingsChange} />}
      {mode === 'website' && <ViewportControl viewport={viewport} onChange={onViewportChange} />}
      <ExportControl settings={settings} onChange={onSettingsChange} onExport={onExport} isExporting={isExporting} hasImage={hasContent} />
    </aside>
  )
}
