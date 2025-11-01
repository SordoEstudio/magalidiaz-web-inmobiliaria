import type React from "react"
import { DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { Footer } from "@/components/footer"
import { CMSProvider } from "@/contexts/CMSProvider"
import { defaultMetadata } from "@/lib/seo/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { generateRealEstateAgentSchema } from "@/lib/seo/schema"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata = defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${dmSans.variable} antialiased`}>
        <JsonLd data={generateRealEstateAgentSchema()} />
        <CMSProvider>
          {/* Coloca solo el contenido principal dentro de Suspense, y deja el Footer fuera para que se renderice solo cuando todo el contenido haya cargado */}
          <Suspense fallback={<div>Loading...</div>}>
            {children}
            <Analytics />
          </Suspense>
          <Footer/>
        </CMSProvider>
      </body>
    </html>
  )
}
