'use client'
import { GRADIENTS } from '@/constants/gradients'
import { Section } from '@/components/ui/Section'
import { Chips } from '@/components/ui/Chips'
import { ColorSwatch } from '@/components/ui/ColorSwatch'
import { Slider } from '@/components/ui/Slider'
import { BACKGROUND_IMAGES } from '@/constants/textures'
import { Plus, Upload } from 'lucide-react'

const TYPES = [
  { value: 'gradient', label: 'Gradient' },
  { value: 'solid', label: 'Solid' },
  { value: 'mesh', label: 'Mesh' },
  { value: 'image', label: 'Image' },
]

const RATIOS = [
  { value: 'aspect-video', label: '16:9' },
  { value: 'aspect-[9/16]', label: '9:16' },
  { value: 'aspect-square', label: '1:1' },
  { value: '', label: 'Auto' },
]


export function BackgroundControl({ settings, onChange }) {
  const handleBackgroundUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    onChange({
      backgroundImage: url,
      backgroundType: "image",
    });
  };

  return (
    <Section title="Background">
      <div className='flex gap-2 flex-col'>
        <p className='text-xs text-white/50'>Ratio</p>
        <div className='grid grid-cols-4 gap-2'>
          {
            RATIOS.map((r, i) => (
              <button key={r.value} onClick={() => onChange({ backgroundRatio: r.value })} className={`border items-center flex justify-center border-white/50 text-xs p-2 rounded-full ${settings.backgroundRatio === r.value ? `bg-white text-black` : ``}`}>
                {r.label}
              </button>
            ))
          }
        </div>
      </div>
      <Chips options={TYPES} value={settings.backgroundType} onChange={v => onChange({ backgroundType: v })} />

      {settings.backgroundType === 'solid' && (
        <ColorSwatch label="Color" value={settings.backgroundColor} onChange={v => onChange({ backgroundColor: v })} />
      )}

      {(settings.backgroundType === 'gradient' || settings.backgroundType === 'mesh') && (
        <>
          <div className="grid grid-cols-6 gap-1.5">
            {GRADIENTS.map(g => (
              <button key={g.id} title={g.label}
                onClick={() => onChange({ gradientId: g.id, gradientFrom: g.from, gradientTo: g.to, gradientAngle: g.angle })}
                className={`aspect-square rounded-lg transition-transform hover:scale-110 ${settings.gradientId === g.id ? 'ring-1 ring-white/50 ring-offset-2 ring-offset-zinc-900' : ''}`}
                style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }} />
            ))}
          </div>
          <div className="space-y-3 pt-1">
            <ColorSwatch label="From" value={settings.gradientFrom} onChange={v => onChange({ gradientFrom: v, gradientId: 'custom' })} />
            <ColorSwatch label="To" value={settings.gradientTo} onChange={v => onChange({ gradientTo: v, gradientId: 'custom' })} />
            {settings.backgroundType === 'gradient' && (
              <Slider label="Angle" value={settings.gradientAngle} min={0} max={360} step={5} unit="°" onChange={v => onChange({ gradientAngle: v })} />
            )}
          </div>
        </>
      )}

      {settings.backgroundType === 'transparent' && (
        <p className="text-xs text-zinc-500 leading-relaxed">Background will be transparent in PNG/WebP exports.</p>
      )}

      <div className='grid grid-cols-3 items-center gap-5'>

        {
          settings.backgroundType === 'image' && (
            BACKGROUND_IMAGES.map((bg) => (
              <button
                key={bg.value}
                onClick={() =>
                  onChange({
                    backgroundImage: bg.path,
                  })
                }
                className='flex flex-col items-center text-xs gap-2'
              >
                <div className={`w-15 rounded-lg bg-transparent p-1 ${settings.backgroundImage === bg.path ? `border-2` : ``}`}>
                  <img src={bg.path} className={`w-15 rounded-md`} />
                </div>
                {bg.name}
              </button>
            ))
          )

        }
        {
          settings.backgroundType === "image" && (

            <label className="flex cursor-pointer flex-col items-center gap-3 text-xs">
              <div className="flex h-8 w-8 items-center p-2 justify-center rounded-full border border-dashed border-white/50 text-white/50 transition hover:border-white hover:text-white">
                <Upload size={14} />
              </div>

              <span>Custom</span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBackgroundUpload}
              />
            </label>
          )
        }
      </div>
    </Section>
  )
}
