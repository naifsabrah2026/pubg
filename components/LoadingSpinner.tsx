"use client"

import Image from "next/image"

interface LoadingSpinnerProps {
  type?: "page" | "section" | "button" | "card" | "navigation"
  message?: string
  size?: "sm" | "md" | "lg" | "xl"
  showLogo?: boolean
}

export default function LoadingSpinner({
  type = "page",
  message = "جاري التحميل...",
  size = "lg",
  showLogo = true,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  }

  const containerClasses = {
    page: "fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50",
    section: "flex items-center justify-center py-12",
    button: "inline-flex items-center justify-center",
    card: "flex items-center justify-center p-8",
    navigation: "fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 p-4",
  }

  if (type === "navigation") {
    return (
      <div className={containerClasses[type]}>
        <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
          <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-yellow-400 font-semibold">جاري التنقل...</span>
        </div>
      </div>
    )
  }

  if (type === "button") {
    return (
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        <span>{message}</span>
      </div>
    )
  }

  return (
    <div className={containerClasses[type]}>
      <div className="relative flex flex-col items-center">
        {/* PUBG Logo with Animation */}
        {showLogo && (
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl">
              <Image
                src="/placeholder.svg?height=48&width=48&text=PUBG"
                alt="PUBG Logo"
                width={48}
                height={48}
                className="filter brightness-0 invert"
              />
            </div>
          </div>
        )}

        {/* Multi-layer Spinner */}
        <div className="relative">
          {/* Outer Ring */}
          <div
            className={`${sizeClasses[size]} border-4 border-yellow-400 border-t-transparent rounded-full animate-spin`}
          ></div>

          {/* Inner Ring */}
          <div
            className={`absolute inset-2 ${size === "xl" ? "w-40 h-40" : size === "lg" ? "w-24 h-24" : size === "md" ? "w-12 h-12" : "w-6 h-6"} border-3 border-green-500 border-b-transparent rounded-full animate-spin animate-reverse`}
          ></div>

          {/* Center Pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`${size === "xl" ? "w-12 h-12" : size === "lg" ? "w-8 h-8" : size === "md" ? "w-6 h-6" : "w-4 h-4"} bg-yellow-400 rounded-full animate-pulse shadow-lg`}
            ></div>
          </div>
        </div>

        {/* Loading Text with Typing Effect */}
        <div className="mt-8 text-center">
          <div className="text-yellow-400 text-xl font-bold animate-pulse mb-2">{message}</div>
          <div className="flex justify-center space-x-1 rtl:space-x-reverse">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>

        {/* Progress Bar for Page Loading */}
        {type === "page" && (
          <div className="mt-6 w-64 bg-gray-800 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* PUBG text */}
        {type !== "button" && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold text-sm animate-pulse">
            PUBG Mobile
          </div>
        )}
      </div>
    </div>
  )
}
