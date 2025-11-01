import type { Metadata } from "next"
import { Property } from "@/lib/types/properties"
import seoConfig from "@/lib/config/seoConfig.json"

// Configuración del sitio desde JSON
export const SITE_CONFIG = {
  name: seoConfig.global.siteName,
  description: seoConfig.global.siteDescription,
  url: process.env.NEXT_PUBLIC_SITE_URL || seoConfig.global.siteUrl,
  locale: seoConfig.global.defaultLocale,
  twitterHandle: seoConfig.global.twitterHandle || undefined,
}

// Configuración del agente desde JSON
export const AGENT_CONFIG = seoConfig.agent

// Configuración por página desde JSON
export const PAGE_CONFIG = seoConfig.pages

// Helper para formatear precios
function formatPrice(price: number, currency: string): string {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency === "USD" ? "USD" : "ARS",
    minimumFractionDigits: 0,
  })
  return formatter.format(price)
}

// Helper para obtener tipo de operación en texto
function getOperationText(transactionType: string): string {
  const operations: Record<string, string> = {
    venta: "en venta",
    alquiler: "en alquiler",
    alquiler_temporario: "en alquiler temporario",
  }
  return operations[transactionType] || "disponible"
}

// Helper para obtener tipo de propiedad en texto
function getPropertyTypeText(propertyType: string): string {
  const types: Record<string, string> = {
    casa: "Casa",
    departamento: "Departamento",
    terreno: "Terreno",
    lote: "Lote",
    local_comercial: "Local Comercial",
    oficina: "Oficina",
    campo: "Campo",
    deposito: "Depósito",
    galpon: "Galpón",
  }
  return types[propertyType] || propertyType
}

// Helper para truncar texto
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + "..."
}

// Generar metadata para página de propiedad individual
export function generatePropertyMetadata(property: Property): Metadata {
  const title = `${getPropertyTypeText(property.propertyType)} ${getOperationText(property.transactionType)} en ${property.location} | ${formatPrice(property.price, property.currency)}`
  const description = truncate(
    `Propiedad ${getPropertyTypeText(property.propertyType).toLowerCase()} ${getOperationText(property.transactionType)} en ${property.location}. ${property.features.bedrooms} dormitorios, ${property.features.bathrooms} baños. ${property.features.coveredArea ? `${property.features.coveredArea}m² cubiertos.` : ""} ${property.description ? truncate(property.description, 100) : ""}`,
    160
  )

  const imageUrl = property.image || property.gallery?.[0]?.url || `${SITE_CONFIG.url}/placeholder.jpg`
  const fullImageUrl = imageUrl.startsWith("http") ? imageUrl : `${SITE_CONFIG.url}${imageUrl}`
  const propertyUrl = `${SITE_CONFIG.url}/propiedad/${property._id || property.id}`

  return {
    title,
    description,
    alternates: {
      canonical: propertyUrl,
    },
    openGraph: {
      title,
      description,
      url: propertyUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "website",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: property.title || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
      creator: SITE_CONFIG.twitterHandle,
    },
    keywords: [
      property.propertyType,
      property.transactionType,
      property.location,
      `propiedad en ${property.location}`,
      `${getPropertyTypeText(property.propertyType).toLowerCase()} ${getOperationText(property.transactionType)}`,
      ...(property.tags || []),
    ],
  }
}

// Generar metadata para página de listado de propiedades
export function generatePropertiesListMetadata(
  filters?: { transactionType?: string; propertyType?: string; location?: string },
  count?: number
): Metadata {
  const filterParts: string[] = []
  
  if (filters?.transactionType && filters.transactionType !== "all") {
    filterParts.push(getOperationText(filters.transactionType))
  }
  if (filters?.propertyType && filters.propertyType !== "all") {
    filterParts.push(getPropertyTypeText(filters.propertyType).toLowerCase() + "s")
  }
  if (filters?.location && filters.location !== "all") {
    filterParts.push(`en ${filters.location}`)
  }

  const title = filterParts.length > 0
    ? `Propiedades ${filterParts.join(" ")} | ${SITE_CONFIG.name}`
    : `Propiedades Disponibles | ${SITE_CONFIG.name}`

  const description = count !== undefined
    ? `Explora ${count} ${count === 1 ? "propiedad" : "propiedades"} disponible${count === 1 ? "" : "s"}${filterParts.length > 0 ? ` ${filterParts.join(" ")}` : ""}. Encuentra tu hogar ideal con ${SITE_CONFIG.name}.`
    : `Explora nuestra selección de propiedades ${filterParts.join(" ") || "disponibles"}. Casas, departamentos, terrenos y más.`

  return {
    title,
    description: truncate(description, 160),
    alternates: {
      canonical: `${SITE_CONFIG.url}/propiedades`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/propiedades`,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
      creator: SITE_CONFIG.twitterHandle,
    },
  }
}

// Metadata por defecto para el sitio
export const defaultMetadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: seoConfig.global.defaultKeywords || [
    "inmobiliaria",
    "propiedades",
    "casas en venta",
    "departamentos en alquiler",
    "terrenos",
    "bienes raíces",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    ...(seoConfig.global.defaultOgImage && {
      images: [{ url: seoConfig.global.defaultOgImage }],
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

