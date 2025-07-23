"use client"

import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import SectionLoader from "./SectionLoader"
import { supabase } from "@/lib/supabase"

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

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(6)

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      // Fallback to mock data if database fails
      setProducts([
        {
          id: 1,
          title: "حساب كونكر مع أسلحة ذهبية",
          price: 500,
          rank: "Conqueror",
          level: 100,
          skins_count: 50,
          weapons: "أسلحة ذهبية",
          features: ["رتبة كونكر", "أسلحة ذهبية", "أزياء نادرة"],
          images: ["/placeholder.svg?height=300&width=400&text=PUBG+Account"],
          category: "conqueror",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

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
