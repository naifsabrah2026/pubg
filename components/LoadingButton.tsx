"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import LoadingSpinner from "./LoadingSpinner"

interface LoadingButtonProps {
  isLoading: boolean
  children: React.ReactNode
  loadingText?: string
  onClick?: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  className?: string
}

export default function LoadingButton({
  isLoading,
  children,
  loadingText = "جاري المعالجة...",
  onClick,
  variant = "default",
  size = "default",
  disabled = false,
  className = "",
}: LoadingButtonProps) {
  return (
    <Button onClick={onClick} variant={variant} size={size} disabled={isLoading || disabled} className={className}>
      {isLoading ? <LoadingSpinner type="button" message={loadingText} /> : children}
    </Button>
  )
}
