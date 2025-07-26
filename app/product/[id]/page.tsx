import { Suspense } from "react"
import ProductDetails from "@/components/ProductDetails"
import PageLoader from "@/components/PageLoader"
import LoadingSpinner from "@/components/LoadingSpinner"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  return (
    <PageLoader loadingMessage="جاري تحميل تفاصيل المنتج...">
      <div className="min-h-screen bg-black">
        <Suspense fallback={<LoadingSpinner type="page" message="جاري تحميل المنتج..." size="xl" />}>
          <ProductDetails productId={id} />
        </Suspense>
      </div>
    </PageLoader>
  )
}
