"use client"

import type React from "react"

interface SectionLoaderProps {
  isLoading: boolean
  children: React.ReactNode
  message?: string
  height?: string
}

export default function SectionLoader({
  isLoading,
  children,
  message = "جاري التحميل...",
  height = "h-64",
}: SectionLoaderProps) {
  if (isLoading) {
    return (
      <div
        className={`${height} flex flex-col items-center justify-center bg-gray-900 rounded-lg border border-yellow-400/20`}
      >
        {/* Spinner */}
        <div className="relative mb-4">
          <div className="w-12 h-12 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1 left-1 w-10 h-10 border-3 border-green-500 border-b-transparent rounded-full animate-spin animate-reverse"></div>
        </div>

        {/* Message */}
        <p className="text-yellow-400 font-semibold animate-pulse">{message}</p>

        {/* Pulse dots */}
        <div className="flex space-x-1 mt-3">
          <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
