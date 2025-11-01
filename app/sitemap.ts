import { MetadataRoute } from "next"
import { getAllProperties } from "@/lib/api/properties"
import { SITE_CONFIG } from "@/lib/seo/metadata"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url

  // URLs estáticas
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/propiedades`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
  ]

  // Obtener propiedades dinámicamente
  let propertyRoutes: MetadataRoute.Sitemap = []

  try {
    const properties = await getAllProperties()

    propertyRoutes = properties.map((property) => ({
      url: `${baseUrl}/propiedad/${property._id || property.id}`,
      lastModified: property.updatedAt 
        ? new Date(property.updatedAt)
        : property.publishedAt 
        ? new Date(property.publishedAt)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: property.isFeatured ? 0.8 : 0.7,
    }))
  } catch (error) {
    console.error("Error generando sitemap de propiedades:", error)
    // Continuar con rutas estáticas aunque falle la carga de propiedades
  }

  return [...staticRoutes, ...propertyRoutes]
}

