'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useAppContext } from "@/contexts/AppContext";
import NFTsGrid from './NFTsGrid';

export default function Hero({ NFTs }) {
  const sorted = [...NFTs].sort((a, b) => b.popularity - a.popularity)
  const [featureNFT, setFeatureNFT] = useState(sorted[0])
  const IMAGE_BASE = 'https://image.tmdb.org/t/p/original'
  const {favorites} = useAppContext()

  const handleNFTClick= (NFTPosition) => {
    setFeatureNFT(NFTs[NFTPosition])
  }

  return (
    <section className="relative w-full h-screen bg-black">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <Image
        src="/assets/unnamed.png"
        alt={featureNFT.name}
        fill
        className="object-cover"
      />
      <div className="relative z-20 max-w-4xl mx-auto text-white py-24 px-6">
        <h1 className="text-6xl font-bold mb-4">{featureNFT.name}</h1>
        <p className="text-lg max-w-2xl mb-6">{featureNFT.overview}</p>
      </div>
      <div className="absolute z-20 inset-x-0 bottom-6 overflow-x-auto px-6 pb-6">
        <div className="flex space-x-4">
        </div>
      </div>
    </section>
  )
}