'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useShopContext } from '@/contexts/ShopContext'

export default function CarritoContainer() {
  const { Carrito, agregarAlCarrito, restarDelCarrito, eliminarDelCarrito, CarritoQty } = useShopContext()

  if (!Carrito.length) {
    return (
      <section className="min-h-[50vh] grid place-items-center bg-[#e2d6ff]">
        <div className="text-center">
          <p className="text-black/70">Aún no tienes NFTs en tu Carrito.</p>
          <Link href="/#catalogo" className="mt-4 inline-block px-4 py-2 rounded-xl bg-black text-white">
            Explorar catálogo
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#e2d6ff] py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-black text-[#2b214c]">Tu Carrito</h2>
          <span className="text-sm text-black/70">Total de unidades: {CarritoQty()}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Carrito.map(n => (
            <article key={n._id} className="rounded-2xl overflow-hidden border border-black/10 bg-white/70">
              <div className="relative aspect-[4/3]">
                <Image
                  src={`/assets/${n.backdrop_path}`}
                  alt={n.name}
                  fill
                  className="object-cover [image-rendering:pixelated]"
                />
              </div>

              <div className="p-4 space-y-3">
                <h3 className="font-bold text-black/90 truncate">{n.name}</h3>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => restarDelCarrito(n._id)}
                    className="px-3 py-1.5 rounded-xl border border-black/20 bg-white"
                    aria-label="Restar del carrito"
                  >–</button>

                  <span className="w-10 text-center font-semibold">{n.cantidad}</span>

                  <button
                    onClick={() => agregarAlCarrito(n.name, n.backdrop_path, n._id)}
                    className="px-3 py-1.5 rounded-xl bg-black text-white"
                    aria-label="Agregar al carrito"
                  >+</button>

                  <button
                    onClick={() => eliminarDelCarrito(n._id)}
                    className="ml-auto px-3 py-1.5 rounded-xl bg-[#ff5252] text-white"
                  >
                    Quitar
                  </button>
                </div>

                <Link
                  href={`/NFT/${n._id}`}
                  className="inline-block px-3 py-1.5 rounded-xl bg-[#6f58b7] text-white text-sm hover:bg-[#5a469c]"
                >
                  Ver detalle
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
