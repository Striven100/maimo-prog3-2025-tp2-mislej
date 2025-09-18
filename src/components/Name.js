import Link from "next/link";

const Name = ({ name, id }) => {
  return (
    <div className="NFT_name">
      <h3>{name}</h3>
      <Link href={`NFT/${id}`} className="ver_mas">Ver más</Link>
    </div>
  );
};

export default Name;