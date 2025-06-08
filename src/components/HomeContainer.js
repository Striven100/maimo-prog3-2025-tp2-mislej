'use client'

import {useState, useEffect} from 'react'
import Hero from './Hero'
import axios from 'axios'

const HomeContainer = () => {

  const API_URL = 'https://api.themoviedb.org/3/trending/movie/day?api_key=8d155a452063365b70d7e38e2609b662'

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const getMovies = async () => {
      setLoading(true)
      try {
        const response = await axios.get(API_URL)
        const moviesData = response.data.results
        setMovies(moviesData)
        setLoading(false)
      }catch (error){
      }
    }
    getMovies();
  }, [])

  return (
    <>
    {!loading && <Hero movies={movies} />}
    {loading && 'Loading...'}
    </>
  )
}

export default HomeContainer;