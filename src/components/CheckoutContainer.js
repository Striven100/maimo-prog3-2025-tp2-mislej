import React from 'react'
import { useShopContext } from '@/contexts/ShopContext'

export const CheckoutContainer = () => {

    const {cart} = useShopContext();

  return (
    <div>{ cart.map((Carrito) => (
        <div>
            <h3>{Carrito.name}</h3>
        </div>
    ) ) }
    </div>
  )
}

export default CheckoutContainer