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
    return (Carrito || []).map(p => ({
      productId: p._id,
      name: p.name,
      price: typeof p.price === 'number'
        ? p.price
        : Number(String(p.price).replace(/[^\d.]/g, '')) || 0,
      quantity: p.cantidad || p.quantity || 1,
    }))
  }, [Carrito])

  const total = useMemo(() => {
    return items.reduce((acc, it) => acc + it.price * it.quantity, 0)
  }, [items])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMsg(null)

    if (!name.trim() || !email.trim()) {
      setError('Completá nombre y mail.')
      return
    }

    if (items.length === 0) {
      setError('Tu carrito está vacío.')
      return
    }

    const payload = {
  name,
  email,
  items: (Carrito || []).map(p => ({
    productId: String(p._id || p.id || '').trim(),
    name: String(p.name || '').trim(),
    price: typeof p.price === 'number'
      ? p.price
      : Number(String(p.price).replace(/[^\d.]/g, '')) || 0, // "0.08 ETH" -> 0.08
    quantity: p.cantidad || p.quantity || 1,
  })),
};
await axios.post('https://maimo-prog3-2025-tp4-5-mislej.vercel.app/routes', payload);


    try {
      setSending(true)
      const { data } = await axios.post('https://maimo-prog3-2025-tp4-5-mislej.vercel.app/routes',{ name, email, items });

      if (data?.ok) {
        setMsg('¡Pedido enviado con éxito!')
      } else {
        setError('Error al enviar el pedido.')
      }
    } catch (err) {
      console.error(err)
      setError('No se pudo conectar con la API.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Carrito</h1>

      <div className="rounded-lg border p-4 mb-6 bg-white/80">
        {items.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((it, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{it.name} × {it.quantity}</span>
                <span>${(it.price * it.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="border-t mt-3 pt-3 flex justify-between font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-lg border p-4 bg-white/90 space-y-4">
        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Mail</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="tu@email.com"
          />
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
