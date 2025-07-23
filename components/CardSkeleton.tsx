"use client"

interface CardSkeletonProps {
  count?: number
  type?: "product" | "account" | "news"
}

export default function CardSkeleton({ count = 3, type = "product" }: CardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bg-gray-900 border border-yellow-400/20 rounded-lg overflow-hidden animate-pulse">
          {/* Image skeleton */}
          <div className="h-48 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/20 to-transparent animate-shimmer"></div>
            <div className="absolute top-2 right-2 w-16 h-6 bg-gray-700 rounded"></div>
          </div>

          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <div className="h-6 bg-gradient-to-r from-gray-700 to-gray-600 rounded animate-pulse"></div>

            {/* Price and level */}
            <div className="flex justify-between items-center">
              <div className="h-8 w-24 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded"></div>
              <div className="h-5 w-20 bg-gradient-to-r from-gray-700 to-gray-600 rounded"></div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <div className="h-4 w-16 bg-gray-700 rounded"></div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded"></div>
                <div className="h-6 w-20 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded"></div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-2 pt-2">
              <div className="flex-1 h-10 bg-gradient-to-r from-green-600/20 to-green-700/20 rounded-lg"></div>
              <div className="flex-1 h-10 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
