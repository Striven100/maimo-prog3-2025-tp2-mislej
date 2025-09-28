'use client'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Hero from './Hero'
import NFTsGrid from './NFTsGrid'

export default function HomeContainer() {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function run() {
      try {
        setLoading(true)
        setError(null)
        const { data } = await axios.get('http://localhost:4000/products')
        const items = Array.isArray(data?.products) ? data.products : []
        const normalized = items.map(p => ({
          ...p,
          _id: p._id,
          backdrop_path: p.backdrop_path,
          popularity: p.vote_count ?? 0
        }))
        if (mounted) setNfts(normalized)
      } catch (e) {
        if (mounted) setError('No pudimos cargar el catálogo.')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    run()
    return () => { mounted = false }
  }, [])

  const content = useMemo(() => ({ ok: !loading && !error }), [loading, error])

  if (loading) return <div className="min-h-[60vh] grid place-items-center bg-[#c9b3ea] text-black font-semibold">Cargando…</div>
  if (error) return <div className="min-h-[60vh] grid place-items-center bg-[#c9b3ea] text-black">{error}</div>

  return (
    <main className="bg-[#e2d6ff]">
      {content.ok && <Hero NFTs={nfts} />}
      <section id="catalogo" className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-black text-[#2b214c]">Catálogo</h2>
          <a href="#top" className="text-sm px-3 py-1.5 rounded-xl bg-black text-white">Arriba</a>
        </div>
        <div className="mt-8">
          <NFTsGrid NFTs={nfts} />
        </div>
      </section>
     <section id="sobre" className="bg-[#9e85d6] text-black">
  <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid md:grid-cols-2 gap-10">
    {/* Columna de texto */}
    <div className="space-y-4">
      <h3 className="text-2xl font-black">Sobre el Autor</h3>
      <p className="text-black/80">
        Hola, soy Tobias Mislej. Estudio Tecnología Multimedial en la Universidad Maimónides y me especializo en diseño industrial, multimedia y proyectos digitales.
      </p>
      <p className="text-black/80">
        Me apasionan los juegos de rol, el arte interactivo y el desarrollo web. Esta página es una muestra de mi trabajo integrando estética retro con funcionalidad moderna.
      </p>
    </div>

    {/* Columna de sprites */}
    <div className="grid grid-cols-4 gap-3 place-items-center">
      <img src="/assets/crow.png" alt="Cuervo" className="w-12 h-12 [image-rendering:pixelated]" />
      <img src="/assets/bandit.png" alt="Bandido" className="w-12 h-12 [image-rendering:pixelated]" />
      <img src="/assets/barbarian.png" alt="Bárbaro" className="w-12 h-12 [image-rendering:pixelated]" />
      <img src="/assets/bat.png" alt="Murciélago" className="w-12 h-12 [image-rendering:pixelated]" />
      <img src="/assets/bear.png" alt="Oso" className="w-12 h-12 [image-rendering:pixelated]" />
      <img src="/assets/black_widow.png" alt="Araña" className="w-12 h-12 [image-rendering:pixelated]" />
      <img src="/assets/blue_snake.png" alt="Serpiente" className="w-12 h-12 [image-rendering:pixelated]" />
      <img src="/assets/draco_mage.png" alt="Mago dracónico" className="w-12 h-12 [image-rendering:pixelated]" />
      <img src="/assets/fallen_mage.png" alt="Mago caído" className="w-12 h-12 [image-rendering:pixelated]" />
    </div>
  </div>
</section>

    </main>
  )
}
