"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, MessageCircle, ShoppingCart } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  rank: string
  level: number
  images: string[]
  features: string[]
}

export default function ProductCard({ product }: { product: Product }) {
  const [currentImage, setCurrentImage] = useState(0)

  const handleWhatsAppContact = () => {
    const message = `مرحباً، أريد شراء الحساب: ${product.title} - السعر: ${product.price}$`
    const whatsappUrl = `https://wa.me/967777826667?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="bg-gray-900 border border-yellow-400 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300">
      {/* Image Gallery */}
      <div className="relative h-48">
        <Image
          src={product.images[currentImage] || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-2 left-2 flex space-x-1">
          {product.images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentImage ? "bg-yellow-400" : "bg-white bg-opacity-50"}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
        <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold">
          {product.rank}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-yellow-400 mb-2">{product.title}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-white">${product.price}</span>
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm">المستوى {product.level}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-yellow-400 mb-2">المميزات:</h4>
          <div className="flex flex-wrap gap-1">
            {product.features.map((feature, index) => (
              <span key={index} className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">
                {feature}
              </span>
            ))}
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
