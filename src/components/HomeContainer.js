'use client'
import { useState, useEffect } from 'react'
import Hero from './Hero'
import NFTsGrid from './NFTsGrid'
import axios from 'axios'

export default function HomeContainer( id ) {
  const API_URL = 'http://localhost:4000/products'
  const [NFTs, setNFTs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const response = await axios.get(API_URL)
      setNFTs(response.data.products)
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