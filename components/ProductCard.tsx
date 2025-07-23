"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, MessageCircle, ShoppingCart } from "lucide-react"

interface Product {
  id: number
  title: string
  price: string
  image: string
  rank: string
  level: string
  skins: string
  weapons: string
}

export default function ProductCard({ product }: { product: Product }) {
  const [imageLoading, setImageLoading] = useState(true)

  const handleWhatsAppContact = () => {
    const message = `مرحباً، أريد شراء الحساب: ${product.title} - السعر: ${product.price}`
    const whatsappUrl = `https://wa.me/967777826667?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="bg-gray-900 border border-yellow-400 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300">
      {/* Image */}
      <div className="relative h-48">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover"
          onLoad={() => setImageLoading(false)}
        />
        <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold">
          {product.rank}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-yellow-400 mb-2">{product.title}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-white">{product.price}</span>
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm">المستوى {product.level}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-yellow-400 mb-2">المميزات:</h4>
          <div className="flex flex-wrap gap-1">
            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">{product.skins}</span>
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">{product.weapons}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleWhatsAppContact}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            واتساب
          </button>
          <button className="flex-1 bg-yellow-400 text-black py-2 px-4 rounded-lg flex items-center justify-center hover:bg-yellow-500 transition-colors">
            <ShoppingCart className="w-4 h-4 mr-2" />
            شراء
          </button>
        </div>
      </div>
    </div>
  )
}
