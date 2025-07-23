"use client"

import { useState } from "react"
import AdminLogin from "@/components/AdminLogin"
import AdminDashboard from "@/components/AdminDashboard"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      {!isLoggedIn ? <AdminLogin onLogin={() => setIsLoggedIn(true)} /> : <AdminDashboard />}
    </div>
  )
}
