"use client"

interface CardSkeletonProps {
  count?: number
  type?: "product" | "user" | "news"
}

export default function CardSkeleton({ count = 3, type = "product" }: CardSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i)

  if (type === "product") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletons.map((index) => (
          <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden animate-pulse">
            {/* Image skeleton */}
            <div className="h-48 bg-gray-800"></div>

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              {/* Title */}
              <div className="h-6 bg-gray-800 rounded w-3/4"></div>

              {/* Price and rank */}
              <div className="flex justify-between items-center">
                <div className="h-8 bg-gray-800 rounded w-20"></div>
                <div className="h-6 bg-gray-800 rounded w-16"></div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                <div className="flex space-x-2">
                  <div className="h-6 bg-gray-800 rounded w-16"></div>
                  <div className="h-6 bg-gray-800 rounded w-20"></div>
                  <div className="h-6 bg-gray-800 rounded w-14"></div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-2 pt-2">
                <div className="h-10 bg-gray-800 rounded flex-1"></div>
                <div className="h-10 bg-gray-800 rounded flex-1"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === "user") {
    return (
      <div className="space-y-4">
        {skeletons.map((index) => (
          <div key={index} className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg animate-pulse">
            <div className="w-12 h-12 bg-gray-800 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-800 rounded w-1/4"></div>
              <div className="h-3 bg-gray-800 rounded w-1/3"></div>
            </div>
            <div className="h-8 bg-gray-800 rounded w-20"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {skeletons.map((index) => (
        <div key={index} className="p-4 bg-gray-900 rounded-lg animate-pulse">
          <div className="h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-800 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-800 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  )
}
