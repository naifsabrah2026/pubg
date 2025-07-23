"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, MessageCircle, ShoppingCart, Share2, Heart, Shield, Award, Users, Clock } from "lucide-react"
import LoadingSpinner from "./LoadingSpinner"
import LoadingButton from "./LoadingButton"
import { supabase } from "@/lib/supabase"

interface Product {
  id: number
  title: string
  description: string
  price: number
  rank: string
  level: number
  skins_count: number
  weapons: string
  features: string[]
  images: string[]
  category: string
  whatsapp_number: string
  created_at: string
}

interface ProductDetailsProps {
  productId: string
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isContactLoading, setIsContactLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*").eq("id", productId).single()

      if (error) throw error
      setProduct(data)
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsAppContact = async () => {
    if (!product) return

    setIsContactLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const message = `مرحباً، أريد شراء الحساب: ${product.title} - السعر: ${product.price} ريال`
    const whatsappUrl = `https://wa.me/${product.whatsapp_number}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    setIsContactLoading(false)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.title,
          text: `تحقق من هذا الحساب المميز: ${product?.title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("تم نسخ الرابط!")
    }
  }

  if (loading) {
    return <LoadingSpinner type="page" message="جاري تحميل تفاصيل المنتج..." size="xl" />
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">المنتج غير موجود</h1>
          <Link href="/" className="text-yellow-400 hover:text-yellow-300">
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-yellow-400/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              العودة
            </Link>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full transition-colors ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-96 bg-gray-900 rounded-lg overflow-hidden border border-yellow-400/20">
              <Image
                src={product.images[currentImageIndex] || "/placeholder.svg?height=400&width=600&text=PUBG+Account"}
                alt={product.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
                {product.rank}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index ? "border-yellow-400" : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg?height=80&width=80&text=PUBG"}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-yellow-400 mb-2">{product.title}</h1>
              <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Price and Stats */}
            <div className="bg-gray-900 rounded-lg p-6 border border-yellow-400/20">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-white">{product.price} ريال</div>
                <div className="flex items-center text-yellow-400">
                  <Star className="w-5 h-5 fill-current mr-1" />
                  <span>المستوى {product.level}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-300">
                  <Award className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>الرتبة: {product.rank}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-5 h-5 text-green-400 mr-2" />
                  <span>{product.skins_count}+ سكن</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Shield className="w-5 h-5 text-blue-400 mr-2" />
                  <span>حساب آمن</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 text-purple-400 mr-2" />
                  <span>تسليم فوري</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <LoadingButton
                  isLoading={isContactLoading}
                  loadingText="جاري الاتصال..."
                  onClick={handleWhatsAppContact}
                  variant="success"
                  size="lg"
                  className="w-full"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  تواصل عبر واتساب
                </LoadingButton>

                <LoadingButton isLoading={false} onClick={() => {}} variant="primary" size="lg" className="w-full">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  شراء الآن
                </LoadingButton>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-900 rounded-lg p-6 border border-yellow-400/20">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">مميزات الحساب</h3>
              <div className="grid grid-cols-1 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weapons & Items */}
            <div className="bg-gray-900 rounded-lg p-6 border border-yellow-400/20">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">الأسلحة والعناصر</h3>
              <p className="text-gray-300 leading-relaxed">{product.weapons}</p>
            </div>

            {/* Security Notice */}
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center text-green-400 mb-2">
                <Shield className="w-5 h-5 mr-2" />
                <span className="font-semibold">ضمان الأمان</span>
              </div>
              <p className="text-green-300 text-sm">
                جميع حساباتنا آمنة ومضمونة. نوفر الدعم الفني بعد البيع ونضمن سلامة الحساب.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
