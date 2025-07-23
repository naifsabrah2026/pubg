import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import NavigationLoader from "@/components/NavigationLoader"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "متجر حسابات PUBG Mobile - أفضل الحسابات المميزة",
  description:
    "متجر متخصص في بيع حسابات PUBG Mobile المميزة بأفضل الأسعار. حسابات كونكر، آيس، كراون وأكثر مع ضمان الجودة والأمان.",
  keywords: "PUBG Mobile, حسابات ببجي, كونكر, آيس, حسابات مميزة",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <NavigationLoader />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
