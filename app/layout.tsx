import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import NavigationLoader from "@/components/NavigationLoader"

const cairo = Cairo({ subsets: ["arabic"] })

export const metadata: Metadata = {
  title: "متجر حسابات PUBG Mobile - أفضل الحسابات المميزة",
  description: "متجر متخصص في بيع حسابات PUBG Mobile المميزة بأسعار منافسة. حسابات كونكر، أسلحة ذهبية، وأزياء نادرة.",
  keywords: "PUBG Mobile, حسابات ببجي, كونكر, أسلحة ذهبية, أزياء نادرة",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <NavigationLoader />
        <Header />
        {children}
      </body>
    </html>
  )
}
