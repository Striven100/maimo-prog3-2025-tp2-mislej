'use client'
import { useState, useEffect } from 'react'
import Hero from './Hero'
import NFTsGrid from './NFTsGrid'
import axios from 'axios'

export default function HomeContainer( id ) {
  const API_URL = 'https://api.theNFTdb.org/3/trending/NFT/day?api_key=8d155a452063365b70d7e38e2609b662'
  const [NFTs, setNFTs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const response = await axios.get(API_URL)
      setNFTs(response.data.results)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>
  }

  return (
    <main className="flex-auto">
      <Hero NFTs={NFTs} />
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Películas Tendencia</h2>
        <NFTsGrid NFTs={NFTs} id={id} />
      </section>
    </main>
  )
}