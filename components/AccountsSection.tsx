"use client"

import { useState, useEffect } from "react"
import AccountCard from "./AccountCard"
import SectionLoader from "./SectionLoader"

interface AccountsSectionProps {
  title: string
  category: string
}

const mockAccounts = {
  conqueror: [
    {
      id: 1,
      title: "حساب كونكر S24",
      price: "800 ريال",
      image: "/placeholder.svg?height=200&width=300&text=Conqueror",
      rank: "كونكر",
      season: "S24",
      kd: "4.5",
      level: "100",
    },
  ],
  premium: [
    {
      id: 2,
      title: "حساب آيس مميز",
      price: "400 ريال",
      image: "/placeholder.svg?height=200&width=300&text=Ace",
      rank: "آيس",
      season: "S24",
      kd: "3.2",
      level: "85",
    },
  ],
  various: [
    {
      id: 3,
      title: "حساب متنوع",
      price: "200 ريال",
      image: "/placeholder.svg?height=200&width=300&text=Various",
      rank: "كراون",
      season: "S23",
      kd: "2.8",
      level: "60",
    },
  ],
}

export default function AccountsSection({ title, category }: AccountsSectionProps) {
  const [accounts, setAccounts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setAccounts(mockAccounts[category as keyof typeof mockAccounts] || [])
        setIsLoading(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay for realistic effect

    return () => clearTimeout(timer)
  }, [category])

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">{title}</h2>
      <SectionLoader isLoading={isLoading} message={`جاري تحميل ${title}...`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      </SectionLoader>
    </section>
  )
}
