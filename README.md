# capture-deck

A polished content-to-image editor. Turn **websites, code, lyrics, and quotes**
into pixel-perfect, shareable images — style with gradients, frames, and shadows, then export.

## Quick start

```bash
npm install
npx playwright install chromium
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

```
app/
  api/capture/route.js    → POST /api/capture (screenshot, Website mode only)
  page.jsx                → Landing ⇄ EditorLayout switch based on chosen mode
  layout.jsx               → Loads Inter, Playfair Display, Caveat, JetBrains Mono

components/
  Landing.jsx              → Hero + four mode cards (Website/Code/Lyrics/Quote)
  EditorLayout.jsx         → Thin orchestrator: wires useEditor() to child components
  header/Header.jsx        → Logo (→ home), nav links, Export button
  sidebar/
    Sidebar.jsx             → Mode switcher + 300px inspector panel
    controls/               → One file per control group — Mode, Background, Frame, Layout,
                               Shadow, Viewport, Export, Presets, Code, Quote, Lyrics
  workspace/
    Workspace.jsx           → Pan/zoom canvas container; text modes render immediately
    EmptyState.jsx          → "Capture your first website" + example URLs (Website mode only)
    LoadingState.jsx        → Step-by-step capture progress (Website mode only)
    ErrorState.jsx
    ZoomControls.jsx
  canvas/
    ExportCanvas.jsx        → SINGLE SOURCE OF TRUTH for visual rendering, routes by mode
    BrowserFrame.jsx        → Safari-style chrome (light/dark) + minimal frame (Website mode)
    CodeCard.jsx             → macOS-style code window with syntax highlighting
    QuoteCard.jsx             → Big typography quote card
    LyricsCard.jsx            → Lyrics block with song/artist caption
  ui/                      → Slider, ColorSwatch, Toggle, Chips, Section, Toast, Select,
                               TextInput, TextArea

hooks/
  useEditor.js             → All editor state: mode, capture, per-mode content, settings,
                              viewport, export, undo/redo, zoom — one hook, one return value

lib/
  styles.js                → getPaddingValue(), getShadowCSS(), getBackgroundCSS(),
                              generateFilename() — mode-aware, used by preview + export
  codeHighlight.js          → Prism.js wrapper for the Code mode
  frameChrome.js            → Browser chrome SVG (Website mode)
  exportImage.js            → html-to-image rasterization + download

constants/
  modes.js, fonts.js, languages.js, codeThemes.js  → new content-mode data
  gradients.js, presets.js, viewports.js, defaults.js, resolutions.js

services/
  browser/browserManager.js      → Playwright lifecycle
  screenshot/
    screenshotService.js         → Capture orchestration: dark mode, ad blocking,
                                    cookie banners, delay, full page
    urlValidator.js               → SSRF protection
```

## Data flow

**Website mode:** `Header`/`Sidebar` URL bar → `useEditor.capture()` → `POST /api/capture` →
Playwright screenshot → base64 PNG → live in `ExportCanvas` via `BrowserFrame`.

**Code / Lyrics / Quote modes:** typing in the sidebar calls `useEditor.updateContent(mode, partial)`
→ state updates → `ExportCanvas` re-renders the matching card (`CodeCard` / `LyricsCard` /
`QuoteCard`) instantly, no network call.

**Every mode:** sidebar style controls (Background, Layout, Shadow, Export) mutate `EditorSettings`
via `updateSettings()` — shared across all modes. On export, `useEditor.exportImage()` rasterizes
the live `ExportCanvas` DOM node with `html-to-image` and triggers a download with a
mode-aware generated filename (`screenshot-*`, `code-*`, `quote-*`, `lyrics-*`).

## Requirements

- Node.js 18+
- `npx playwright install chromium` (~120MB) — only required for local dev in Website mode