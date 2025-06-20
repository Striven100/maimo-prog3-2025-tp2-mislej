'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useAppContext } from "@/contexts/AppContext";
import MoviesGrid from './MoviesGrid';

export default function Hero({ movies }) {
  const sorted = [...movies].sort((a, b) => b.popularity - a.popularity)
  const [featureMovie, setFeatureMovie] = useState(sorted[0])
  const IMAGE_BASE = 'https://image.tmdb.org/t/p/original'
  const {favorites} = useAppContext()

  const handleMovieClick= (moviePosition) => {
    setFeaturedMovie(movies[moviePosition])
  }

  return (
    <section className="relative w-full h-screen bg-black">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <Image
        src={`${IMAGE_BASE}${featureMovie.backdrop_path}`}
        alt={featureMovie.title}
        fill
        className="object-cover"
      />
      <div className="relative z-20 max-w-4xl mx-auto text-white py-24 px-6">
        <h1 className="text-6xl font-bold mb-4">{featureMovie.title}</h1>
        <p className="text-lg max-w-2xl mb-6">{featureMovie.overview}</p>
      </div>
      <div className="absolute z-20 inset-x-0 bottom-6 overflow-x-auto px-6 pb-6">
        <div className="flex space-x-4">
          {sorted.slice(0, 20).map(movie => (
            <div
              key={movie.id}
              onMouseEnter={() => setFeatureMovie(movie)}
              className="flex-shrink-0 w-40 cursor-pointer group"
            >
              <Image
                alt={movie.title}
                src={`${IMAGE_BASE}${movie.poster_path}`}
                width={160}
                height={240}
                className="rounded-lg shadow-lg group-hover:scale-105 transition-transform"
              />
              <p className="mt-2 flex items-center text-sm font-medium text-white truncate">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}