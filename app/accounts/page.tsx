import { Suspense } from "react"
import LoadingSpinner from "@/components/LoadingSpinner"
import AccountsSection from "@/components/AccountsSection"

export default function AccountsPage() {
  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">حسابات PUBG Mobile</h1>

        <Suspense fallback={<LoadingSpinner />}>
          <div className="space-y-12">
            <AccountsSection title="حسابات مميزة - كونكر" category="conqueror" />
            <AccountsSection title="حسابات مميزة - بدون كونكر" category="premium" />
            <AccountsSection title="حسابات متنوعة" category="various" />
          </div>
        </Suspense>
      </div>
    </div>
  )
}
