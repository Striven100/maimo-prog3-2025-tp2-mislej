import Link from 'next/link'

export default function Name({ name, _id }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="font-bold text-black/90 truncate">{name}</h3>
      <Link href={`/NFT/${_id}`} className="px-3 py-1.5 rounded-xl bg-[#6f58b7] text-white text-sm hover:bg-[#5a469c]">Ver más</Link>
    </div>
  )
}
