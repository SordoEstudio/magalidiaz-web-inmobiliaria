import type React from "react"
import { DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { Footer } from "@/components/footer"
import { CMSProvider } from "@/contexts/CMSProvider"
import { defaultMetadata, PAGE_CONFIG, SITE_CONFIG } from "@/lib/seo/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { generateRealEstateAgentSchema } from "@/lib/seo/schema"
import type { Metadata } from "next"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

// Metadata global con override desde JSON si existe configuración para home
export const metadata: Metadata = {
  ...defaultMetadata,
  // Configuración de iconos/favicon
  icons: {
    icon: [
      { url: "/logo-lila.png", sizes: "any" },
      { url: "/logo-lila.png", type: "image/png", sizes: "32x32" },
      { url: "/logo-lila.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/logo-lila.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logo-lila.png",
  },
  // Override con configuración específica de home desde JSON si existe
  ...(PAGE_CONFIG.home?.title && {
    title: {
      default: PAGE_CONFIG.home.title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
  }),
  ...(PAGE_CONFIG.home?.description && {
    description: PAGE_CONFIG.home.description,
  }),
  ...(PAGE_CONFIG.home?.keywords && {
    keywords: PAGE_CONFIG.home.keywords,
  }),
  openGraph: {
    ...defaultMetadata.openGraph,
    ...(PAGE_CONFIG.home?.ogImage && {
      images: [{ url: PAGE_CONFIG.home.ogImage }],
    }),
    ...(PAGE_CONFIG.home?.title && {
      title: PAGE_CONFIG.home.title,
    }),
    ...(PAGE_CONFIG.home?.description && {
      description: PAGE_CONFIG.home.description,
    }),
  },
  twitter: {
    ...defaultMetadata.twitter,
    ...(PAGE_CONFIG.home?.title && {
      title: PAGE_CONFIG.home.title,
    }),
    ...(PAGE_CONFIG.home?.description && {
      description: PAGE_CONFIG.home.description,
    }),
  },
}

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
