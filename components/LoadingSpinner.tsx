"use client"

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative">
        {/* PUBG Style Loading Animation */}
        <div className="w-32 h-32 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-32 h-32 border-4 border-yellow-600 border-b-transparent rounded-full animate-spin animate-reverse"></div>
        <div className="absolute inset-4 w-24 h-24 border-2 border-yellow-300 border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="absolute bottom-1/3 text-yellow-400 text-xl font-bold animate-pulse">جاري التحميل...</div>
    </div>
  )
}
