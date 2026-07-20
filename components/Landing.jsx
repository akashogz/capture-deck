'use client'
import React from 'react'
import { ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'

const SHOWCASE_IMAGES = [
    { src: '/augenwin.png', offset: false },
    { src: '/twitterwin.png', offset: true },
    { src: '/quote-1.png', offset: false },
    { src: '/aavewin.png', offset: true },
    { src: '/song-3.png', offset: false },
    { src: '/elegantwin.png', offset: true },
    { src: '/song-2.png', offset: false },
    { src: '/githubwin.png', offset: true },
]

function Landing() {
    const router = useRouter()

    return (
        <div className="relative isolate pt-10 no-scrollbar">
            <div className='absolute inset-0 bg-polka opacity-20 -z-10'></div>
            <main className="flex items-center justify-center px-6 w-full mt-20">
                <div className="text-center">
                    <h1 className="text-7xl font-bold tracking-tight text-white">
                        Create awesome
                        <br />
                        shareable visuals.
                    </h1>

                    {/* Carousel */}
                    <div className="relative mt-8 w-screen max-w-none left-1/2 -translate-x-1/2 py-8 no-scrollbar overflow-hidden">
                        {/* fade edges */}
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[#242424] to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[#242424] to-transparent" />

                        <div className="marquee-track flex w-max gap-5">
                            {[...SHOWCASE_IMAGES, ...SHOWCASE_IMAGES].map((img, i) => (
                                <img
                                    key={`${img.src}-${i}`}
                                    src={img.src}
                                    className={`marquee-img h-50 rounded-xl object-cover shrink-0 relative `}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 flex justify-center gap-4 rounded-lg">
                        <button
                            onClick={() => router.push('/editor/website')}
                            className='flex gap-3 items-center border text-sm font-semibold p-2 px-8 rounded-full hover:bg-white hover:text-black hover:border-black duration-500 ease-in-out transition-all cursor-pointer'
                        >
                            Try It <ExternalLink size={14} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Landing