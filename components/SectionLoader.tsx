"use client"

import type React from "react"

import LoadingSpinner from "./LoadingSpinner" // Import LoadingSpinner component

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
        className={`${height} flex items-center justify-center bg-gray-900/50 rounded-lg border border-yellow-400/20`}
      >
        <LoadingSpinner type="section" message={message} size="md" showLogo={false} />
      </div>
    )
  }

  return <>{children}</>
}
