'use client'
import { forwardRef } from 'react'
import { getBackgroundCSS, getShadowCSS, getPaddingValue } from '@/lib/styles'
import { BrowserFrame } from './BrowserFrame'
import { CodeCard } from './CodeCard'
import { QuoteCard } from './QuoteCard'
import { LyricsCard } from './LyricsCard'

export const ExportCanvas = forwardRef(function ExportCanvas(
  { mode = 'website', imageBase64, imageWidth, settings, url, code, quote, lyrics },
  ref
) {
  const padding = getPaddingValue(settings)
  const background = getBackgroundCSS(settings)
  const shadow = getShadowCSS(settings)
  const showsTransparencyGrid = settings.backgroundType === 'transparent'


  return (
    <div
      ref={ref}
      data-export-canvas
      className={`relative overflow-hidden ${settings.backgroundRatio} flex object-cover items-center justify-center `}
      style={{
        ...(settings.backgroundType === 'image'
          ? {
            backgroundImage: `url(${settings.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }
          : {
            background: getBackgroundCSS(settings),
          }),
        borderRadius:
          mode === 'lyrics'
            ? `${lyrics.cardBorderRadius}px`
            : mode === 'quote'
              ? `${quote.cardBorderRadius}px`
              : undefined,
        padding: `${padding + 20}px`
      }}
    >
        {showsTransparencyGrid && (
          <div data-export-exclude="true" className="absolute inset-0" style={{
            backgroundImage: 'repeating-conic-gradient(#3f3f46 0% 25%, #27272a 0% 50%)',
            backgroundSize: '16px 16px',
          }} />
        )}

        <div className="relative flex items-center justify-center" style={{ transform: `scale(${settings.imageScale})`, transformOrigin: 'center', }}>
          {mode === 'website' && (
            settings.frameType === 'none' ? (
              imageBase64 && (
                <>
                  <img
                    src={`data:image/png;base64,${imageBase64}`}
                    alt="Screenshot"
                    style={{ display: 'block', borderRadius: `${settings.borderRadius}px`, boxShadow: shadow }}
                  />
                </>
              )
            ) : (
              <BrowserFrame
                imageBase64={imageBase64}
                width={imageWidth}
                borderRadius={settings.borderRadius}
                shadow={shadow}
                theme={settings.frameType}
                url={url}
              />
            )
          )}

          {mode === 'code' && (
            <CodeCard code={code} borderRadius={settings.borderRadius} shadow={shadow} />
          )}

          {mode === 'quote' && <QuoteCard quote={quote} />}

          {mode === 'lyrics' && <LyricsCard lyrics={lyrics} />}
        </div>
      </div>
  )
})
