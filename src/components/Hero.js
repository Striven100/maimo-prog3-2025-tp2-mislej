'use client'
import Image from 'next/image'
import {useState} from 'react'

const Hero = ({movies}) => {
    const random = Math.floor(Math.random() * 20);
    const [featureMovie, setFeatureMovie] = useState(movies[random])
    const IMAGE_BASE = `https://image.tmdb.org/t/p/original`;

    const handleMovieClick= (moviePosition) => {
        setFeatureMovie(movies[moviePosition])
    }
    const firstMovies = movies.slice(0, 7);
  return (
    <section style={{backgroundImage: `url(${IMAGE_BASE}/${featureMovie.backdrop_path})`, }} className={`w-full h-[600px] bg-cover bg-no-repeat bg-center`}>
        <div className='content h-full flex flex-col justify-center items-start px-[50px] text-white bg-black/50'>
            <h2 className='text-5xl mb-6'>{featureMovie.title}</h2>
            <p className='max-w-[500px]'>{featureMovie.overview}</p>
        </div>
        <div className='movies w-full flex flex-wrap justify-start items-center'>
            {firstMovies.map((movie, index)=>{return(
             <div key={movie.id}>
                <div className='bg-gray-400 p-2' onMouseEnter={()=>handleMovieClick(index)}>
                    <Image alt={movie.tittle} src={`${IMAGE_BASE}${movie.poster_path}`} width={200} height={100} />
                </div>
                <h3 className='bg-gray-400'>{movie.title}</h3>
             </div>
            );})}
        </div>
    </section>
  )
}

export default Hero