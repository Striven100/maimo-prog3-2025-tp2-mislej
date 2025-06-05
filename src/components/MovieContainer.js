'use client'

import {useState, useEffect} from 'react'
import parsedData from "@/data/movies"
import axios from 'axios'
import Link from 'next/link'

const MovieContainer = ({id}) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{

    const getData = async () => {
      setLoading(true)
      try {
      const response = await axios.get(`https://dummyjson.com/movies/${id}`)
      const responseData = response.data
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
    <div className="movie_container">
      {!loading &&
      <div>
      <h1>{data.name}</h1>
      <img src={data.image} width={300} height={300} alt={data.name}></img>
      <p><strong>Tiempo de preparación:</strong> {data.prepTimeMinutes} min</p>
      <p><strong>Tiempo de cocción:</strong> {data.cookTimeMinutes} min</p>
      <p><strong>Ingredientes:</strong></p>
      <ul>{data.ingredients.map(ing => `${ing}`).join('')}</ul>
      <p><strong>Instrucciones:</strong></p>
      <ol>{data.instructions.map(inst => `${inst}`).join('')}</ol>
      <Link className="volver" href='/'>Volver</Link>
      </div>
      }

      {loading && "Loading..."}

      {error && "HUBO UN ERROR"}

    </div>
  );
}

export default MovieContainer;