import NFTContainer from "@/components/NFTContainer"

const NFT = async ({params}) => {
    const {_id} = await params


    return (
    <NFTContainer _id={_id} />
    )
}

export default NFT