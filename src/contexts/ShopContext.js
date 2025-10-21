'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ShopContext = createContext(null)

export function ShopProvider({ children }) {
  const [Carrito, setCarrito] = useState([])
    const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('carrito')
      if (raw) setCarrito(JSON.parse(raw))
    } catch {}
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem('carrito', JSON.stringify(Carrito))
    } catch {}
  }, [Carrito])

  const normalizarPath = (path) => {
    if (!path) return ''
    return path.startsWith('/assets/') ? path.replace('/assets/', '') : path
  }

  const agregarAlCarrito = (name, backdrop_path, _id) => {
    const bp = normalizarPath(backdrop_path)
    setCarrito(prev => {
      const i = prev.findIndex(p => p._id === _id)
      if (i === -1) {
        return [...prev, { _id, name, backdrop_path: bp, cantidad: 1 }]
      }
      const next = [...prev]
      next[i] = { ...next[i], cantidad: next[i].cantidad + 1 }
      return next
    })
  }

  const restarDelCarrito = (_id) => {
    setCarrito(prev => {
      const i = prev.findIndex(p => p._id === _id)
      if (i === -1) return prev
      const item = prev[i]
      if ((item.cantidad ?? 1) <= 1) {
        return prev.filter(p => p._id !== _id)
      }
      const next = [...prev]
      next[i] = { ...item, cantidad: item.cantidad - 1 }
      return next
    })
  }

  const eliminarDelCarrito = (_id) =>
    setCarrito(prev => prev.filter(p => p._id !== _id))

  const limpiarCarrito = () => setCarrito([])

    const handleAddToCart = (product) => {
    let productToAdd = {};
    const findProduct = cart.find(
      (productInCart) => productInCart._id === product._id
    );
    if (findProduct) {
      productToAdd = { ...findProduct, qty: findProduct.qty + product.qty };
    } else {
      productToAdd = product;
    }

    const filteredCart = cart.filter(
      (productInCart) => productInCart._id !== product._id
    );
    setCart([...filteredCart, productToAdd]);
  };

  const CarritoQty = () =>
    Carrito.reduce((acc, it) => acc + (it.cantidad ?? 1), 0)

    const cartTotal = cart.reduce(
    (acc, product) => acc + product.qty * product.price,0);

  const addOrder = async (userValues) => {
    const reducedCart = cart.map((product) => {
      const prod = {
        name: product.name,
        _id: product._id,
        qty: product.qty,
      };

      return prod;
    });

    const orderValues = {
      user: userValues,
      products: reducedCart,
      total: cartTotal
    };
    console.log('my order is', orderValues);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        orderValues
      );
    

      return true



    } catch (error) {
      console.log('error', error);

      return false
    }
  };

  const value = useMemo(() => ({
    Carrito,
    agregarAlCarrito,
    restarDelCarrito,
    eliminarDelCarrito,
    limpiarCarrito,
    handleAddToCart,
    CarritoQty,
    addOrder
  }), [Carrito])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export const useShopContext = () => useContext(ShopContext)
