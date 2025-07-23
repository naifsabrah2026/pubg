"use client"

import { useState } from "react"
import Image from "next/image"
import { MessageCircle, ShoppingCart, Eye, Star } from "lucide-react"

interface Account {
  id: number
  title: string
  price: number
  images: string[]
  details: Record<string, string | string[]>
}

export default function AccountCard({ account }: { account: Account }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  const handleWhatsAppContact = () => {
    const accountInfo = Object.entries(account.details)
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
      .join("\n")

    const message = `مرحباً، أريد شراء الحساب: ${account.title}\nالسعر: ${account.price}$\n\nتفاصيل الحساب:\n${accountInfo}`
    const whatsappUrl = `https://wa.me/967777826667?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="bg-gray-900 border border-yellow-400 rounded-lg overflow-hidden">
      {/* Image Gallery */}
      <div className="relative h-64">
        <Image
          src={account.images[currentImage] || "/placeholder.svg"}
          alt={`${account.title} - صورة ${currentImage + 1}`}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-2 left-2 flex space-x-1">
          {account.images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentImage ? "bg-yellow-400" : "bg-white bg-opacity-50"}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
        <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold">
          {account.details.rank}
        </div>
      </div>

      {/* Account Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-yellow-400 mb-2">{account.title}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-white">${account.price}</span>
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm">المستوى {account.details.level}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="bg-gray-800 p-2 rounded">
            <span className="text-yellow-400">K/D:</span>
            <span className="text-white ml-1">{account.details.kd}</span>
          </div>
          <div className="bg-gray-800 p-2 rounded">
            <span className="text-yellow-400">المباريات:</span>
            <span className="text-white ml-1">{account.details.matches}</span>
          </div>
          <div className="bg-gray-800 p-2 rounded">
            <span className="text-yellow-400">الانتصارات:</span>
            <span className="text-white ml-1">{account.details.wins}</span>
          </div>
          <div className="bg-gray-800 p-2 rounded">
            <span className="text-yellow-400">UC:</span>
            <span className="text-white ml-1">{account.details.uc}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mb-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showDetails ? "إخفاء" : "عرض"} التفاصيل
          </button>
        </div>

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

        {/* Detailed Information */}
        {showDetails && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h4 className="text-yellow-400 font-bold mb-3">تفاصيل الحساب الكاملة:</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {Object.entries(account.details).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-gray-700 pb-1">
                  <span className="text-yellow-400">{key}:</span>
                  <span className="text-white text-right">{Array.isArray(value) ? value.join(", ") : value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
