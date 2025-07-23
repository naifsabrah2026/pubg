"use client"

import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import SectionLoader from "./SectionLoader"

const mockProducts = [
  {
    id: 1,
    title: "حساب كونكر مع أسلحة ذهبية",
    price: "500 ريال",
    image: "/placeholder.svg?height=300&width=400&text=PUBG+Account",
    rank: "كونكر",
    level: "100",
    skins: "50+ سكن",
    weapons: "أسلحة ذهبية",
  },
  {
    id: 2,
    title: "حساب آيس مع أزياء نادرة",
    price: "350 ريال",
    image: "/placeholder.svg?height=300&width=400&text=PUBG+Account",
    rank: "آيس",
    level: "85",
    skins: "30+ سكن",
    weapons: "أسلحة مطورة",
  },
  {
    id: 3,
    title: "حساب كراون مع مركبات",
    price: "250 ريال",
    image: "/placeholder.svg?height=300&width=400&text=PUBG+Account",
    rank: "كراون",
    level: "70",
    skins: "20+ سكن",
    weapons: "مركبات نادرة",
  },
]

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProducts(mockProducts)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <SectionLoader isLoading={isLoading} message="جاري تحميل المنتجات..." height="h-96">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionLoader>
  )
}
