import { Suspense } from "react"
import Hero from "@/components/Hero"
import ProductGrid from "@/components/ProductGrid"
import NewsTicker from "@/components/NewsTicker"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
        <NewsTicker />
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-yellow-400">حسابات PUBG Mobile المميزة</h2>
          <ProductGrid />
        </div>
      </Suspense>
    </main>
  )
}
