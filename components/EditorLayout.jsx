'use client'
import { useEffect } from 'react'
import { useEditor } from '@/hooks/useEditor'
import { Header } from '@/components/header/Header'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { Workspace } from '@/components/workspace/Workspace'
import { Toast } from '@/components/ui/Toast'
import { useRouter } from 'next/navigation'

export function EditorLayout({ initialMode = 'website' }) {
  const editor = useEditor(initialMode)
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e) {
      const isMeta = e.metaKey || e.ctrlKey
      if (isMeta && e.key === 'e') { e.preventDefault(); editor.exportImage() }
      if (isMeta && e.key === 'z' && !e.shiftKey) { e.preventDefault(); editor.undo() }
      if (isMeta && e.key === 'z' && e.shiftKey) { e.preventDefault(); editor.redo() }
      if (e.key === '+' || e.key === '=') editor.zoomIn()
      if (e.key === '-') editor.zoomOut()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [editor])

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      <Header
        onExport={editor.exportImage}
        isExporting={editor.isExporting}
        hasImage={editor.hasContent}
      />
      <div className="flex flex-1 min-h-0">
        <Sidebar
          mode={editor.mode}
          onModeChange={editor.setMode}
          settings={editor.settings}
          viewport={editor.viewport}
          code={editor.code}
          quote={editor.quote}
          lyrics={editor.lyrics}
          onContentChange={partial => editor.updateContent(editor.mode, partial)}
          onSettingsChange={editor.updateSettings}
          onViewportChange={editor.updateViewport}
          onApplyPreset={editor.applyPreset}
          onExport={editor.exportImage}
          isExporting={editor.isExporting}
          hasContent={editor.hasContent}
          onReset={editor.resetSettings}
          captureStatus={editor.captureStatus}
          capturedUrl={editor.capturedUrl}
          onCapture={editor.capture}
        />
        <Workspace
          mode={editor.mode}
          imageBase64={editor.imageBase64}
          imageWidth={editor.imageWidth}
          settings={editor.settings}
          url={editor.capturedUrl}
          code={editor.code}
          quote={editor.quote}
          lyrics={editor.lyrics}
          captureStatus={editor.captureStatus}
          captureError={editor.captureError}
          zoom={editor.zoom}
          onZoomChange={editor.setZoom}
          onZoomIn={editor.zoomIn}
          onZoomOut={editor.zoomOut}
          onZoomFit={editor.zoomFit}
          onExampleClick={editor.capture}
          exportCanvasRef={editor.exportCanvasRef}
        />
      </div>
      {editor.exportError && <Toast message={`Export failed: ${editor.exportError}`} variant="error" />}
    </div>
  )
}
