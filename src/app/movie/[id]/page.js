import MovieContainer from "@/components/MovieContainer"

const Movie = async ({params}) => {
    const {id} = await params


    return (
    <MovieContainer id={id} />
    )
}

export default Movie