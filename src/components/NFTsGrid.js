'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useAppContext } from '@/contexts/AppContext'

export default function NFTsGrid({ NFTs }) {
  const { Carrito, handleAddToCarrito } = useAppContext()
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {NFTs.map(n => {
        const inCart = Carrito.some(f => f._id === n._id)
        return (
          <article key={n._id} className="rounded-2xl overflow-hidden border border-black/10 bg-white/60 hover:bg-white shadow-sm hover:shadow-lg transition">
            <div className="relative aspect-[4/3]">
              <Image src={`/assets/${n.backdrop_path}`} alt={n.name} fill className="object-cover [image-rendering:pixelated]" />
            </div>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <h3 className="font-bold text-black/90 truncate">{n.name}</h3>
                <button
                  onClick={() => handleAddToCarrito(n.name, `/assets/${n.backdrop_path}`, n._id)}
                  className={`ml-auto inline-flex items-center justify-center w-9 h-9 rounded-xl border ${inCart ? 'bg-[#3cc37a] text-black border-black/10' : 'bg-black text-white border-black'} hover:opacity-90`}
                  aria-label={inCart ? 'Quitar del carrito' : 'Agregar al carrito'}
                >
                  {inCart ? '✓' : '🛒'}
                </button>
              </div>
              <p className="mt-1 text-xs text-black/60">{n.release_date}</p>
              <div className="mt-4 flex items-center justify-between">
                <Link href={`/NFT/${n._id}`} className="px-3 py-1.5 rounded-xl bg-[#6f58b7] text-white text-sm hover:bg-[#5a469c]">Ver más</Link>
                <span className="text-xs px-2 py-1 rounded bg-[#ff5252]/10 text-[#ff5252]">★ {n.vote_average ?? 0}</span>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
