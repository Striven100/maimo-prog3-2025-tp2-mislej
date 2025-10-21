'use client'
import { useState, useMemo } from 'react'
import axios from 'axios'
import { useShopContext } from '@/contexts/ShopContext'

export default function CarritoContainer() {
  const { Carrito } = useShopContext()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [msg, setMsg] = useState(null)
  const [error, setError] = useState(null)

  const items = useMemo(() => {
    return (Carrito || []).map(p => {
      const priceNum = typeof p.price === 'number' ? p.price : parseFloat(String(p.price).replace(/[^\d.]/g, '')) || 0
      const qtyNum = p.qty > 0 ? p.qty : 1
      return {
        _id: p._id,
        productId: p._id,
        name: p.name,
        price: priceNum,
        qty: qtyNum,
        quantity: qtyNum
      }
    })
  }, [Carrito])

  const total = useMemo(() => {
    return items.reduce((acc, it) => acc + it.price * (it.qty ?? it.quantity ?? 1), 0)
  }, [items])

  async function onSubmit(e) {
    e.preventDefault()
    setMsg(null)
    setError(null)
    if (!name || !email) {
      setError('Completa nombre y email')
      return
    }
    if (items.length === 0) {
      setError('El carrito está vacío')
      return
    }
    try {
      setSending(true)
      const API = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
      const { data } = await axios.post(`${API}/routes`, { name, email, items, total })
      if (data?.ok) {
        setMsg('¡Pedido enviado con éxito!')
      } else {
        setError('Error al enviar el pedido')
      }
    } catch {
      setError('No se pudo conectar con la API')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">Checkout</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        <div className="rounded border p-3 space-y-2">
          {(Carrito || []).map(p => (
            <div key={p._id} className="flex items-center justify-between text-sm">
              <span>{p.name} × {p.qty}</span>
              <span>
                {(typeof p.price === 'number' ? p.price : parseFloat(String(p.price).replace(/[^\d.]/g, '')) || 0).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between font-medium">
            <span>Total</span>
            <span>{total.toFixed(2)}</span>
          </div>
        </div>
        <button
          type="submit"
          disabled={sending}
          className="px-4 py-2 rounded bg-black text-white w-full disabled:opacity-50"
        >
          {sending ? 'Enviando…' : 'Confirmar compra'}
        </button>
        {msg && <p className="text-green-600">{msg}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  )
}
