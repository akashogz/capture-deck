'use client'
import { getChromeBarSvg, getMinimalBarSvg, CHROME_BAR_HEIGHT, MINIMAL_BAR_HEIGHT } from '@/lib/frameChrome'
import { ArrowLeft, ArrowRight, Cross, Link2, Minus, RotateCw, SlidersHorizontal, Square, X } from 'lucide-react'

export function BrowserFrame({ imageBase64, borderRadius, shadow, theme, url, width }) {
  if (theme === 'minimal') {
    return (
      <div
        style={{
          borderRadius: `${borderRadius + 10}px`,
          boxShadow: shadow,
          overflow: 'hidden',
          background: 'rgba(255,255,255,.35)',
          border: '10px solid rgba(255,255,255,.2)',
        }}
      >
        {imageBase64 && (
          <img
            src={`data:image/png;base64,${imageBase64}`}
            alt=""
            style={{
              display: 'block',
              width,
              borderRadius: `${borderRadius}px`,
            }}
          />
        )}
      </div>
    )
  }

  if (theme === 'mobile') {
    return (
      <div
        className='flex items-center w-full justify-center shadow-2xl'
        style={{
          borderRadius: `${borderRadius + 16}px`,
          boxShadow: shadow,
          overflow: 'hidden',
          background: 'rgba(255,255,255,.35)',
          border: '15px solid rgba(25,25,25,1)',
        }}
      >
        <div className='w-25 bg-[#191919] shadow-2xl h-7 fixed top-5 rounded-full justify-end flex items-center'>
          <div className='h-4 w-4 bg-[black] flex items-center justify-center shadow-2xl rounded-full mr-1.5'>
            <div className='h-3 w-3 flex items-center justify-center shadow-2xl bg-[#15001e] rounded-full'>
              <div className='h-1.5 w-1.5 rounded-full bg-black shadow-2xl'></div>
            </div>
          </div>
        </div>
        {imageBase64 && (
          <img
            src={`data:image/png;base64,${imageBase64}`}
            alt=""
            style={{
              display: 'block',
              width,
              borderRadius: `${borderRadius}px`,
            }}
          />
        )}
      </div>
    )
  }

  if (theme === 'windows-light') {
    return (
      <div
        style={{
          borderRadius: `${borderRadius}px`,
          boxShadow: shadow,
          overflow: 'hidden',
        }}
      >
        <div className='h-10 flex  items-center justify-end px-5 gap-5 right-0 bg-[#f3f3f3] text-[#1a1a1a]'>
          <Minus size={18} />
          <Square size={16} />
          <X size={18} />
        </div>
        {imageBase64 && (
          <img
            src={`data:image/png;base64,${imageBase64}`}
            alt=""
            style={{
              display: 'block',
              width,
            }}
          />
        )}
      </div>
    )
  }

  if (theme === 'windows-dark') {
    return (
      <div
        style={{
          borderRadius: `${borderRadius}px`,
          boxShadow: shadow,
          overflow: 'hidden',
        }}
      >
        <div className='h-10 flex  items-center justify-end px-5 gap-5 right-0 bg-[#202020]'>
          <Minus size={18} />
          <Square size={16} />
          <X size={18} />
        </div>
        {imageBase64 && (
          <img
            src={`data:image/png;base64,${imageBase64}`}
            alt=""
            style={{
              display: 'block',
              width,
            }}
          />
        )}
      </div>
    )
  }

  if (theme === 'macos-dark') {
    return (
      <div
        style={{
          borderRadius: `${borderRadius}px`,
          boxShadow: shadow,
          overflow: 'hidden',
        }}
      >
        <div className='h-10 flex  items-center px-5 gap-3 right-0 bg-[#202020]'>
          <div className='h-3 w-3 bg-[#FF605C] rounded-full'></div>
          <div className='h-3 w-3 bg-[#FFBD44] rounded-full'></div>
          <div className='h-3 w-3 bg-[#00CA4E] rounded-full'></div>
        </div>
        {imageBase64 && (
          <img
            src={`data:image/png;base64,${imageBase64}`}
            alt=""
            style={{
              display: 'block',
              width,
            }}
          />
        )}
      </div>
    )
  }

  if (theme === 'macos-light') {
    return (
      <div
        style={{
          borderRadius: `${borderRadius}px`,
          boxShadow: shadow,
          overflow: 'hidden',
        }}
      >
        <div className='h-10 flex  items-center px-5 gap-3 right-0 bg-[#f3f3f3]'>
          <div className='h-3 w-3 bg-[#FF605C] rounded-full'></div>
          <div className='h-3 w-3 bg-[#FFBD44] rounded-full'></div>
          <div className='h-3 w-3 bg-[#00CA4E] rounded-full'></div>
        </div>
        {imageBase64 && (
          <img
            src={`data:image/png;base64,${imageBase64}`}
            alt=""
            style={{
              display: 'block',
              width,
            }}
          />
        )}
      </div>
    )
  }

  if (theme === 'arc-light') {
    return (
      <div
        style={{
          borderRadius: `${borderRadius}px`,
          boxShadow: shadow,
          overflow: 'hidden',
        }}
      >
        <div className='h-10 flex  items-center px-5 gap-3 justify-between bg-[#f3f3f3]/80 text-black/60'>
        <div className='flex gap-3'>
          <ArrowLeft size={18}/>
          <ArrowRight size={18}/>
          <RotateCw size={18}/>
        </div>
          <div className=' text-xs flex gap-3 items-center'>
            <Link2 size={14} />
            <p className='bg-linear-to-br from-[#f3f3f3]/30 to-[#f3f3f3]/50 border border-white/20 w-40 text-center truncate p-1 px-5 rounded-full'>{url}</p>
            <SlidersHorizontal size={14} />
          </div>
          <div className='h-10 flex  items-center justify-end gap-5 right-0'>
            <Minus size={18} />
            <Square size={16} />
            <X size={18} />
          </div>
        </div>
        {imageBase64 && (
          <img
            src={`data:image/png;base64,${imageBase64}`}
            alt=""
            style={{
              display: 'block',
              width,
            }}
          />
        )}
      </div>
    )
  }

    if (theme === 'arc-dark') {
    return (
      <div
        style={{
          borderRadius: `${borderRadius}px`,
          boxShadow: shadow,
          overflow: 'hidden',
        }}
      >
        <div className='h-10 flex  items-center px-5 gap-3 justify-between bg-[#202020]/80 text-white/60'>
        <div className='flex gap-3'>
          <ArrowLeft size={18}/>
          <ArrowRight size={18}/>
          <RotateCw size={18}/>
        </div>
          <div className=' text-xs flex gap-3 items-center'>
            <Link2 size={14} />
            <p className='bg-linear-to-br from-[#202020]/30 to-[#202020]/50 border border-white/10 w-40 text-center truncate p-1 px-5 rounded-full'>{url}</p>
            <SlidersHorizontal size={14} />
          </div>
          <div className='h-10 flex  items-center justify-end gap-5 right-0'>
            <Minus size={18} />
            <Square size={16} />
            <X size={18} />
          </div>
        </div>
        {imageBase64 && (
          <img
            src={`data:image/png;base64,${imageBase64}`}
            alt=""
            style={{
              display: 'block',
              width,
            }}
          />
        )}
      </div>
    )
  }



  const svg = getChromeBarSvg({ width, theme, url })
  return (
    <div style={{ borderRadius: `${borderRadius}px`, boxShadow: shadow, overflow: 'hidden' }}>
      <div style={{ width, height: CHROME_BAR_HEIGHT }} dangerouslySetInnerHTML={{ __html: svg }} />
      {imageBase64 && <img src={`data:image/png;base64,${imageBase64}`} alt="" style={{ display: 'block', width }} />}
    </div>
  )
}
