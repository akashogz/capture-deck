'use client'
import { Music2 } from 'lucide-react'
import { getFontFamily } from '@/constants/fonts'

export function LyricsCard({ lyrics }) {
  const align = lyrics.align ?? 'center'
  const alignClass = align === 'left' ? 'items-start text-left' : align === 'right' ? 'items-end text-right' : 'items-center text-center'

  return (
    <div className={`flex flex-col gap-7 ${alignClass}`} style={{ width: 640, maxWidth: '90vw', }}>
      <p
        style={{
          fontFamily: getFontFamily(lyrics.font),
          fontSize: `${lyrics.fontSize}px`,
          lineHeight: 1.55,
          color: lyrics.textColor,
          fontWeight: 500,
          whiteSpace: 'pre-wrap',
          margin: 0,
          lineHeight: 1.5,
          fontWeight: '700',
        }}
      >
        {lyrics.text}
      </p>

      {(lyrics.title || lyrics.artist) && (
        <div className="flex items-center gap-2.5" style={{ color: lyrics.textColor, opacity: 1 }}>
          {lyrics.showMusicIcon && <Music2 size={16} />}
          {lyrics.cover && <div><img src={lyrics.cover} className='size-20 shadow-2xl border rounded-lg border-white/30'/></div>}
          <div className="flex flex-col leading-tight" style={{ fontFamily: 'var(--font-inter)' }}>
            {lyrics.title && <span className="text-lg font-semibold">{lyrics.title}</span>}
            {lyrics.artist && <span className="text-sm opacity-80">{lyrics.artist}</span>}
          </div>
        </div>
      )}
    </div>
  )
}
