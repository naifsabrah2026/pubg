"use client"

import { useState, useEffect } from "react"

interface NavigationLoaderProps {
  isVisible: boolean
  message?: string
}

export default function NavigationLoader({ isVisible, message = "جاري التنقل..." }: NavigationLoaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isVisible) {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + Math.random() * 20
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Progress bar */}
      <div className="h-1 bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-green-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Loading banner */}
      <div className="bg-black/90 backdrop-blur-sm border-b border-yellow-400/20 px-4 py-2">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-yellow-400 text-sm font-medium">{message}</span>
        </div>
      </div>
    </div>
  )
}
