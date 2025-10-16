'use client'

import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'



export default function PixelArt() {
  const palette = useMemo(
    () => ['#000000', '#FF0000', '#00AAFF', '#00C853', '#FFEB3B', '#9C27B0', '#FF9800'],
    []
  )

  const [cells, setCells] = useState(Array(100).fill(''))
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

  const handleCellClick = (idx) => {
    setCells((prev) => {
      const next = [...prev]
      next[idx] = next[idx] === currentColor ? '' : currentColor
      return next
    })
  }

  const resetGrid = () => setCells(Array(100).fill(''))

  const serializeGrid = () => cells.map(c => (c && c.trim() ? c : null))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setError(null)

    if (!name.trim()) {
      setError('El nombre es obligatorio.')
      return
    }

    const payload = {
      name: name.trim(),
      pixelData: serializeGrid(),
      description: description.trim() ? description.trim() : "undefined",
    }

    try {
      setSubmitting(true)
      
      setMessage('¡Producto creado con éxito!')
      setName('')
      setDescription('')
    } catch (err) {
      console.error(err)
      setError('No se pudo publicar el NFT. Revisá la consola y el endpoint.')
    } finally {
      setSubmitting(false)
    }
  }

  const xLabels = Array.from({ length: 10 }, (_, i) => i + 1)
  const yLabels = Array.from({ length: 10 }, (_, i) => i + 1)

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
              title="Borrador"
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
        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(11, minmax(0, 2.5rem))' }}
        >
          <div className="bg-gray-100/70 p-2 text-center font-medium"></div>
          {xLabels.map((x) => (
            <div key={`x-${x}`} className="bg-gray-100/70 p-2 text-center text-sm font-medium">
              {x}
            </div>
          ))}
          {yLabels.map((y, rowIndex) => (
            <Row
              key={`row-${y}`}
              y={y}
              rowIndex={rowIndex}
              cells={cells}
              onCellClick={handleCellClick}
            />
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
              placeholder='Si la dejás vacía, se guardará como "undefined"'
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

        <details className="mt-4">
          <summary className="cursor-pointer text-sm underline">Ver JSON que se envía</summary>
          <pre className="mt-2 overflow-auto rounded-md bg-gray-50 p-3 text-xs">
{JSON.stringify({
  name: name || '(obligatorio)',
  pixelData: serializeGrid().slice(0, 20).concat(['…']),
  description: description || 'undefined',
}, null, 2)}
          </pre>
        </details>
      </section>
    </main>
  )
}

function Row({ y, rowIndex, cells, onCellClick }) {
  const base = rowIndex * 10
  return (
    <>
      <div className="bg-gray-100/70 p-2 text-center text-sm font-medium">{y}</div>
      {Array.from({ length: 10 }).map((_, colIndex) => {
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
