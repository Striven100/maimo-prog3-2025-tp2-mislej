'use client'
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import axios from 'axios'

const ShopContext = createContext(null)

export function ShopProvider({ children }) {
  const [Carrito, setCarrito] = useState([])

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

  const normalizarPath = useCallback((path) => {
    if (!path) return ''
    return path.startsWith('/assets/') ? path.replace('/assets/', '') : path
  }, [])

  const agregarAlCarrito = useCallback((name, backdrop_path, _id) => {
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
  }, [normalizarPath])

  const restarDelCarrito = useCallback((_id) => {
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
  }, [])

  const eliminarDelCarrito = useCallback((_id) =>
    setCarrito(prev => prev.filter(p => p._id !== _id)), [])

  const limpiarCarrito = useCallback(() => setCarrito([]), [])

  const handleAddToCart = useCallback((product) => {
    setCarrito(prev => {
      const i = prev.findIndex(p => p._id === product._id)
      if (i === -1) {
        return [...prev, { ...product, cantidad: product.qty || 1 }]
      }
      const next = [...prev]
      next[i] = { ...next[i], cantidad: next[i].cantidad + (product.qty || 1) }
      return next
    })
  }, [])

  const CarritoQty = useCallback(() =>
    Carrito.reduce((acc, it) => acc + (it.cantidad ?? 1), 0), [Carrito])

  const cartTotal = useMemo(() => Carrito.reduce(
    (acc, product) => acc + (product.cantidad || 1) * (product.price || 0), 0), [Carrito])

  const addOrder = useCallback(async (userValues) => {
    const reducedItems = Carrito.map((product) => ({
      productId: product._id,
      name: product.name,
      price: String(product.price || 0),
      quantity: product.cantidad || 1,
    }))

    const orderValues = {
      name: userValues.username || '',
      email: userValues.email || '',
      items: reducedItems,
      total: String(cartTotal)
    }
    console.log('my order is', orderValues)

    try {
      const response = await axios.post(
        `http://localhost:4000/routes`,
       orderValues
      )
      return true
    } catch (error) {
      console.log('error', error)
      return false
    }
  }, [Carrito, cartTotal])

  const value = useMemo(() => ({
    Carrito,
    agregarAlCarrito,
    restarDelCarrito,
    eliminarDelCarrito,
    limpiarCarrito,
    handleAddToCart,
    CarritoQty,
    addOrder
  }), [Carrito, agregarAlCarrito, restarDelCarrito, eliminarDelCarrito, limpiarCarrito, handleAddToCart, CarritoQty, addOrder])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export const useShopContext = () => useContext(ShopContext)