import type { Metadata } from "next"
import { generatePropertiesListMetadata } from "@/lib/seo/metadata"
import { PAGE_CONFIG } from "@/lib/seo/metadata"

export const metadata: Metadata = {
  ...generatePropertiesListMetadata(),
  // Override con configuración específica de la página desde JSON si existe
  ...(PAGE_CONFIG.propiedades?.title && {
    title: PAGE_CONFIG.propiedades.title,
  }),
  ...(PAGE_CONFIG.propiedades?.description && {
    description: PAGE_CONFIG.propiedades.description,
  }),
  ...(PAGE_CONFIG.propiedades?.keywords && {
    keywords: PAGE_CONFIG.propiedades.keywords,
  }),
  openGraph: {
    ...generatePropertiesListMetadata().openGraph,
    ...(PAGE_CONFIG.propiedades?.ogImage && {
      images: [{ url: PAGE_CONFIG.propiedades.ogImage }],
    }),
  },
}

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

