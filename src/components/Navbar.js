'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAppContext } from '@/contexts/AppContext'

export default function Navbar() {
  const {favoritesQty} = useAppContext();
  return (
    <header className="sticky top-0 bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Image src="/assets/logo.png" alt="Logo" width={154} height={20} />
        <nav>
          <ul className="flex space-x-8 text-sm font-medium">
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">About</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            <li>
              <Link href="/favorites">Favorites ({favoritesQty()})</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}