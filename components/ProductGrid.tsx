import ProductCard from "./ProductCard"

const sampleProducts = [
  {
    id: 1,
    title: "حساب كونكر مميز",
    price: 150,
    rank: "Conqueror",
    level: 85,
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
    features: ["رتبة كونكر", "أسلحة ذهبية", "أزياء نادرة", "مستوى عالي"],
  },
  {
    id: 2,
    title: "حساب مميز بدون كونكر",
    price: 80,
    rank: "Crown",
    level: 70,
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
    features: ["رتبة تاج", "أسكنات نادرة", "مركبات مميزة", "UC متوفر"],
  },
  // Add more sample products...
]

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sampleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
