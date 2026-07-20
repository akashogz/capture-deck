/**
 * lib/frameChrome.js
 *
 * Generates the browser chrome bar (traffic lights, address bar, nav arrows,
 * refresh icon) as a raw SVG string given a width and theme.
 *
 * This is the SINGLE SOURCE used by components/canvas/BrowserFrame.jsx,
 * rendered inline in the live preview. Because export now rasterizes that
 * same live DOM via html-to-image (see lib/exportImage.js), there is no
 * separate server-side rendering path to keep in sync — preview and export
 * are the same pixels by construction.
 */

export const CHROME_BAR_HEIGHT = 44

function getHostname(url) {
  if (!url) return 'example.com'
  try {
    return new URL(/^https?:\/\//.test(url) ? url : `https://${url}`).hostname
  } catch {
    return url
  }
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Returns an SVG string for the chrome bar only (not including the screenshot).
 * Height is fixed at CHROME_BAR_HEIGHT; width matches the screenshot width.
 */
export function getChromeBarSvg({ width, theme, url }) {
  const isDark = theme === 'browser-dark'
  const chromeBg = isDark ? '#1c1c1e' : '#e8e8ea'
  const chromeBorder = isDark ? '#2c2c2e' : '#d1d1d3'
  const addressBg = isDark ? '#2c2c2e' : '#ffffff'
  const addressText = isDark ? '#8e8e93' : '#6e6e73'
  const iconColor = isDark ? '#ffffff' : '#000000'
  const iconOpacity = 0.4

  const h = CHROME_BAR_HEIGHT
  const hostname = escapeXml(getHostname(url))

  // Layout constants
  const padX = 14
  const dotR = 5.5
  const dotGap = 7
  const dotsStartX = padX + dotR
  const navStartX = dotsStartX + dotR + 50
  const addressX = navStartX + 38
  const refreshSize = 15
  const addressRight = width - padX - refreshSize - 14
  const addressW = Math.max(60, addressRight - addressX)
  const centerY = h / 2

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${h}" viewBox="0 0 ${width} ${h}">
  <rect width="${width}" height="${h}" fill="${chromeBg}"/>
  <line x1="0" y1="${h - 0.5}" x2="${width}" y2="${h - 0.5}" stroke="${chromeBorder}" stroke-width="1"/>

  <!-- Traffic lights -->
  <circle cx="${dotsStartX}" cy="${centerY}" r="${dotR}" fill="#ff5f57"/>
  <circle cx="${dotsStartX + dotR * 2 + dotGap}" cy="${centerY}" r="${dotR}" fill="#febc2e"/>
  <circle cx="${dotsStartX + (dotR * 2 + dotGap) * 2}" cy="${centerY}" r="${dotR}" fill="#28c840"/>

  <!-- Nav arrows -->
  <g opacity="${iconOpacity}" stroke="${iconColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M${navStartX + 7} ${centerY - 5} L${navStartX} ${centerY} L${navStartX + 7} ${centerY + 5}"/>
    <path d="M${navStartX + 20} ${centerY - 5} L${navStartX + 27} ${centerY} L${navStartX + 20} ${centerY + 5}"/>
  </g>

  <!-- Address bar -->
  <rect x="${addressX}" y="${centerY - 13}" width="${addressW}" height="26" rx="6" fill="${addressBg}"/>
  <g transform="translate(${addressX + 10}, ${centerY - 4})">
    <rect x="1" y="3" width="8" height="6" rx="1.2" fill="none" stroke="${addressText}" stroke-width="1.3"/>
    <path d="M2.5 3 V1.8 a2 2 0 0 1 4 0 V3" fill="none" stroke="${addressText}" stroke-width="1.3"/>
  </g>
  <text x="${addressX + 30}" y="${centerY + 4}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" fill="${addressText}">https://${hostname}</text>

  <!-- Refresh icon -->
  <g transform="translate(${width - padX - refreshSize -2}, ${centerY - refreshSize / 1.9}) scale(0.65)" opacity="${iconOpacity}" stroke="${iconColor}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/> 
  </g>
</svg>`.trim()
}

/**
 * Minimal frame: just a thin top bar, no chrome details.
 */
export function getMinimalBarSvg(width) {
  const h = 15
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${h}" viewBox="0 0 ${width} ${h}">
  <rect width="${width}" height="${h}" fill="white" fill-opacity="0.2"/>
</svg>`.trim()
}

export const MINIMAL_BAR_HEIGHT = 15
