"use client"

import type React from "react"

import { useEffect, useState } from "react"
import LoadingSpinner from "./LoadingSpinner"

interface PageLoaderProps {
  children: React.ReactNode
  loadingMessage?: string
  minLoadTime?: number
}

export default function PageLoader({
  children,
  loadingMessage = "جاري تحميل الصفحة...",
  minLoadTime = 1000,
}: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, minLoadTime)

    return () => clearTimeout(timer)
  }, [minLoadTime])

  if (isLoading) {
    return <LoadingSpinner type="page" message={loadingMessage} size="xl" />
  }

  return <>{children}</>
}
