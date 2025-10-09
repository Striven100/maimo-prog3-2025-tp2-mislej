'use client'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useShopContext } from '@/contexts/ShopContext'

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
        console.log(data)
      } catch {
        if (mounted) setError('Hubo un error al cargar el NFT.')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [_id])

  // cantidad actual en el carrito para este producto
  const qty = useMemo(
    () => (product ? (Carrito.find(f => f._id === product._id)?.cantidad ?? 0) : 0),
    [Carrito, product]
  )
  const inCart = qty > 0

  if (loading) return <div className="min-h-[60vh] grid place-products-center bg-[#c9b3ea] text-black">Cargando…</div>
  if (error) return (
    <div className="min-h-[60vh] grid place-products-center bg-[#c9b3ea] text-black">
      <div className="text-center">
        <p className="mb-4">{error}</p>
        <Link href="/" className="px-4 py-2 rounded-xl bg-black text-white">Volver al inicio</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#e2d6ff]">
      <div className="relative h-[38vh] md:h-[48vh]">
        <div className="absolute inset-0" />
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-24 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="rounded-2xl">
              <div className="relative aspect-[4/3]">
                <Image src={`/assets/${product.backdrop_path}`} alt={product.name} fill className="object-cover [image-rendering:pixelated]" />
              </div>

              <div className="p-4 flex products-center justify-between">
                {/* Si no está en carrito, mostrar botón original "Agregar al carrito".
                    Si ya está, mostrar controles para restar/sumar y cantidad */}
                {!inCart ? (
                  <button
                    onClick={() => agregarAlCarrito(product.name, product.backdrop_path, product._id)}
                    className="px-4 py-2 rounded-xl font-semibold bg-black text-white w-full"
                  >
                    Agregar al carrito
                  </button>
                ) : (
                  <div className="w-full flex items-center gap-3">
                    <button
                      onClick={() => restarDelCarrito(product._id)}
                      className="px-4 py-2 rounded-xl font-semibold bg-white border border-black/20"
                      aria-label="Restar del carrito"
                    >
                      –
                    </button>
                    <span className="min-w-10 text-center font-semibold">{qty}</span>
                    <button
                      onClick={() => agregarAlCarrito(product.name, product.backdrop_path, product._id)}
                      className="px-4 py-2 rounded-xl font-semibold bg-black text-white"
                      aria-label="Agregar al carrito"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-5xl font-black text-[#2b214c]">{product.name}</h1>
            <div className="mt-4 flex flex-wrap products-center gap-3">
              <span className="px-3 py-1 rounded-full bg-black text-white text-xs">🗓 {product.release_date}</span>
              <span className="px-3 py-1 rounded-full bg-[#ff5252]/10 text-[#ff5252] text-xs">★ {product.vote_average}</span>
            </div>
            <p className="mt-6 text-black/80 leading-7">{product.overview}</p>
            <div className="mt-10">
              <Link href="/" className="px-6 py-2 rounded-xl bg-black text-white">Volver al inicio</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
