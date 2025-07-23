"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import LoadingSpinner from "./LoadingSpinner"

export default function NavigationLoader() {
  const [isNavigating, setIsNavigating] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsNavigating(true)
    const timer = setTimeout(() => {
      setIsNavigating(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname])

  if (!isNavigating) return null

  return <LoadingSpinner type="navigation" />
}
