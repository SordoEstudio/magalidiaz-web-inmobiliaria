import Link from "next/link"
import type { Metadata } from "next"
import { getPropertyById } from "@/lib/api/properties"
import { generatePropertyMetadata } from "@/lib/seo/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { generatePropertySchema, generatePropertyBreadcrumbs } from "@/lib/seo/schema"

interface PropertyLayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PropertyLayoutProps): Promise<Metadata> {
  const { id } = await params
  
  try {
    const property = await getPropertyById(id)
    return generatePropertyMetadata(property)
  } catch (error) {
    console.error("Error generando metadata de propiedad:", error)
    // Metadata por defecto si falla la carga
    return {
      title: "Propiedad | Inmobiliaria",
      description: "Detalle de propiedad",
    }
  }
}

export default async function PropertyLayout({ children, params }: PropertyLayoutProps) {
  const { id } = await params
  
  // Obtener propiedad para schema (opcional, solo si está disponible)
  let propertySchema = null
  let breadcrumbSchema = null
  
  try {
    const property = await getPropertyById(id)
    propertySchema = generatePropertySchema(property)
    breadcrumbSchema = generatePropertyBreadcrumbs(property)
  } catch (error) {
    // Si falla, continuar sin schema
    console.warn("No se pudo cargar propiedad para schema:", error)
  }

  return (
    <div>
      {/* Schema.org JSON-LD */}
      {propertySchema && <JsonLd data={[propertySchema, breadcrumbSchema].filter(Boolean)} />}
      
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">I</span>
                </div>
                <span className="text-xl font-bold text-foreground">Inmobiliaria</span>
              </div>
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
