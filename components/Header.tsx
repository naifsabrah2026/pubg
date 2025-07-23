"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black border-b-2 border-yellow-400 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xl">P</span>
            </div>
            <span className="text-yellow-400 font-bold text-xl">PUBG Store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-yellow-400 transition-colors">
              الرئيسية
            </Link>
            <Link href="/accounts" className="text-white hover:text-yellow-400 transition-colors">
              حسابات PUBG
            </Link>
            <Link href="/terms" className="text-white hover:text-yellow-400 transition-colors">
              شروط المتجر
            </Link>
            <Link href="/admin" className="text-white hover:text-yellow-400 transition-colors">
              <User className="w-5 h-5" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-yellow-400">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-yellow-400 transition-colors">
                الرئيسية
              </Link>
              <Link href="/accounts" className="text-white hover:text-yellow-400 transition-colors">
                حسابات PUBG
              </Link>
              <Link href="/terms" className="text-white hover:text-yellow-400 transition-colors">
                شروط المتجر
              </Link>
              <Link href="/admin" className="text-white hover:text-yellow-400 transition-colors">
                لوحة الإدارة
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
