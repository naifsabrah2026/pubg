import { Suspense } from "react"
import AccountsSection from "@/components/AccountsSection"
import PageLoader from "@/components/PageLoader"
import CardSkeleton from "@/components/CardSkeleton"

export default function AccountsPage() {
  return (
    <PageLoader loadingMessage="جاري تحميل الحسابات المميزة...">
      <div className="min-h-screen bg-black py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">حسابات PUBG Mobile</h1>

          <div className="space-y-12">
            <Suspense fallback={<CardSkeleton count={4} type="account" />}>
              <AccountsSection title="حسابات مميزة - كونكر" category="conqueror" />
            </Suspense>

            <Suspense fallback={<CardSkeleton count={4} type="account" />}>
              <AccountsSection title="حسابات مميزة - بدون كونكر" category="premium" />
            </Suspense>

            <Suspense fallback={<CardSkeleton count={4} type="account" />}>
              <AccountsSection title="حسابات متنوعة" category="various" />
            </Suspense>
          </div>
        </div>
      </div>
    </PageLoader>
  )
}
