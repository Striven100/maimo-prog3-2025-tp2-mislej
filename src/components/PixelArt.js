'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function PixelArt() {
  const palette = ['#000000', '#FF0000', '#00AAFF', '#00C853', '#FFEB3B', '#9C27B0', '#FF9800']

  const [cells, setCells] = useState(['','','','','','','','','','',
                                      '','','','','','','','','','',
                                      '','','','','','','','','','',
                                      '','','','','','','','','','',
                                      '','','','','','','','','','',
                                      '','','','','','','','','','',
                                      '','','','','','','','','','',
                                      '','','','','','','','','','',
                                      '','','','','','','','','','',
                                      '','','','','','','','','',''])
  const [currentColor, setCurrentColor] = useState(palette[0])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pixelart-10x10')
      if (saved) setCells(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('pixelart-10x10', JSON.stringify(cells))
    } catch {}
  }, [cells])

  function handleCellClick(idx) {
    setCells(prev => {
      const next = prev.slice()
      if (next[idx] === currentColor) {
        next[idx] = ''
      } else {
        next[idx] = currentColor
      }
      return next
    })
  }

  function resetGrid() {
    setCells(['','','','','','','','','','',
              '','','','','','','','','','',
              '','','','','','','','','','',
              '','','','','','','','','','',
              '','','','','','','','','','',
              '','','','','','','','','','',
              '','','','','','','','','','',
              '','','','','','','','','','',
              '','','','','','','','','','',
              '','','','','','','','','',''])
  }

  function serializeGrid() {
    return cells
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage(null)
    setError(null)

    if (!name) {
      setError('El nombre es obligatorio.')
      return
    }

    const payload = {
      name: name,
      pixelData: serializeGrid(),
      description: description
    }

    try {
      setSubmitting(true)
      await axios.post(`${API_URL}/products`, payload, {
        headers: { 'Content-Type': 'application/json' }
      })
      setMessage('¡Producto creado con éxito!')
      setName('')
      setDescription('')
    } catch (err) {
      setError('No se pudo publicar el NFT. Revisá la consola y el endpoint.')
    } finally {
      setSubmitting(false)
    }
  }

  const x = [1,2,3,4,5,6,7,8,9,10]
  const y = [1,2,3,4,5,6,7,8,9,10]

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">PixelArt 10×10</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm">Color:</span>
          <div className="flex items-center gap-2">
            {palette.map((c) => (
              <button
                key={c}
                onClick={() => setCurrentColor(c)}
                aria-label={`Seleccionar color ${c}`}
                className={`h-7 w-7 rounded-md ring-2 ${currentColor === c ? 'ring-black' : 'ring-transparent'}`}
                style={{ backgroundColor: c }}
              />
            ))}
            <button
              onClick={() => setCurrentColor('')}
              className={`h-7 w-16 rounded-md border px-2 text-sm ${currentColor === '' ? 'border-black' : 'border-gray-300'}`}
              aria-label="Borrador"
            >
              Borrar
            </button>
          </div>

          <button
            onClick={resetGrid}
            className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
          >
            Reiniciar
          </button>
        </div>
      </header>

      <section className="overflow-x-auto rounded-xl border">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(11, minmax(0, 2.5rem))' }}>
          <div className="bg-gray-100/70 p-2 text-center font-medium"></div>
          {x.map((n) => (
            <div key={`x-${n}`} className="bg-gray-100/70 p-2 text-center text-sm font-medium">{n}</div>
          ))}
          {y.map((n, rowIndex) => (
            <Row key={`row-${n}`} y={n} rowIndex={rowIndex} cells={cells} onCellClick={handleCellClick} />
          ))}
        </div>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="mb-4 text-lg font-semibold">Publicar como NFT</h2>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Nombre (obligatorio)</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ej: Pixel #001"
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Descripción (opcional)</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción breve"
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-black px-4 py-2 text-white hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? 'Publicando…' : 'Publicar NFT en la API'}
            </button>
          </div>
        </form>

        {message && <p className="mt-3 text-sm text-green-700">{message}</p>}
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      </section>
    </main>
  )
}

function Row({ y, rowIndex, cells, onCellClick }) {
  const base = rowIndex * 10
  return (
    <>
      <div className="bg-gray-100/70 p-2 text-center text-sm font-medium">{y}</div>
      {[0,1,2,3,4,5,6,7,8,9].map((colIndex) => {
        const idx = base + colIndex
        return (
          <button
            key={idx}
            onClick={() => onCellClick(idx)}
            aria-label={`Celda (${colIndex + 1}, ${y})`}
            className="aspect-square w-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
            style={{ backgroundColor: cells[idx] || 'transparent' }}
          />
        )
      })}
    </>
  )
}
