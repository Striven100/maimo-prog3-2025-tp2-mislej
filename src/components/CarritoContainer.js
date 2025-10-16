'use client'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { useShopContext } from '@/contexts/ShopContext'

export default function CarritoContainer() {
  const { Carrito, agregarAlCarrito, restarDelCarrito, eliminarDelCarrito, CarritoQty } = useShopContext()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [card, setCard] = useState('')
  const [showModal, setShowModal] = useState(false)

  const hasItems = Carrito?.length > 0
  const isValid =
    hasItems &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    /^[\d\s-]{12,19}$/.test(card.trim())

  const handleBuy = (e) => {
    e.preventDefault()
    if (!isValid) return
    setShowModal(true)
  }

  if (!hasItems) {
    return (
      <section className="min-h-[50vh] grid place-items-center bg-[#e2d6ff]">
        <div className="text-center">
          <p className="text-black/70">Aún no tienes NFTs en tu Carrito.</p>
          <Link href="/#catalogo" className="mt-4 inline-block px-4 py-2 rounded-xl bg-black text-white">
            Explorar catálogo
          </Link>
        </div>
      </section>
    )
  }

  const totalUnidades = useMemo(() => CarritoQty(), [Carrito, CarritoQty])

  return (
    <section className="bg-[#e2d6ff] py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-black text-[#2b214c]">Tu Carrito</h2>
          <span className="text-sm text-black/70">Total de unidades: {totalUnidades}</span>
        </div>

        <div className="mb-8 overflow-x-auto rounded-2xl border border-black/10 bg-white/80">
          <table className="w-full text-sm">
            <thead className="bg-[#f1ecff] text-left text-xs uppercase text-[#2b214c]/80">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Cantidad</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Carrito.map(n => (
                <tr key={n._id} className="border-t border-black/10">
                  <td className="px-4 py-3 align-middle">
                    <div className="font-semibold text-black/90">{n.name}</div>
                    <div className="text-xs text-black/60">ID: {n._id}</div>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => restarDelCarrito(n._id)}
                        className="px-3 py-1.5 rounded-xl border border-black/20 bg-white hover:bg-black/5"
                        aria-label="Restar del carrito"
                      >–</button>

                      <span className="w-10 text-center font-semibold">{n.cantidad}</span>

                      <button
                        onClick={() => agregarAlCarrito(n.name, n.backdrop_path, n._id)}
                        className="px-3 py-1.5 rounded-xl bg-black text-white hover:opacity-90"
                        aria-label="Agregar al carrito"
                      >+</button>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/NFT/${n._id}`}
                        className="px-3 py-1.5 rounded-xl bg-[#6f58b7] text-white text-xs hover:bg-[#5a469c]"
                      >
                        Ver detalle
                      </Link>
                      <button
                        onClick={() => eliminarDelCarrito(n._id)}
                        className="px-3 py-1.5 rounded-xl bg-[#ff5252] text-white text-xs hover:opacity-90"
                      >
                        Quitar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form onSubmit={handleBuy} className="max-w-3xl mx-auto rounded-2xl border border-black/10 bg-white/80 p-6">
          <h3 className="mb-4 text-xl font-extrabold text-[#2b214c]">Datos para completar la compra</h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#2b214c]">Nombre</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full rounded-xl border border-black/20 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#2b214c]"
                placeholder="Ej: Ana"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#2b214c]">Apellido</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full rounded-xl border border-black/20 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#2b214c]"
                placeholder="Ej: Pérez"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-[#2b214c]">N° de tarjeta</label>
              <input
                value={card}
                onChange={(e) => setCard(e.target.value)}
                required
                inputMode="numeric"
                maxLength={19}
                className="w-full rounded-xl border border-black/20 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#2b214c]"
                placeholder="#### #### #### ####"
              />
              <p className="mt-1 text-xs text-black/60">Validación básica (no procesa el pago).</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <Link href="/#catalogo" className="px-4 py-2 rounded-xl border border-black/20 bg-white hover:bg-black/5">
              Seguir comprando
            </Link>
            <button
              type="submit"
              disabled={!isValid}
              className="px-5 py-2 rounded-xl bg-black text-white hover:opacity-90 disabled:opacity-50"
              title={isValid ? 'Comprar' : 'Completá los campos para continuar'}
            >
              Comprar
            </button>
          </div>
        </form>

        {showModal && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-lg font-semibold text-[#2b214c]">Compra realizada</h4>
                <button onClick={() => setShowModal(false)} className="rounded-md p-1 text-black/60 hover:bg-black/5">✕</button>
              </div>
              <p className="text-black/80">¡Gracias! Tu compra se realizó con éxito</p>
              <div className="mt-4 text-right">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
