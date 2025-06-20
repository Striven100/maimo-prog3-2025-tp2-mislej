"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useAppContext } from '@/contexts/AppContext'

export default function MovieContainer({ id }) {
  const { favorites, handleAddToFavorites } = useAppContext();
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const API_KEY = '8d155a452063365b70d7e38e2609b662'

  useEffect(() => {
    const getMovie = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        )
        setMovie(response.data)
      } catch (err) {
        console.error('MI ERROR', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    getMovie()
  }, [id])

  const IMAGE_BASE = 'https://image.tmdb.org/t/p/original'
  const isFavorite = movie ? favorites.some(f => f.id === movie.id) : false

  return (
    <div>
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">HUBO UN ERROR</p>}
      {!loading && movie && (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
          <div className="relative w-full h-96 overflow-hidden">
            <Image
              src={`${IMAGE_BASE}${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col md:flex-row items-start gap-6 mt-15 ml-20 mb-10">
            <div className="md:w-1/3 flex-shrink-0">
              <Image
                src={`${IMAGE_BASE}${movie.poster_path}`}
                alt={`${movie.title} poster`}
                width={300}
                height={450}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="md:flex-1 space-y-6">
              <div className="flex items-center gap-4">
                <h1 className="text-4xl font-bold truncate">{movie.title}</h1>
                <button
                  onClick={() => handleAddToFavorites(movie.title, movie.poster_path, movie.id)}
                  aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  className={`p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 ${
                    isFavorite
                      ? 'bg-yellow-500 text-black hover:bg-yellow-600 shadow-md'
                      : 'bg-transparent text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {isFavorite ? '★' : '☆'}
                </button>
              </div>
              <p className="text-gray-300">{movie.tagline}</p>
              <p className="text-lg leading-relaxed">{movie.overview}</p>
              <div className="flex flex-wrap gap-4">
                <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">🗓️ {movie.release_date}</span>
                <span className="px-3 py-1 bg-green-600 rounded-full text-sm">⭐ {movie.vote_average}</span>
                {movie.genres.map(g => (
                  <span key={g.id} className="px-3 py-1 bg-gray-700 rounded-full text-sm">{g.name}</span>
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
