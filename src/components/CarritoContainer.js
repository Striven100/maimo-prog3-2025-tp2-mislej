'use client'

import { useAppContext } from '@/contexts/AppContext'
import Image from 'next/image'
import Link from 'next/link'

export default function CarritoContainer() {
  const { Carrito } = useAppContext()

  if (!Carrito.length) {
    return (
      <section className="min-h-[50vh] grid place-items-center bg-[#e2d6ff]">
        <div className="text-center">
          <p className="text-black/70">Aún no tienes NFTs en tu Carrito.</p>
          <Link href="/#catalogo" className="mt-4 inline-block px-4 py-2 rounded-xl bg-black text-white">Explorar catálogo</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#e2d6ff] py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-black text-[#2b214c] mb-8">Tu Carrito</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Carrito.map(n => (
            <article key={n._id} className="rounded-2xl overflow-hidden border border-black/10 bg-white/70">
              <div className="relative aspect-[4/3]">
                <Image src={n.backdrop_path.startsWith('/assets/') ? n.backdrop_path : `/assets/${n.backdrop_path}`} alt={n.name} fill className="object-cover [image-rendering:pixelated]" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-black/90 truncate">{n.name}</h3>
                <Link href={`/NFT/${n._id}`} className="mt-3 inline-block px-3 py-1.5 rounded-xl bg-[#6f58b7] text-white text-sm hover:bg-[#5a469c]">Ver detalle</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
