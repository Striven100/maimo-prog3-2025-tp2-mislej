'use client'
import Image from 'next/image'
import { useState, useMemo } from 'react'

export default function Hero({ NFTs }) {
  const list = useMemo(() => [...NFTs].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)), [NFTs])
  const [feature, setFeature] = useState(list[0] ?? null)

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[76vh] overflow-hidden">
      <Image src="/assets/unnamed.png" alt="Header" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-[#c9b3ea]/90 via-[#9e85d6]/75 to-[#6f58b7]/80" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-3xl text-black">
          <h1 className="text-4xl md:text-6xl font-black leading-tight drop-shadow-sm">{feature?.name ?? 'Colección Pixel Dragons'}</h1>
          <p className="mt-4 text-base md:text-lg/7 text-black/80">{feature?.overview ?? 'Descubrí criaturas pixel art y coleccionalas en tu wallet. Arte retro, atmósfera fantástica y compras simples.'}</p>
          <a href="#catalogo" className="mt-8 inline-block px-6 py-3 rounded-2xl bg-black text-white font-semibold hover:bg-black/90">Ver catálogo</a>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {list.slice(0, 12).map(n => (
              <button
                key={n._id}
                onClick={() => setFeature(n)}
                className={`group relative shrink-0 w-40 rounded-2xl border border-black/10 overflow-hidden bg-white/40 hover:bg-white/60`}
              >
                <div className="aspect-[4/3] relative">
                  <Image src={`/assets/${n.backdrop_path}`} alt={n.name} fill className="object-cover [image-rendering:pixelated]" />
                </div>
                <div className="p-3 text-left">
                  <p className="text-sm font-semibold text-black/80 truncate">{n.name}</p>
                  <p className="text-xs text-black/60">{n.release_date}</p>
                </div>
                {feature?._id === n._id && <span className="absolute inset-0 ring-2 ring-[#3cc37a] rounded-2xl" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
