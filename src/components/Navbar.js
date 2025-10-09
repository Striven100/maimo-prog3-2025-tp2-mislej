'use client'
import Link from 'next/link'
import { useShopContext } from '@/contexts/ShopContext'
import Image from 'next/image'

export default function Navbar() {
  const { CarritoQty } = useShopContext()
  const total = CarritoQty()

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-black/10">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="shrink-0 grid place-items-center">
          <Image src="/assets/logo.png" alt="Logo" width={148} height={20} className="h-6 w-auto" />
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-black/70 hover:text-black">Inicio</Link>
          <Link href="/carrito" className="relative text-sm text-black/70 hover:text-black">
            Carrito
            <span className="ml-2 inline-flex items-center justify-center text-[11px] font-semibold w-5 h-5 rounded-full bg-black text-white">
              {total}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  )
}
