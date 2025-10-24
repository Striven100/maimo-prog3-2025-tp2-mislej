'use client'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useShopContext } from '@/contexts/ShopContext'

function Grid10({ cells }) {
  const items = []
  let i = 0
  while (i < 100) {
    const color = cells && cells[i] ? cells[i] : ''
    items.push(
      <div
        key={i}
        className="w-full h-full border border-black/10"
        style={{ backgroundColor: color || 'transparent' }}
      />
    )
    i = i + 1
  }
  return (
    <div className="absolute inset-0 p-2 flex items-center justify-center">
      <div className="grid grid-cols-10 grid-rows-10 w-full h-full bg-white">
        {items}
      </div>
    </div>
  )
}

export default function NFTContainer({ _id }) {
  const { Carrito, agregarAlCarrito, restarDelCarrito } = useShopContext()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [product, setProduct] = useState({})

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const { data } = await axios.get(`http://localhost:4000/products/${_id}`)
        if (mounted) setProduct(data.product)
      } catch {
        if (mounted) setError('Hubo un error al cargar el NFT.')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [_id])

  const qty = useMemo(
    () => (product ? (Carrito.find(f => f._id === product._id)?.cantidad ?? 0) : 0),
    [Carrito, product]
  )
  const inCart = qty > 0

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-gradient-to-b from-[#EDE8FF] to-[#e2d6ff]">
        <div className="w-full max-w-3xl mx-auto p-8">
          <div className="h-48 rounded-3xl bg-white/60 backdrop-blur border border-black/5 animate-pulse" />
          <div className="mt-6 space-y-3">
            <div className="h-6 w-2/3 rounded bg-white/60 backdrop-blur border border-black/5 animate-pulse" />
            <div className="h-4 w-1/2 rounded bg-white/60 backdrop-blur border border-black/5 animate-pulse" />
            <div className="h-10 w-40 rounded-xl bg-black/80 text-white grid place-items-center">
              Cargando…
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-gradient-to-b from-[#EDE8FF] to-[#e2d6ff]">
        <div className="text-center bg-white/70 backdrop-blur-md border border-black/10 rounded-3xl px-8 py-10 shadow-xl">
          <p className="mb-6 text-[#2b214c]">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2b214c] text-white font-medium shadow hover:opacity-90 transition"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F4F0FF] via-[#EDE8FF] to-[#e2d6ff]">
      <div className="relative h-[32vh] md:h-[42vh]">
        <div className="absolute inset-0 overflow-hidden">
          {product && product.backdrop_path ? (
            <Image
              src={`/assets/${product.backdrop_path}`}
              alt={product.name || 'NFT'}
              fill
              priority
              className="object-cover blur-xl scale-110 opacity-30"
            />
          ) : (
            <Grid10 cells={product && product.pixelData} />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#e2d6ff]/40 to-[#e2d6ff]" />
      </div>

      <section className="relative max-w-7xl mx-auto px-4 md:px-8 -mt-24 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          <aside className="md:col-span-1">
            <div className="rounded-3xl bg-white/70 backdrop-blur-lg border border-black/10 shadow-xl overflow-hidden">
              <div className="relative aspect-[4/3]">
                {product && product.backdrop_path ? (
                  <Image
                    src={`/assets/${product.backdrop_path}`}
                    alt={product.name || 'NFT'}
                    fill
                    className="object-cover [image-rendering:pixelated]"
                  />
                ) : (
                  <Grid10 cells={product && product.pixelData} />
                )}
              </div>

              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {product && product.release_date && (
                    <span className="px-3 py-1 rounded-full bg-black text-white text-[11px] tracking-wide">
                      🗓 {product.release_date}
                    </span>
                  )}
                  {product && typeof product.vote_average !== 'undefined' && (
                    <span className="px-3 py-1 rounded-full bg-[#ff5252]/10 text-[#ff5252] text-[11px] tracking-wide">
                      ★ {product.vote_average}
                    </span>
                  )}
                  {product && typeof product.vote_count !== 'undefined' && (
                    <span className="px-3 py-1 rounded-full bg-[#2b214c]/10 text-[#2b214c] text-[11px] tracking-wide">
                      {product.vote_count} votos
                    </span>
                  )}
                  {product && product.price && (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-[11px] tracking-wide">
                      {product.price}
                    </span>
                  )}
                </div>

                {!inCart ? (
                  <button
                    onClick={() => agregarAlCarrito(product.name, product.backdrop_path, product._id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold bg-[#2b214c] text-white shadow hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2b214c]"
                  >
                    Agregar al carrito
                  </button>
                ) : (
                  <div className="w-full flex items-center justify-between gap-3">
                    <button
                      onClick={() => restarDelCarrito(product._id)}
                      className="group flex-1 px-4 py-3 rounded-xl font-semibold bg-white border border-black/20 shadow-sm hover:bg-black/5 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/40"
                      aria-label="Restar del carrito"
                      title="Restar del carrito"
                    >
                      <span className="inline-block group-active:scale-95">–</span>
                    </button>
                    <span className="min-w-12 text-center font-bold text-[#2b214c] select-none">
                      {qty}
                    </span>
                    <button
                      onClick={() => agregarAlCarrito(product.name, product.backdrop_path, product._id)}
                      className="flex-1 px-4 py-3 rounded-xl font-semibold bg-[#2b214c] text-white shadow hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2b214c]"
                      aria-label="Agregar al carrito"
                      title="Agregar al carrito"
                    >
                      +
                    </button>
                  </div>
                )}
                <Link
                  href="/"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 text-[#2b214c] bg-white/60 hover:bg-white transition"
                >
                  ← Volver al inicio
                </Link>
              </div>
            </div>
          </aside>

          <main className="md:col-span-2">
            <div className="rounded-3xl bg-white/70 backdrop-blur-lg border border-black/10 shadow-xl p-6 md:p-10">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#2b214c]">
                {product && product.name}
              </h1>
            </div>
            <div className="rounded-3xl bg-white/70 backdrop-blur-lg border border-black/10 shadow-xl p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#2b214c]">
                {product && product.price}
              </h2>
            </div>
          </main>
        </div>
      </section>
    </div>
  )
}
