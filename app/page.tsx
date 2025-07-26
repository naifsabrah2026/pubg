import { Suspense } from "react"
import Hero from "@/components/Hero"
import ProductGrid from "@/components/ProductGrid"
import NewsTicker from "@/components/NewsTicker"
import PageLoader from "@/components/PageLoader"
import CardSkeleton from "@/components/CardSkeleton"

export default function Home() {
  return (
    <PageLoader loadingMessage="مرحباً بك في متجر PUBG Mobile">
      <main className="min-h-screen bg-black">
        <Suspense fallback={<div className="h-96 bg-gray-900 animate-pulse"></div>}>
          <Hero />
        </Suspense>

        <Suspense fallback={<div className="h-16 bg-gray-800 animate-pulse"></div>}>
          <NewsTicker />
        </Suspense>

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-yellow-400">حسابات PUBG Mobile المميزة</h2>
          <Suspense fallback={<CardSkeleton count={6} type="product" />}>
            <ProductGrid />
          </Suspense>
        </div>
      </main>
    </PageLoader>
  )
}
