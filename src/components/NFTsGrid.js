'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useShopContext } from '@/contexts/ShopContext'

export default function NFTsGrid({ NFTs }) {
  const { Carrito, agregarAlCarrito, restarDelCarrito } = useShopContext()
  const cantidadDe = (id) => Carrito.find(x => x._id === id)?.cantidad ?? 0

  return (
    <div id="catalogo" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {NFTs?.map(n => {
        const qty = cantidadDe(n._id)
        return (
          <article key={n._id} className="rounded-2xl overflow-hidden border border-black/10 bg-white/60 hover:bg-white shadow-sm hover:shadow-lg transition">
            <div className="relative aspect-[4/3]">
              <Image
                src={`/assets/${n.backdrop_path}`}
                alt={n.name}
                fill
                className="object-cover [image-rendering:pixelated]"
              />
            </div>

            <div className="p-4">
              <div className="flex items-start gap-3">
                <h3 className="font-bold text-black/90 truncate">{n.name}</h3>

                <div className="ml-auto inline-flex items-center gap-2">
                  <button
                    onClick={() => restarDelCarrito(n._id)}
                    className="w-9 h-9 rounded-xl border border-black/20 bg-white hover:bg-black/5"
                    aria-label="Restar del carrito"
                  >–</button>
                  <span className="min-w-6 text-center text-sm font-semibold">{qty}</span>
                  <button
                    onClick={() => agregarAlCarrito(n.name, n.backdrop_path, n._id)}
                    className="w-9 h-9 rounded-xl border border-black bg-black text-white hover:opacity-90"
                    aria-label="Agregar al carrito"
                  >+</button>
                </div>
              </div>

              <p className="mt-1 text-xs text-black/60">{n.release_date}</p>

              <div className="mt-4 flex items-center justify-between">
                <Link
                  href={`/NFT/${n._id}`}
                  className="px-3 py-1.5 rounded-xl bg-[#6f58b7] text-white text-sm hover:bg-[#5a469c]"
                >
                  Ver más
                </Link>
                <span className="text-xs px-2 py-1 rounded bg-[#ff5252]/10 text-[#ff5252]">
                  ★ {n.vote_average ?? 0}
                </span>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
