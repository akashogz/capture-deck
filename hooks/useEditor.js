/**
 * useEditor — single source of truth for all editor state
 */
'use client'

import { useState, useCallback, useRef } from 'react'
import { DEFAULT_SETTINGS, DEFAULT_VIEWPORT, DEFAULT_CODE, DEFAULT_QUOTE, DEFAULT_LYRICS } from '@/constants/defaults'
import { PRESETS } from '@/constants/presets'
import { exportNodeToFile } from '@/lib/exportImage'

const MAX_HISTORY = 50

export function useEditor(initialMode = 'website') {
  const [state, setState] = useState({
    mode: initialMode,

    // Website capture
    imageBase64: null,
    imageWidth: 0,
    imageHeight: 0,
    capturedUrl: '',
    captureStatus: 'idle',
    captureError: null,
    viewport: DEFAULT_VIEWPORT,

    // Text-based content modes — each keeps its own state so switching
    // modes never loses what was typed into another one.
    code: DEFAULT_CODE,
    quote: DEFAULT_QUOTE,
    lyrics: DEFAULT_LYRICS,

    settings: DEFAULT_SETTINGS,
    isExporting: false,
    exportError: null,
    zoom: 0.7,
  })

  // History stacks — track both style settings and the active mode's content
  // so undo/redo feels consistent no matter what's being edited.
  const undoStack = useRef([])
  const redoStack = useRef([])

  // Ref to the live <ExportCanvas> DOM node — html-to-image rasterizes
  // this directly, so preview and export are always pixel-identical.
  const exportCanvasRef = useRef(null)

  // ── Mode ─────────────────────────────────────────────────────────────────────

  const setMode = useCallback((mode) => {
    setState(prev => (prev.mode === mode ? prev : { ...prev, mode }))
  }, [])

  // ── Settings ────────────────────────────────────────────────────────────────

  const updateSettings = useCallback((partial) => {
    setState(prev => {
      undoStack.current.push({ settings: prev.settings, timestamp: Date.now() })
      if (undoStack.current.length > MAX_HISTORY) undoStack.current.shift()
      redoStack.current = []
      return { ...prev, settings: { ...prev.settings, ...partial } }
    })
  }, [])

  const updateViewport = useCallback((partial) => {
    setState(prev => ({ ...prev, viewport: { ...prev.viewport, ...partial } }))
  }, [])

  // Generic updater for the current mode's text content (code / quote / lyrics).
  const updateContent = useCallback((mode, partial) => {
    setState(prev => ({ ...prev, [mode]: { ...prev[mode], ...partial } }))
  }, [])

  const applyPreset = useCallback((presetId) => {
    const preset = PRESETS.find(p => p.id === presetId)
    if (!preset) return
    setState(prev => {
      undoStack.current.push({ settings: prev.settings, timestamp: Date.now() })
      redoStack.current = []
      return {
        ...prev,
        settings: { ...prev.settings, ...preset.settings },
        viewport: { ...prev.viewport, width: preset.viewportWidth },
      }
    })
  }, [])

  const resetSettings = useCallback(() => {
    setState(prev => {
      undoStack.current.push({ settings: prev.settings, timestamp: Date.now() })
      redoStack.current = []
      return { ...prev, settings: DEFAULT_SETTINGS }
    })
  }, [])

  // ── History ──────────────────────────────────────────────────────────────────

  const undo = useCallback(() => {
    const entry = undoStack.current.pop()
    if (!entry) return
    setState(prev => {
      redoStack.current.push({ settings: prev.settings, timestamp: Date.now() })
      return { ...prev, settings: entry.settings }
    })
  }, [])

  const redo = useCallback(() => {
    const entry = redoStack.current.pop()
    if (!entry) return
    setState(prev => {
      undoStack.current.push({ settings: prev.settings, timestamp: Date.now() })
      return { ...prev, settings: entry.settings }
    })
  }, [])

  // ── Capture (website mode) ──────────────────────────────────────────────────

  const capture = useCallback(async (url) => {
    setState(prev => ({
      ...prev,
      captureStatus: 'opening-browser',
      captureError: null,
      imageBase64: null,
      capturedUrl: url,
    }))

    // Simulate step progression for UX feel
    const steps = ['loading-page', 'waiting-fonts', 'taking-screenshot']
    let stepIdx = 0
    const stepTimer = setInterval(() => {
      if (stepIdx < steps.length) {
        const status = steps[stepIdx++]
        setState(prev => ({ ...prev, captureStatus: status }))
      }
    }, 1200)

    try {
      const res = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          viewportWidth: state.viewport.width,
          fullPage: state.viewport.fullPage,
          darkMode: state.viewport.darkMode,
          delay: state.viewport.delay,
          blockAds: state.viewport.blockAds,
          hideCookieBanner: state.viewport.hideCookieBanner,
        }),
      })

      const data = await res.json()
      clearInterval(stepTimer)

      if (!data.success) {
        setState(prev => ({ ...prev, captureStatus: 'error', captureError: data.error }))
        return
      }

      setState(prev => ({
        ...prev,
        imageBase64: data.image,
        imageWidth: data.width,
        imageHeight: data.height,
        captureStatus: 'done',
        captureError: null,
      }))
    } catch (err) {
      clearInterval(stepTimer)
      setState(prev => ({
        ...prev,
        captureStatus: 'error',
        captureError: 'Network error — is the dev server running?',
      }))
    }
  }, [state.viewport])

  // ── Export ───────────────────────────────────────────────────────────────────

  const hasContent =
    state.mode === 'website'
      ? !!state.imageBase64
      : !!(state[state.mode]?.text ?? state[state.mode]?.code)?.trim()

  const exportImage = useCallback(async () => {
    if (!hasContent) return
    setState(prev => ({ ...prev, isExporting: true, exportError: null }))

    try {
      await exportNodeToFile(exportCanvasRef.current, state.settings, {
        mode: state.mode,
        url: state.capturedUrl,
        code: state.code,
        quote: state.quote,
        lyrics: state.lyrics,
      })
      setState(prev => ({ ...prev, isExporting: false }))
    } catch (err) {
      setState(prev => ({
        ...prev,
        isExporting: false,
        exportError: err instanceof Error ? err.message : 'Export failed',
      }))
    }
  }, [hasContent, state.settings, state.mode, state.capturedUrl, state.code, state.quote, state.lyrics])

  // ── Zoom ─────────────────────────────────────────────────────────────────────

  const setZoom = useCallback((z) => {
    setState(prev => ({ ...prev, zoom: Math.max(0.1, Math.min(2, z)) }))
  }, [])

  const zoomIn  = useCallback(() => setState(prev => ({ ...prev, zoom: Math.min(2,   Math.round((prev.zoom + 0.1) * 10) / 10) })), [])
  const zoomOut = useCallback(() => setState(prev => ({ ...prev, zoom: Math.max(0.1, Math.round((prev.zoom - 0.1) * 10) / 10) })), [])
  const zoomFit = useCallback(() => setState(prev => ({ ...prev, zoom: 0.7 })), [])

  return {
    ...state,
    hasContent,
    exportCanvasRef,
    setMode,
    capture,
    updateSettings,
    updateViewport,
    updateContent,
    applyPreset,
    resetSettings,
    exportImage,
    undo,
    redo,
    canUndo: undoStack.current.length > 0,
    canRedo: redoStack.current.length > 0,
    setZoom,
    zoomIn,
    zoomOut,
    zoomFit,
  }
}
