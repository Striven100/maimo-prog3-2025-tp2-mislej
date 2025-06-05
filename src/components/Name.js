import Link from "next/link";

const Name = ({ name, id }) => {
  return (
    <div className="movie_name">
      <h3>{name}</h3>
      <Link href={`movie/${id}`} className="ver_mas">Ver más</Link>
    </div>
  );
};

export default Name;