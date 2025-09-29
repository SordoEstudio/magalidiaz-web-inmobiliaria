"use client"

import { use } from "react"
import { PropertyInfo } from "@/components/property-info"
import { PropertyDescription } from "@/components/property-description"
import { PropertyAmenities } from "@/components/property-amenities"
import { PropertyContact } from "@/components/property-contact"
import { PropertyGallery } from "@/components/property-gallery-v2"
import { PropertyMap } from "@/components/property-map-v2"
import { PropertyRooms } from "@/components/property-rooms"
import { useProperty } from "@/lib/hooks/useProperties"

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  // Unwrap params using React.use()
  const { id } = use(params)
  
  // Usar hook de API para obtener la propiedad específica
  const { property, loading, error } = useProperty(id)

  // Mostrar loading
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando propiedad...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Mostrar error si hay problema
  if (error || !property) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Error al cargar la propiedad o propiedad no encontrada.</p>
              <a href="/propiedades" className="text-primary hover:underline">
                Volver a propiedades
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <PropertyGallery
              gallery={property.gallery}
              title={property.title}
              mode="embedded"
              showThumbnails={true}
              showCounter={true}
              showFullscreenButton={true}
            />
            
            {/* Property Info */}
              <PropertyInfo {...property} />
            
            {/* Rooms */}
            <PropertyRooms rooms={property.rooms} />
            
            {/* Description */}
            <PropertyDescription description={property.description} />

            {/* Map */}
            <PropertyMap 
              address={property.address} 
              coordinates={property.coordinates} 
              googleMapsLink={property.addressLink} 
            />

            {/* Amenities */}
            <PropertyAmenities amenities={property.amenities} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <PropertyContact
              whatsappNumber="5491123456789"
              phoneNumber="+54 11 2345-6789"
              propertyTitle={property.title}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
