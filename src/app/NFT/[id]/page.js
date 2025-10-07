import NFTContainer from "@/components/NFTContainer"
import React from "react"

const NFTPage = async ({ params }) => {
  const { id } = await params
  return <NFTContainer _id = {id} />
}

export default NFTPage