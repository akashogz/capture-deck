'use client'

import Link from "next/link";
import { useRouter } from "next/navigation"

export function Header({ onExport, isExporting, hasImage }) {
  const router = useRouter();

  return (
    <header
      className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-40px)] max-w-4xl h-14 px-2 flex items-center gap-4 justify-between rounded-full border border-white/10 bg-white/5 backdrop-blur-xs shadow-[0_8px_40px_rgba(0,0,0,.35)] supports-[backdrop-filter]:bg-white/2">
      <button
        type="button"
        onClick={() => router.push('/')}
        className={`flex items-center gap-1 box-shadow-2xl cursor-pointer hover:opacity-80 transition-opacity`}
      >
        <div className="w-10 h-10 object-cover rounded-lg bg-gradient-to-br flex items-center justify-center">
          <img src='/logo.png' alt="capture-deck logo" />
        </div>
        <span className="text-xl font-bold text-zinc-100 hidden sm:inline">capture-deck</span>
      </button>

      <div className="flex items-center text-sm gap-5 shrink-0">
        <Link href={'https://github.com/akashogz'} target="_blank" className="hidden md:inline text-zinc-300 hover:text-white transition-colors">GitHub</Link>
        <Link href={'https://linkedin.com/in/akashogz'} target="_blank" className="hidden md:inline text-zinc-300 hover:text-white transition-colors">Linkedin</Link>
        {onExport && (
          <button
            onClick={onExport}
            disabled={!hasImage || isExporting}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              hasImage && !isExporting ? 'bg-white text-zinc-900 hover:bg-zinc-100 active:scale-95' : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            {isExporting ? 'Exporting…' : 'Export'}
          </button>
        )}
        <img src='/profile.png' alt="Profile" className='size-10 rounded-full'/>
      </div>
    </header>
  )
}
