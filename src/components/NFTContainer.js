'use client'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useAppContext } from '@/contexts/AppContext'

export default function NFTContainer({ _id }) {
  const { Carrito, handleAddToCarrito } = useAppContext()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const { data } = await axios.get('http://localhost:4000/products')
        const list = Array.isArray(data?.products) ? data.products : []
        const found = list.find(p => String(p._id) === String(_id))
        if (!mounted) return
        if (!found) {
          setError('No encontramos ese NFT.')
        } else {
          setItem({
            ...found,
            name: found.name ?? 'Sin nombre',
            overview: found.overview ?? 'Sin descripción',
            release_date: found.release_date ?? '',
            vote_average: found.vote_average ?? 0,
            genres: Array.isArray(found.genres) ? found.genres : []
          })
        }
      } catch {
        if (mounted) setError('Hubo un error al cargar el NFT.')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [_id])

  const inCart = useMemo(() => (item ? Carrito.some(f => f._id === item._id) : false), [Carrito, item])

  if (loading) return <div className="min-h-[60vh] grid place-items-center bg-[#c9b3ea] text-black">Cargando…</div>
  if (error) return (
    <div className="min-h-[60vh] grid place-items-center bg-[#c9b3ea] text-black">
      <div className="text-center">
        <p className="mb-4">{error}</p>
        <Link href="/" className="px-4 py-2 rounded-xl bg-black text-white">Volver al inicio</Link>
      </div>
    </div>
  )


  return (
    <div className="min-h-screen bg-[#e2d6ff]">
      <div className="relative h-[38vh] md:h-[48vh]">
        <Image src={`/assets/${item.backdrop_path}`} alt={item.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#c9b3ea]/80 via-[#9e85d6]/60 to-[#e2d6ff]" />
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-24 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="rounded-2xl overflow-hidden border border-black/10 bg-white/70">
              <div className="relative aspect-[4/3]">
                <Image src={`/assets/${item.backdrop_path}`} alt={item.name} fill className="object-cover [image-rendering:pixelated]" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <button
                  onClick={() => handleAddToCarrito(item.name, `/assets/${item.backdrop_path}`, item._id)}
                  className={`px-4 py-2 rounded-xl font-semibold ${inCart ? 'bg-[#3cc37a] text-black' : 'bg-black text-white'} w-full`}
                >
                  {inCart ? 'Añadido' : 'Agregar al carrito'}
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-5xl font-black text-[#2b214c]">{item.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {item.release_date && <span className="px-3 py-1 rounded-full bg-black text-white text-xs">🗓 {item.release_date}</span>}
              <span className="px-3 py-1 rounded-full bg-[#ff5252]/10 text-[#ff5252] text-xs">★ {item.vote_average}</span>
              {item.genres.map(g => (
                <span key={g._id ?? g.name} className="px-3 py-1 rounded-full bg-[#6f58b7] text-white text-xs">{g.name}</span>
              ))}
            </div>
            <p className="mt-6 text-black/80 leading-7">{item.overview}</p>
            <div className="mt-10">
              <Link href="/" className="px-6 py-2 rounded-xl bg-black text-white">Volver al inicio</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
