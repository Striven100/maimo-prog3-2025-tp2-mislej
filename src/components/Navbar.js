'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useShopContext } from '@/contexts/ShopContext'

export default function Navbar() {
  const { CarritoQty } = useShopContext()
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[#c9b3ea]/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-6">
        <Link href="/" className="shrink-0 grid place-items-center">
          <Image src="/assets/logo.png" alt="Logo" width={148} height={20} className="h-6 w-auto" />
        </Link>
        <nav className="ml-auto">
          <ul className="flex items-center gap-4 md:gap-8 text-sm font-semibold">
            <li><Link href="/" className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-black/80">Inicio</Link></li>
            <li><Link href="/#catalogo" className="px-3 py-1.5 rounded-xl hover:bg-white/10 text-black/70">Catálogo</Link></li>
            <li><Link href="/#sobre" className="px-3 py-1.5 rounded-xl hover:bg-white/10 text-black/70">Sobre</Link></li>
            <li>
              <Link href="/carrito" className="px-3 py-1.5 rounded-xl bg-black text-white hover:bg-black/90">
                Carrito <span className="ml-1 inline-flex min-w-6 h-6 items-center justify-center rounded-full bg-[#ff5252] text-white text-xs px-2">{CarritoQty()}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
