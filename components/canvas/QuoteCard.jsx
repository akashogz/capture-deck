'use client'
import { getFontFamily } from '@/constants/fonts'

export function QuoteCard({ quote }) {
  const align = quote.align ?? 'center'
  const alignClass = align === 'left' ? 'items-start text-left' : align === 'right' ? 'items-end text-right' : 'items-center text-center'

  return (
    <div className={`flex flex-col gap-6  ${alignClass}`} style={{ width: 720, maxWidth: '80vw' }}>
      {quote.showQuoteMark && (
        <span
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-cormorant-garamond)',
            fontSize: `${quote.fontSize * 2}px`,
            lineHeight: 0.5,
            color: quote.textColor,
            opacity: 0.35,
            fontWeight: '700'
          }}
        >
          “
        </span>
      )}

      <p
        style={{
          fontFamily: getFontFamily(quote.font),
          fontSize: `${quote.fontSize}px`,
          lineHeight: 1.35,
          color: quote.textColor,
          fontWeight: quote.font === 'serif' ? 600 : 500,
          whiteSpace: 'pre-wrap',
          margin: 0,
        }}
      >
        {quote.text}
      </p>

      {(quote.author || quote.role) && (
        <div className="flex flex-col gap-0.5">
          {quote.author && (
            <span
              style={{
                fontFamily: getFontFamily(quote.font),
                fontSize: `${Math.max(14, quote.fontSize * 0.4)}px`,
                color: quote.textColor,
                opacity: 0.85,
                fontWeight: 600,
              }}
            >
              — {quote.author}
            </span>
          )}
          {quote.role && (
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: `${Math.max(12, quote.fontSize * 0.32)}px`,
                color: quote.textColor,
                opacity: 0.55,
              }}
            >
              {quote.role}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
