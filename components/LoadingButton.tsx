"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface LoadingButtonProps {
  isLoading: boolean
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  disabled?: boolean
}

export default function LoadingButton({
  isLoading,
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
}: LoadingButtonProps) {
  return (
    <Button onClick={onClick} variant={variant} size={size} className={className} disabled={isLoading || disabled}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
