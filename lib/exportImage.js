/**
 * lib/exportImage.js
 *
 * Client-side export pipeline built on html-to-image.
 *
 * Instead of re-composing the screenshot server-side with Sharp (background +
 * shadow + frame + rounded corners, duplicating the CSS in lib/styles.js),
 * we rasterize the *actual* <ExportCanvas> DOM node that the user is already
 * looking at. Preview and export are now guaranteed to be pixel-identical —
 * there is no second implementation to drift out of sync.
 */

import { toCanvas } from 'html-to-image'
import { generateFilename } from './styles'
import { RESOLUTIONS } from '@/constants/resolutions'

const MIME_TYPES = { png: 'image/png', jpeg: 'image/jpeg', webp: 'image/webp' }
const QUALITY_MAP = { standard: 1, high: 1.5, maximum: 2 }

// Nodes marked with this attribute (e.g. the editor-only transparency
// checkerboard) are excluded from the rasterized output.
function skipExcluded(node) {
  return !(node instanceof HTMLElement && node.dataset?.exportExclude === 'true')
}

/**
 * Rasterizes `node` to a Blob according to the current export settings and
 * triggers a browser download.
 */
export async function exportNodeToFile(node, settings, context) {
  if (!node) throw new Error('Nothing to export yet')

  const target = RESOLUTIONS.find(r => r.value === settings.exportResolution) ?? RESOLUTIONS[1]
  const pixelRatio = target.height / node.offsetHeight
  const isJpeg = settings.exportFormat === 'jpeg'
  // JPEG has no alpha channel — fall back to white instead of the browser's
  // default black when the canvas is set to a transparent background.
  const backgroundColor = isJpeg && settings.backgroundType === 'transparent' ? '#ffffff' : undefined

  const canvas = await toCanvas(node, {
    pixelRatio,
    filter: skipExcluded,
    backgroundColor,
    skipFonts: false,
  })

  const mime = MIME_TYPES[settings.exportFormat] ?? MIME_TYPES.png
  const quality = QUALITY_MAP[settings.exportQuality] ?? QUALITY_MAP.high

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      b => (b ? resolve(b) : reject(new Error('Canvas export failed'))),
      mime,
      mime === MIME_TYPES.png ? undefined : quality
    )
  })

  const filename = generateFilename(settings, context)
  downloadBlob(blob, filename)
}

function downloadBlob(blob, filename) {
  const objectUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = objectUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(objectUrl)
}
