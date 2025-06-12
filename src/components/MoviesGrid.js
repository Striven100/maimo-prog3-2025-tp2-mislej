import Image from 'next/image'
import Link from "next/link";

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

export default function MoviesGrid({ movies, id }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map(movie => (
        <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
          <Image
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="object-cover w-full h-72"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white truncate">{movie.title}</h3>
            <p className="text-sm text-gray-400">{movie.release_date}</p>
            <Link href={`movie/${id}`} className="inline-block mt-6 px-6 py-2 bg-yellow-500 rounded-lg font-medium text-black hover:bg-yellow-600 transition-colors">Ver más</Link>
          </div>
        </div>
      ))}
    </div>
  )
}
