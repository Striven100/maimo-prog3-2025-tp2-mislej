import Image from 'next/image'
import Link from "next/link";
import { useAppContext } from '@/contexts/AppContext'

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

export default function NFTsGrid({ NFTs, id }) {
  const { favorites, handleAddToFavorites } = useAppContext();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {NFTs.map(NFT => {
        const isFavorite = favorites.some(f => f.id === NFT.id);
        return (
          <div key={NFT.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
            <Image
              src={`${IMAGE_BASE}${NFT.poster_path}`}
              alt={NFT.name}
              width={500}
              height={750}
              className="object-cover w-full h-72"
            />
            <div className="p-4 flex flex-col">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white truncate">{NFT.name}</h3>
                <button
                  onClick={() => handleAddToFavorites(NFT.name, NFT.poster_path, NFT.id)}
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
              <p className="text-sm text-gray-400 mt-2">{NFT.release_date}</p>
              <Link href={`NFT/${NFT.id}`} className="mt-2 inline-block px-3 py-1 bg-yellow-500 text-black rounded-md font-medium hover:bg-yellow-600 transition-colors">
                Ver más
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}