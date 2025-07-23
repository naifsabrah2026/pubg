"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const bannerImages = [
  "/placeholder.svg?height=400&width=1200",
  "/placeholder.svg?height=400&width=1200",
  "/placeholder.svg?height=400&width=1200",
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-96 overflow-hidden">
      {bannerImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentSlide ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Image src={image || "/placeholder.svg"} alt={`Banner ${index + 1}`} fill className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}

      {/* Banner Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-400">متجر حسابات PUBG Mobile</h1>
          <p className="text-xl md:text-2xl mb-8">أفضل الحسابات المميزة بأسعار منافسة</p>
          <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors">
            تصفح الحسابات
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-yellow-400" : "bg-white bg-opacity-50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
