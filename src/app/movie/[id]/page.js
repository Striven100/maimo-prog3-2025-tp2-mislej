import NFTContainer from "@/components/NFTContainer"

const NFT = async ({params}) => {
    const {id} = await params


    return (
    <NFTContainer id={id} />
    )
}

export default NFT