import { NextResponse } from 'next/server'
import { captureScreenshot, ScreenshotError } from '@/services/screenshot/screenshotService'

export const runtime = 'nodejs'
export const maxDuration = 30

export async function POST(req) {
  let body
  try { body = await req.json() }
  catch { return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 }) }

  const { url } = body
  if (!url?.trim()) return NextResponse.json({ success: false, error: 'url is required' }, { status: 400 })

  try {
    const { buffer, width, height } = await captureScreenshot({ ...body, url: url.trim() })
    return NextResponse.json({ success: true, image: buffer.toString('base64'), width, height })
  } catch (e) {
    if (e instanceof ScreenshotError) return NextResponse.json({ success: false, error: e.message }, { status: 422 })
    console.error('[capture]', e)
    return NextResponse.json({ success: false, error: 'Unexpected error' }, { status: 500 })
  }
}
