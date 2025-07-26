"use client"

import { useState } from "react"
import AdminLogin from "@/components/AdminLogin"
import AdminDashboard from "@/components/AdminDashboard"
import PageLoader from "@/components/PageLoader"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoggedIn(true)
      setIsLoading(false)
    }, 2000)
  }

  if (isLoading) {
    return <PageLoader loadingMessage="جاري تسجيل الدخول..." />
  }

  return (
    <div className="min-h-screen bg-black">
      {!isLoggedIn ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <PageLoader loadingMessage="جاري تحميل لوحة الإدارة...">
          <AdminDashboard />
        </PageLoader>
      )}
    </div>
  )
}
