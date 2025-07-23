"use client"

import type React from "react"

import { useState } from "react"
import { User, Lock, Eye, EyeOff } from "lucide-react"

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "admin" && password === "xliunx") {
      onLogin()
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-yellow-400 rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-yellow-400">لوحة الإدارة</h1>
          <p className="text-gray-400 mt-2">تسجيل دخول المدير</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-yellow-400 text-sm font-bold mb-2">اسم المستخدم</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg py-3 px-10 text-white focus:outline-none focus:border-yellow-400"
                placeholder="أدخل اسم المستخدم"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-yellow-400 text-sm font-bold mb-2">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg py-3 px-10 pr-12 text-white focus:outline-none focus:border-yellow-400"
                placeholder="أدخل كلمة المرور"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && <div className="bg-red-600 text-white p-3 rounded-lg text-center">{error}</div>}

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
          >
            تسجيل الدخول
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>اسم المستخدم: admin</p>
          <p>كلمة المرور: xliunx</p>
        </div>
      </div>
    </div>
  )
}
