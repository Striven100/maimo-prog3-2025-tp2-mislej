import NFTContainer from "@/components/NFTContainer"
import React from "react"

const NFTPage = async ({ params }) => {
  const { _id } = await params
  return <NFTContainer _id = {_id} />
}

export default NFTPage