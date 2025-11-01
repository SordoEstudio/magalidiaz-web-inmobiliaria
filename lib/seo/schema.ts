import { Property } from "@/lib/types/properties"
import { SITE_CONFIG, AGENT_CONFIG } from "./metadata"

// Schema.org types
export interface SchemaOrganization {
  "@context": "https://schema.org"
  "@type": "RealEstateAgent"
  name: string
  url: string
  logo?: string
  description?: string
  address?: {
    "@type": "PostalAddress"
    addressCountry: string
    addressLocality: string
  }
  contactPoint?: {
    "@type": "ContactPoint"
    contactType: string
    telephone?: string
    email?: string
  }
}

export interface SchemaProduct {
  "@context": "https://schema.org"
  "@type": "Product"
  name: string
  description: string
  image: string[]
  offers: {
    "@type": "Offer"
    price: string
    priceCurrency: string
    availability: "https://schema.org/InStock" | "https://schema.org/SoldOut" | "https://schema.org/PreOrder"
    url: string
  }
  additionalProperty?: Array<{
    "@type": "PropertyValue"
    name: string
    value: string | number
  }>
}

export interface SchemaBreadcrumbList {
  "@context": "https://schema.org"
  "@type": "BreadcrumbList"
  itemListElement: Array<{
    "@type": "ListItem"
    position: number
    name: string
    item: string
  }>
}

// Generar schema de RealEstateAgent para el sitio
export function generateRealEstateAgentSchema(): SchemaOrganization {
  const address = AGENT_CONFIG.agentAddress
  
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: AGENT_CONFIG.agentName || SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    email: AGENT_CONFIG.agentEmail,
    telephone: AGENT_CONFIG.agentPhone,
    address: address?.city || address?.country ? {
      "@type": "PostalAddress" as const,
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      addressCountry: address.country,
      postalCode: address.postalCode,
    } : undefined,
  }
}

// Generar schema de Product para una propiedad
export function generatePropertySchema(property: Property): SchemaProduct {
  const imageUrl = property.image || property.gallery?.[0]?.url || ""
  const fullImageUrl = imageUrl.startsWith("http") ? imageUrl : `${SITE_CONFIG.url}${imageUrl}`
  const propertyUrl = `${SITE_CONFIG.url}/propiedad/${property._id || property.id}`

  const availabilityMap: Record<string, "https://schema.org/InStock" | "https://schema.org/SoldOut" | "https://schema.org/PreOrder"> = {
    disponible: "https://schema.org/InStock",
    reservado: "https://schema.org/PreOrder",
    vendido: "https://schema.org/SoldOut",
    alquilado: "https://schema.org/SoldOut",
  }

  const additionalProperties = [
    {
      "@type": "PropertyValue" as const,
      name: "Tipo de Propiedad",
      value: property.propertyType,
    },
    {
      "@type": "PropertyValue" as const,
      name: "Tipo de Transacción",
      value: property.transactionType,
    },
    {
      "@type": "PropertyValue" as const,
      name: "Ubicación",
      value: property.location,
    },
    {
      "@type": "PropertyValue" as const,
      name: "Dormitorios",
      value: property.features.bedrooms.toString(),
    },
    {
      "@type": "PropertyValue" as const,
      name: "Baños",
      value: property.features.bathrooms.toString(),
    },
  ]

  if (property.features.coveredArea) {
    additionalProperties.push({
      "@type": "PropertyValue" as const,
      name: "Superficie Cubierta",
      value: `${property.features.coveredArea} m²`,
    })
  }

  if (property.features.totalArea) {
    additionalProperties.push({
      "@type": "PropertyValue" as const,
      name: "Superficie Total",
      value: `${property.features.totalArea} m²`,
    })
  }

  if (property.features.garage > 0) {
    additionalProperties.push({
      "@type": "PropertyValue" as const,
      name: "Garages",
      value: property.features.garage.toString(),
    })
  }

  const allImages = [
    ...(property.image ? [property.image] : []),
    ...(property.gallery?.map((img) => img.url) || []),
  ].filter(Boolean).map((img) => 
    img.startsWith("http") ? img : `${SITE_CONFIG.url}${img}`
  )

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.description || `${property.propertyType} ${property.transactionType} en ${property.location}`,
    image: allImages.length > 0 ? allImages : [fullImageUrl],
    offers: {
      "@type": "Offer",
      price: property.price.toString(),
      priceCurrency: property.currency === "USD" ? "USD" : "ARS",
      availability: availabilityMap[property.status] || "https://schema.org/InStock",
      url: propertyUrl,
    },
    additionalProperty: additionalProperties,
  }
}

// Generar BreadcrumbList schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): SchemaBreadcrumbList {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  }
}

// Helper para generar breadcrumbs de propiedad
export function generatePropertyBreadcrumbs(property: Property): SchemaBreadcrumbList {
  return generateBreadcrumbSchema([
    { name: "Inicio", url: "/" },
    { name: "Propiedades", url: "/propiedades" },
    {
      name: property.title,
      url: `/propiedad/${property._id || property.id}`,
    },
  ])
}

