// On Vercel (and other serverless hosts), the full `playwright` package's ~300MB
// bundled Chromium download blows past the function size limit and generally
// isn't present at runtime anyway. `@sparticuz/chromium` ships a Lambda/Vercel-
// sized build instead, driven through `playwright-core` (the browser-less half
// of Playwright). Locally, we don't want that — it's slower to start and the
// full `playwright` package's own managed Chromium (installed via
// `npx playwright install chromium`) is simpler to develop against. `process.env.VERCEL`
// is set automatically by Vercel's build/runtime, so we branch on that.
const isVercel = !!process.env.VERCEL

export async function createBrowserSession(w, h) {
  let browser

  if (isVercel) {
    const { chromium } = await import('playwright-core')
    const chromiumBinary = (await import('@sparticuz/chromium')).default
    browser = await chromium.launch({
      args: chromiumBinary.args,
      executablePath: await chromiumBinary.executablePath(),
      headless: true,
    })
  } else {
    const { chromium } = await import('playwright')
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    })
  }

  const context = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  })
  return {
    context,
    close: async () => { await context.close(); await browser.close() },
  }
}
