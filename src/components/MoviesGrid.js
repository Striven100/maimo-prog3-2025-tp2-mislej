import Image from 'next/image'
import Link from "next/link";
import { useAppContext } from '@/contexts/AppContext'

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

export default function MoviesGrid({ movies, id }) {
  const { favorites, handleAddToFavorites } = useAppContext();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map(movie => {
        const isFavorite = favorites.some(f => f.id === movie.id);
        return (
          <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
            <Image
              src={`${IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className="object-cover w-full h-72"
            />
            <div className="p-4 flex flex-col">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white truncate">{movie.title}</h3>
                <button
                  onClick={() => handleAddToFavorites(movie.title, movie.poster_path, movie.id)}
                  aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  className={`p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400
                    ${isFavorite
                      ? 'bg-yellow-500 text-black hover:bg-yellow-600 shadow-md'
                      : 'bg-transparent text-gray-400 hover:bg-gray-700'}
                  `}
                >
                  {isFavorite ? '★' : '☆'}
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2">{movie.release_date}</p>
              <Link href={`movie/${movie.id}`} className="mt-2 inline-block px-3 py-1 bg-yellow-500 text-black rounded-md font-medium hover:bg-yellow-600 transition-colors">
                Ver más
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}