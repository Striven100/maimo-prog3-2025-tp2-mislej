import NFTContainer from "@/components/NFTContainer"

export default function NFTPage({ params }) {
  const { _id } = params
  return <NFTContainer _id={_id} />
}
