"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function NavigationLoader() {
  const [isNavigating, setIsNavigating] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    setIsNavigating(true)
    setProgress(0)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 25
      })
    }, 100)

    const timer = setTimeout(() => {
      setIsNavigating(false)
    }, 800)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [pathname])

  if (!isNavigating) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Progress bar */}
      <div className="h-1 bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 via-green-500 to-yellow-400 transition-all duration-300 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* Loading banner */}
      <div className="bg-black/95 backdrop-blur-md border-b border-yellow-400/20 px-4 py-2">
        <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
          <div className="relative">
            <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-20"></div>
          </div>
          <span className="text-yellow-400 text-sm font-medium animate-pulse">جاري التنقل...</span>
          <span className="text-gray-400 text-xs">{Math.round(progress)}%</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
