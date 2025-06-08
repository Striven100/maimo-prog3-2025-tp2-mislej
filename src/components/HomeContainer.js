'use client'
import { useState, useEffect } from 'react'
import Hero from './Hero'
import MoviesGrid from './MoviesGrid'
import axios from 'axios'

export default function HomeContainer() {
  const API_URL = 'https://api.themoviedb.org/3/trending/movie/day?api_key=8d155a452063365b70d7e38e2609b662'
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const response = await axios.get(API_URL)
      setMovies(response.data.results)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>
  }

  return (
    <main className="flex-auto">
      <Hero movies={movies} />
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Películas Tendencia</h2>
        <MoviesGrid movies={movies} />
      </section>
    </main>
  )
}