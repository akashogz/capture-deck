import { createBrowserSession } from '@/services/browser/browserManager'
import { parseAndValidateUrl, UrlValidationError } from './urlValidator'

export class ScreenshotError extends Error {
  constructor(message, cause) { super(message); this.name = 'ScreenshotError'; this.cause = cause }
}

export async function captureScreenshot(req) {
  let url
  try { url = parseAndValidateUrl(req.url) }
  catch (e) { throw new ScreenshotError(e instanceof UrlValidationError ? e.message : 'Invalid URL') }

  const vw = req.viewportWidth ?? 1440
  const vh = req.viewportHeight ?? 900
  const session = await createBrowserSession(vw, vh)

  try {
    const page = await session.context.newPage()

    if (req.darkMode) {
      await page.emulateMedia({ colorScheme: 'dark' })
    }

    // Block ads & analytics
    if (req.blockAds) {
      await page.route('**/*', route => {
        const u = route.request().url()
        const blocked = ['doubleclick.net','googleadservices','googlesyndication','adnxs.com','facebook.net/en_US/fbevents']
        if (blocked.some(b => u.includes(b))) return route.abort()
        return route.continue()
      })
    }

    await page.goto(url.toString(), { waitUntil: 'networkidle', timeout: 25000 })

    // Hide cookie banners
    if (req.hideCookieBanner) {
      await page.evaluate(() => {
        const selectors = ['[id*="cookie"]','[class*="cookie"]','[id*="consent"]','[class*="consent"]','[id*="gdpr"]','[class*="banner"]']
        selectors.forEach(s => { try { document.querySelectorAll(s).forEach((el) => el.style.display = 'none') } catch {} })
      }).catch(() => {})
    }

    if (req.delay && req.delay > 0) await page.waitForTimeout(Math.min(req.delay, 5000))
    else await page.waitForTimeout(500)

    const buf = await page.screenshot({ type: 'png', fullPage: req.fullPage ?? false })
    const vp = page.viewportSize()
    return { buffer: Buffer.from(buf), width: vp?.width ?? vw, height: vp?.height ?? vh }
  } catch (e) {
    if (e instanceof ScreenshotError) throw e
    throw new ScreenshotError(`Capture failed: ${e instanceof Error ? e.message : String(e)}`, e)
  } finally {
    await session.close()
  }
}
