"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"

interface PageLoaderProps {
  children: React.ReactNode
  loadingMessage?: string
  minLoadTime?: number
}

export default function PageLoader({
  children,
  loadingMessage = "جاري التحميل...",
  minLoadTime = 2000,
}: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Minimum loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, minLoadTime)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [minLoadTime])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-transparent to-green-500"></div>
        </div>

        {/* Main loader */}
        <div className="relative z-10 text-center">
          {/* PUBG Logo placeholder */}
          <div className="mb-8">
            <Image
              src="/placeholder.svg?height=120&width=120&text=PUBG"
              alt="PUBG Mobile"
              width={120}
              height={120}
              className="mx-auto animate-bounce"
            />
          </div>

          {/* Animated rings */}
          <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-20 border-4 border-green-500 border-b-transparent rounded-full animate-spin animate-reverse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>

          {/* Loading message */}
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 animate-pulse">{loadingMessage}</h2>

          {/* Progress bar */}
          <div className="w-80 max-w-sm mx-auto">
            <div className="bg-gray-800 rounded-full h-2 mb-2">
              <div
                className="bg-gradient-to-r from-yellow-400 to-green-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm">{Math.round(Math.min(progress, 100))}% مكتمل</p>
          </div>

          {/* Loading dots */}
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
