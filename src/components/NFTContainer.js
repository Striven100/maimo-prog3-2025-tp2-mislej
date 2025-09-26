"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useAppContext } from '@/contexts/AppContext'

export default function NFTContainer({ _id }) {
  const { favorites, handleAddToFavorites } = useAppContext();
  const [NFT, setNFT] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getNFT = async () => {
      setLoading(false)

    }
    getNFT()
  }, [_id])

  const isFavorite = NFT ? favorites.some(f => f._id === NFT._id) : false

  return (
    <div>
      {loading && <p className="text-white">Loading...</p>}
      {!loading && (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
          <div className="relative w-full h-96 overflow-hidden">
            <Image
              src={`/assets/${NFT.backdrop_path}`}
              alt={NFT.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col md:flex-row items-start gap-6 mt-15 ml-20 mb-10">
            <div className="md:w-1/3 flex-shrink-0">
              <Image
                src={`/assets/${NFT.backdrop_path}`}
                alt={NFT.name}
                width={58}
                height={58}
                className="rounded-lg object-cover [image-rendering:pixelated]"
              />
            </div>
            <div className="md:flex-1 space-y-6">
              <div className="flex items-center gap-4">
                <h1 className="text-4xl font-bold truncate">{NFT.name}</h1>
                <button
                  onClick={() => handleAddToFavorites(NFT.name, `/assets/${NFT.backdrop_path}`, NFT._id)}
                  aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  className={`p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 ${
                    isFavorite
                      ? 'bg-yellow-500 text-black hover:bg-yellow-600 shadow-md'
                      : 'bg-transparent text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {isFavorite ? '✅' : '🛒'}
                </button>
              </div>
              <p className="text-gray-300">{NFT.tagline}</p>
              <p className="text-lg leading-relaxed">{NFT.overview}</p>
              <div className="flex flex-wrap gap-4">
                <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">🗓️ {NFT.release_date}</span>
                <span className="px-3 py-1 bg-green-600 rounded-full text-sm">⭐ {NFT.vote_average}</span>
                {NFT.genres.map(g => (
                  <span key={g._id} className="px-3 py-1 bg-gray-700 rounded-full text-sm">{g.name}</span>
                ))}
              </div>
              <Link
                href="/"
                className="inline-block mt-8 px-6 py-2 bg-yellow-500 rounded-lg font-medium text-black hover:bg-yellow-600 transition-colors"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
