"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, MessageCircle, ShoppingCart, Eye } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  rank: string
  level: number
  skins_count: number
  weapons: string
  features: string[]
  images: string[]
  category: string
}

export default function ProductCard({ product }: { product: Product }) {
  const [imageLoading, setImageLoading] = useState(true)

  const handleWhatsAppContact = (e: React.MouseEvent) => {
    e.preventDefault()
    const message = `مرحباً، أريد شراء الحساب: ${product.title} - السعر: ${product.price} ريال`
    const whatsappUrl = `https://wa.me/967777826667?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="bg-gray-900 border border-yellow-400 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 transform hover:scale-105">
      {/* Image */}
      <div className="relative h-48 group">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={product.images?.[0] || "/placeholder.svg?height=300&width=400&text=PUBG+Account"}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          onLoad={() => setImageLoading(false)}
        />
        <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold">
          {product.rank}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link href={`/product/${product.id}`}>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold flex items-center hover:bg-yellow-500 transition-colors">
              <Eye className="w-4 h-4 mr-2" />
              عرض التفاصيل
            </button>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-yellow-400 mb-2 line-clamp-2">{product.title}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-white">{product.price} ريال</span>
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm">المستوى {product.level}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-yellow-400 mb-2">المميزات:</h4>
          <div className="flex flex-wrap gap-1">
            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">{product.skins_count}+ سكن</span>
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">{product.weapons}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 rtl:space-x-reverse">
          <button
            onClick={handleWhatsAppContact}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            واتساب
          </button>
          <Link href={`/product/${product.id}`} className="flex-1">
            <button className="w-full bg-yellow-400 text-black py-2 px-4 rounded-lg flex items-center justify-center hover:bg-yellow-500 transition-colors">
              <ShoppingCart className="w-4 h-4 mr-2" />
              شراء
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
