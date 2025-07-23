"use client"

interface CardSkeletonProps {
  count?: number
  type?: "product" | "account" | "news" | "user"
}

export default function CardSkeleton({ count = 6, type = "product" }: CardSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i)

  const getSkeletonContent = () => {
    switch (type) {
      case "product":
        return (
          <>
            <div className="h-48 bg-gray-800 rounded-lg animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-gray-700 rounded animate-pulse w-3/4 mb-2"></div>
            <div className="h-6 bg-yellow-600/30 rounded animate-pulse w-1/2"></div>
          </>
        )
      case "account":
        return (
          <>
            <div className="h-32 bg-gray-800 rounded-lg animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-gray-700 rounded animate-pulse w-2/3 mb-2"></div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <div className="h-6 bg-gray-700 rounded animate-pulse w-16"></div>
              <div className="h-6 bg-gray-700 rounded animate-pulse w-16"></div>
            </div>
          </>
        )
      case "news":
        return (
          <>
            <div className="h-6 bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-1/4"></div>
          </>
        )
      case "user":
        return (
          <>
            <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse mb-1"></div>
            <div className="h-3 bg-gray-700 rounded animate-pulse w-3/4"></div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletons.map((index) => (
        <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          {getSkeletonContent()}
        </div>
      ))}
    </div>
  )
}
