'use client'
import { useState } from 'react'
import axios from 'axios'
import { useShopContext } from '@/contexts/ShopContext'

export default function CarritoContainer() {
  const { Carrito } = useShopContext()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [msg, setMsg] = useState(null)
  const [error, setError] = useState(null)

  const items = (Carrito || []).map(p => {
    const price = typeof p.price === 'string' ? p.price : p.price
    const qty = typeof p.cantidad === 'number' ? p.cantidad : p.qty
    return {
      _id: p._id,
      productId: p._id,
      name: p.name,
      price: price,
      qty: qty,
      quantity: qty
    }
  })

  const { addOrder } = useShopContext()

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
    const success = await addOrder({ username: name, email })
    if (success) {
      setMsg('¡Pedido enviado con éxito!')
    } else {
      setError('Error al enviar el pedido')
    }
  } catch (err) {
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
          {(Carrito || []).map(p => {
            const qty = typeof p.cantidad === 'number' ? p.cantidad : p.qty
            const price = typeof p.price
            return (
              <div key={p._id} className="flex items-center justify-between text-sm">
                <span>{p.name} × {qty}</span>
                <span>{price}</span>
              </div>
            )
          })}
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
