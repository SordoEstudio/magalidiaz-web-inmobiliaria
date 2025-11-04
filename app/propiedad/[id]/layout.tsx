import Link from "next/link"
import type { Metadata } from "next"
import { getPropertyById } from "@/lib/api/properties"
import { generatePropertyMetadata } from "@/lib/seo/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { generatePropertySchema, generatePropertyBreadcrumbs } from "@/lib/seo/schema"
import Image from "next/image"

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
          <div className="flex items-start justify-start">

<div className="flex items-center space-x-2">
             {/* Logo */}
            <Link href="/">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo-img-lila.png"
                alt="Magali Diaz Asesor Inmobiliario"
                width={50}
                height={50}
                className={"rounded-full"}
                priority
              />
            </div>
          </Link>
          <div className="flex flex-col">
            <span className="text-lg font-bold">  
              MAGALÍ DIAZ
              </span>
           <span className="text-sm text-muted-foreground">
             Asesor Inmobiliario
           </span>
          </div>
  </div> 
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
