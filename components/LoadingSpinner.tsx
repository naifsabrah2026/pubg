"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

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
  const [dots, setDots] = useState("")
  const [glowIntensity, setGlowIntensity] = useState(0)

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    const glowInterval = setInterval(() => {
      setGlowIntensity((prev) => (prev + 1) % 100)
    }, 50)

    return () => {
      clearInterval(dotsInterval)
      clearInterval(glowInterval)
    }
  }, [])

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  }

  const containerClasses = {
    page: "fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-sm flex items-center justify-center z-50",
    section: "flex items-center justify-center py-12",
    button: "inline-flex items-center justify-center",
    card: "flex items-center justify-center p-8",
    navigation: "fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md z-50 p-4 border-b border-yellow-400/20",
  }

  if (type === "navigation") {
    return (
      <div className={containerClasses[type]}>
        <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
          <div className="relative">
            <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-6 h-6 border-2 border-green-500/50 border-b-transparent rounded-full animate-spin animate-reverse"></div>
          </div>
          <span className="text-yellow-400 font-semibold animate-pulse">جاري التنقل{dots}</span>
        </div>
      </div>
    )
  }

  if (type === "button") {
    return (
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <div className="relative">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-4 h-4 bg-current rounded-full animate-ping opacity-20"></div>
        </div>
        <span>
          {message}
          {dots}
        </span>
      </div>
    )
  }

  return (
    <div className={containerClasses[type]}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center z-10">
        {/* PUBG Logo with Enhanced Animation */}
        {showLogo && (
          <div className="mb-8 relative">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl animate-pulse"
              style={{
                opacity: 0.1 + glowIntensity / 1000,
                transform: `scale(${1 + glowIntensity / 500})`,
              }}
            ></div>

            {/* Middle glow ring */}
            <div className="absolute inset-2 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>

            {/* Logo container */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-full"></div>
              <Image
                src="/placeholder.svg?height=48&width=48&text=PUBG"
                alt="PUBG Logo"
                width={48}
                height={48}
                className="filter brightness-0 invert relative z-10"
              />

              {/* Rotating border */}
              <div
                className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-yellow-400 via-green-500 to-yellow-400 rounded-full animate-spin"
                style={{ clipPath: "inset(0 0 50% 0)" }}
              ></div>
            </div>
          </div>
        )}

        {/* Enhanced Multi-layer Spinner */}
        <div className="relative">
          {/* Outer Ring with gradient */}
          <div
            className={`${sizeClasses[size]} border-4 border-transparent bg-gradient-to-r from-yellow-400 via-green-500 to-yellow-400 rounded-full animate-spin`}
            style={{ clipPath: "inset(0 0 75% 0)" }}
          ></div>

          {/* Middle Ring */}
          <div
            className={`absolute inset-2 ${size === "xl" ? "w-40 h-40" : size === "lg" ? "w-24 h-24" : size === "md" ? "w-12 h-12" : "w-6 h-6"} border-3 border-transparent bg-gradient-to-l from-green-500 via-blue-500 to-green-500 rounded-full animate-spin animate-reverse`}
            style={{ clipPath: "inset(0 0 50% 0)" }}
          ></div>

          {/* Inner Ring */}
          <div
            className={`absolute inset-4 ${size === "xl" ? "w-32 h-32" : size === "lg" ? "w-16 h-16" : size === "md" ? "w-8 h-8" : "w-4 h-4"} border-2 border-yellow-300 border-l-transparent rounded-full animate-spin`}
          ></div>

          {/* Center Pulse with enhanced effects */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`${size === "xl" ? "w-12 h-12" : size === "lg" ? "w-8 h-8" : size === "md" ? "w-6 h-6" : "w-4 h-4"} bg-gradient-to-br from-yellow-400 to-green-500 rounded-full animate-pulse shadow-lg`}
            ></div>
            <div
              className={`absolute ${size === "xl" ? "w-16 h-16" : size === "lg" ? "w-12 h-12" : size === "md" ? "w-8 h-8" : "w-6 h-6"} bg-yellow-400 rounded-full animate-ping opacity-20`}
            ></div>
          </div>

          {/* Orbiting particles */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                animation: `orbit 2s linear infinite`,
                animationDelay: `${i * 0.7}s`,
                transformOrigin: `${size === "xl" ? "96px" : size === "lg" ? "64px" : size === "md" ? "32px" : "16px"} ${size === "xl" ? "96px" : size === "lg" ? "64px" : size === "md" ? "32px" : "16px"}`,
              }}
            />
          ))}
        </div>

        {/* Enhanced Loading Text */}
        <div className="mt-8 text-center">
          <div className="text-yellow-400 text-xl font-bold mb-2">
            <span className="animate-pulse">{message}</span>
            <span className="text-green-400">{dots}</span>
          </div>

          {/* Animated dots with different colors */}
          <div className="flex justify-center space-x-1 rtl:space-x-reverse">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>

        {/* Enhanced Progress Bar for Page Loading */}
        {type === "page" && (
          <div className="mt-6 w-80 bg-gray-800 rounded-full h-3 overflow-hidden border border-yellow-400/20">
            <div className="h-full bg-gradient-to-r from-yellow-400 via-green-500 to-yellow-400 rounded-full animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </div>
        )}

        {/* PUBG text with glow effect */}
        {type !== "button" && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold text-sm animate-pulse">
            <span className="drop-shadow-lg" style={{ textShadow: "0 0 10px rgba(250, 204, 21, 0.5)" }}>
              PUBG Mobile Store
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(${size === "xl" ? "96px" : size === "lg" ? "64px" : size === "md" ? "32px" : "16px"}) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(${size === "xl" ? "96px" : size === "lg" ? "64px" : size === "md" ? "32px" : "16px"}) rotate(-360deg);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
