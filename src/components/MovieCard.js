import Image from 'next/image';
import Name from './Name';

const MovieCard = ({ image, name, id }) => {
  return (
    <div className="movie_card">
      <Image src={image} width={300} height={300} alt={name} />
      <Name name={name} id={id} />
    </div>
  );
};

export default MovieCard;