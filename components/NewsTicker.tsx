"use client"

export default function NewsTicker() {
  const news = [
    "🔥 عروض خاصة على حسابات الكونكر - خصم 20%",
    "⭐ وصلت حسابات جديدة مع أسلحة ذهبية نادرة",
    "🎮 متوفر الآن: حسابات مع رتبة الكونكر للموسم الحالي",
    "💎 حسابات VIP مع جميع الأزياء المميزة",
    "🏆 ضمان 100% على جميع الحسابات المباعة",
  ]

  return (
    <div className="bg-yellow-400 text-black py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="text-lg font-bold mx-8">
          {news.join(" • ")} • {news.join(" • ")}
        </span>
      </div>
    </div>
  )
}
