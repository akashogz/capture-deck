'use client'
import { useRef, useState, useCallback } from 'react'
import { ExportCanvas } from '@/components/canvas/ExportCanvas'
import { EmptyState } from './EmptyState'
import { LoadingState } from './LoadingState'
import { ErrorState } from './ErrorState'
import { ZoomControls } from './ZoomControls'

export function Workspace({
  mode, imageBase64, imageWidth, settings, url, code, quote, lyrics, captureStatus, captureError,
  zoom, onZoomChange, onZoomIn, onZoomOut, onZoomFit,
  onExampleClick, exportCanvasRef,
}) {
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [spacePressed] = useState(false)
  const lastPos = useRef({ x: 0, y: 0 })

  const handleWheel = useCallback((e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      onZoomChange(zoom + (-e.deltaY * 0.001))
    } else {
      setPan(p => ({ x: p.x - e.deltaX, y: p.y - e.deltaY }))
    }
  }, [zoom, onZoomChange])

  const handleMouseDown = useCallback((e) => {
    if (e.button === 1 || spacePressed) {
      setIsPanning(true)
      lastPos.current = { x: e.clientX, y: e.clientY }
    }
  }, [spacePressed])

  const handleMouseMove = useCallback((e) => {
    if (!isPanning) return
    const dx = e.clientX - lastPos.current.x
    const dy = e.clientY - lastPos.current.y
    setPan(p => ({ x: p.x + dx, y: p.y + dy }))
    lastPos.current = { x: e.clientX, y: e.clientY }
  }, [isPanning])

  const handleMouseUp = useCallback(() => setIsPanning(false), [])

  // Text-based modes (code/quote/lyrics) are always "live" — there's no
  // capture step, so the canvas renders immediately with whatever the user
  // has typed (starting from sensible sample content).
  const isTextMode = mode !== 'website'
  const isIdle = !isTextMode && captureStatus === 'idle'
  const isLoading = !isTextMode && !['idle', 'done', 'error'].includes(captureStatus)
  const isError = !isTextMode && captureStatus === 'error'
  const isDone = isTextMode || (captureStatus === 'done' && imageBase64)

  return (
    <div className="relative flex-1 min-w-0 overflow-hidden" style={{ background: '#18181b' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, #2a2a2e 1px, transparent 1px)',
        backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
        backgroundPosition: `${pan.x}px ${pan.y}px`,
      }} />

      <div
        className="relative w-full h-full overflow-hidden"
        style={{ cursor: isPanning ? 'grabbing' : spacePressed ? 'grab' : 'default' }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {isIdle && <EmptyState onExampleClick={onExampleClick} />}
        {isLoading && <LoadingState status={captureStatus} />}
        {isError && <ErrorState message={captureError ?? 'Something went wrong'} />}

        {isDone && (
          <div className="absolute inset-0 flex items-center justify-center" style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isPanning ? 'none' : 'transform 0.15s ease-out',
          }}>
            <ExportCanvas
              ref={exportCanvasRef}
              mode={mode}
              imageBase64={imageBase64}
              imageWidth={imageWidth}
              settings={settings}
              url={url}
              code={code}
              quote={quote}
              lyrics={lyrics}
            />
          </div>
          
        )}
      </div>

      {isDone && (
        <ZoomControls zoom={zoom} onZoomIn={onZoomIn} onZoomOut={onZoomOut} onZoomFit={onZoomFit} onZoomChange={onZoomChange} />
      )}
    </div>
  )
}
