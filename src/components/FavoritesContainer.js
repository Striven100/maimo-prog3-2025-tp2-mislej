"use client";

import { useAppContext } from "@/contexts/AppContext";
import Image from "next/image";
import Link from "next/link";

const FavoritesContainer = () => {
  const { favorites } = useAppContext();
  const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

  if (favorites.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10">
        Aún no tienes películas en favoritos.
      </p>
    );
  }

  return (
    <section className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Tus Favoritos</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {favorites.map((NFT) => (
          <div
            key={NFT.id}
            className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-md transform transition duration-200 hover:shadow-lg hover:scale-105"
          >
            <Image
              src={`${IMAGE_BASE}/${NFT.image}`}
              alt={NFT.name}
              width={500}
              height={750}
              className="object-cover w-full h-72"
            />

            
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

          
            <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <h3 className="text-white text-lg font-semibold truncate">
                {NFT.name}
              </h3>
              <Link
                href={`NFT/${NFT.id}`}
                className="mt-2 inline-block px-3 py-1 bg-yellow-500 text-black rounded-md font-medium hover:bg-yellow-600 transition-colors"
              >
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FavoritesContainer;