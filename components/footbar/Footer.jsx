import { AtSign } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <div className='w-full bg-[#242424] text-sm pt-30 pb-5 items-center justify-center flex flex-col gap-5'>
        <div className='flex gap-1 '><p>Made by Akash Gautam</p></div>
        <div className='flex gap-5'>
          <a href='https://github.com/YOUR_GITHUB_USERNAME' target='_blank' rel='noopener noreferrer' className='flex gap-3 items-center px-5 rounded-full border border-white/50 p-1 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-2xl hover:brightness-120 duration-200 ease-in-out'>
            <img src='/github.svg' alt='GitHub' className='size-4'/>
            <p>GitHub</p>
          </a>
          <a href='https://linkedin.com/in/akashogz' target='_blank' rel='noopener noreferrer' className='flex gap-3 items-center px-5 rounded-full border border-white/50 p-1 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-2xl hover:brightness-120 duration-200 ease-in-out'>
            <img src='/linkedin.svg' alt='LinkedIn' className='size-4'/>
            <p>LinkedIn</p>
          </a>
          <a href='mailto:akashogz@gmail.com' className='flex gap-3 items-center px-5 rounded-full border border-white/50 p-1 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-2xl hover:brightness-120 duration-200 ease-in-out'>
            <AtSign size={18}/>
            <p>akashogz@gmail.com</p>
          </a>
        </div>
    </div>
  )
}

export default Footer