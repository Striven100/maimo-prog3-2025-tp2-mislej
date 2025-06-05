'use client'

import {useState, useEffect} from 'react'
import MovieCard from "./MovieCard"
//import parsedData from "@/data/movies"
//import axios from 'axios'

const MoviesGrid = () => {

  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{

    const getData = async () => {
      setLoading(true)
      try {
      const response = await axios.get('https://dummyjson.com/movies')
      const responseData = response.data.movies
      setData(responseData)
      setLoading(false)
      } catch (error) {
        console.log('MI ERROR', error);
        setError(true)
      };
    }

    getData()
  }, [])

  return (
    <div className="movies_grid">
      {!loading &&
      data.map((movie) => (
        <MovieCard key={movie.id} name={movie.name} image={movie.image} id={movie.id} />
      ))}
      {loading && "Loading..."}

      {error && "HUBO UN ERROR"}

    </div>
  );
}

export default MoviesGrid