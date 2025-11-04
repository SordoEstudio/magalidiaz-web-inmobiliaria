"use client"

import { PropertyMap } from "@/components/property-gallery-v2"
import { PropertyMapAlternatives, RecommendedPropertyMap, GooglePropertyMap } from "@/components/property-map-alternatives"

// Datos de ejemplo
const sampleProperty = {
  address: "Av. Corrientes 1234, San Vicente, Santa Fe",
  coordinates: {
    lat: -34.6037,
    lng: -58.3816
  },
  googleMapsLink: "https://www.google.com/maps/place/Av.+Corrientes+1234,+San+Vicente,+Santa+Fe"
}

export function MapExamples() {
  return (
    <div className="space-y-12 py-16">
      {/* Mapa recomendado (OpenStreetMap - gratuito) */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Mapa Recomendado (OpenStreetMap)</h2>
        <RecommendedPropertyMap
          address={sampleProperty.address}
          coordinates={sampleProperty.coordinates}
        />
      </section>

      {/* Google Maps */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Google Maps</h2>
        <GooglePropertyMap
          address={sampleProperty.address}
          coordinates={sampleProperty.coordinates}
        />
      </section>

      {/* Mapa estático */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Mapa Estático</h2>
        <PropertyMapAlternatives
          address={sampleProperty.address}
          coordinates={sampleProperty.coordinates}
          mapProvider="openstreetmap"
          mapType="static"
          showFullscreen={true}
          height="h-[250px]"
        />
      </section>

      {/* Mapa compacto */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Mapa Compacto</h2>
        <PropertyMapAlternatives
          address={sampleProperty.address}
          coordinates={sampleProperty.coordinates}
          mapProvider="openstreetmap"
          mapType="static"
          showFullscreen={false}
          height="h-[200px]"
        />
      </section>
    </div>
  )
}

// Ejemplo de uso en página de propiedad
export function PropertyPageMap({ property }: { property: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Mapa principal */}
      <RecommendedPropertyMap
        address={property.address}
        coordinates={property.coordinates}
      />
      
      {/* Información adicional */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Información de Ubicación</h3>
        <p className="text-muted-foreground">{property.address}</p>
        <p className="text-sm text-muted-foreground">
          Coordenadas: {property.coordinates?.lat}, {property.coordinates?.lng}
        </p>
      </div>
    </div>
  )
}

// Ejemplo de uso en card de propiedad
export function PropertyCardMap({ property }: { property: any }) {
  return (
    <PropertyMapAlternatives
      address={property.address}
      coordinates={property.coordinates}
      mapProvider="openstreetmap"
      mapType="static"
      showFullscreen={false}
      height="h-[150px]"
      className="mb-4"
    />
  )
}
