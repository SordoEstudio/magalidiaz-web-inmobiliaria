"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink, Navigation, Maximize2, X } from "lucide-react"

interface PropertyMapProps {
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
  googleMapsLink?: string
  mapType?: 'iframe' | 'static' | 'embed'
  showFullscreen?: boolean
  height?: string
  className?: string
}

export function PropertyMap({ 
  address, 
  coordinates, 
  googleMapsLink,
  mapType = 'iframe',
  showFullscreen = true,
  height = 'h-[300px]',
  className = ''
}: PropertyMapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Generar URL de Google Maps embebido
  const getEmbedUrl = () => {
    if (googleMapsLink) {
      // Si ya tenemos un link de Google Maps, lo convertimos a embed
      const embedUrl = googleMapsLink.replace('/maps/place/', '/maps/embed/v1/place?q=')
      return embedUrl
    }
    
    if (coordinates) {
      // Generar URL embebido desde coordenadas
      return `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${coordinates.lat},${coordinates.lng}&zoom=15&maptype=roadmap`
    }
    
    // Fallback: buscar por dirección
    const encodedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`
  }

  // Generar URL de Google Maps estático
  const getStaticMapUrl = () => {
    if (coordinates) {
      return `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=15&size=800x400&markers=color:red%7C${coordinates.lat},${coordinates.lng}&key=YOUR_API_KEY`
    }
    
    const encodedAddress = encodeURIComponent(address)
    return `https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=15&size=800x400&markers=color:red%7C${encodedAddress}&key=YOUR_API_KEY`
  }

  // Generar link para abrir en Google Maps
  const getGoogleMapsLink = () => {
    if (googleMapsLink) return googleMapsLink
    
    if (coordinates) {
      return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
    }
    
    const encodedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
  }

  // Renderizar mapa según el tipo
  const renderMap = () => {
    switch (mapType) {
      case 'static':
        return (
          <div className="relative w-full h-full">
            <img
              src={getStaticMapUrl()}
              alt={`Mapa de ${address}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors cursor-pointer"
                 onClick={() => window.open(getGoogleMapsLink(), '_blank')}>
            </div>
          </div>
        )
      
      case 'embed':
        return (
          <iframe
            src={getEmbedUrl()}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        )
      
      case 'iframe':
      default:
        return (
          <iframe
            src={getGoogleMapsLink()}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        )
    }
  }

  // Modal fullscreen
  const fullscreenModal = isFullscreen ? (
    <div className="fixed inset-0 z-50 bg-black/95">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20 z-20 cursor-pointer"
          onClick={() => setIsFullscreen(false)}
          aria-label="Cerrar mapa"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Fullscreen map */}
        <div className="w-[95vw] h-[95vh] rounded-lg overflow-hidden">
          {renderMap()}
        </div>

        {/* Address overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
          <p className="font-medium">{address}</p>
        </div>
      </div>
    </div>
  ) : null

  return (
    <>
      <Card className={`${className} pb-0` }>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex-row items-center ">

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Ubicación
            </div>
            <p className="text-black font-medium pt-2">{address}</p>
  
            </div>


            <div className="flex gap-2">
              {showFullscreen && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFullscreen(true)}
                  className="text-xs cursor-pointer"
                >
                  <Maximize2 className="h-3 w-3 mr-1" />
                  Pantalla completa
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(getGoogleMapsLink(), '_blank')}
                className="text-xs cursor-pointer"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Abrir en Maps
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className={`relative w-full ${height} overflow-hidden rounded-b-lg`}>
            {renderMap()}
            
            {/* Address overlay */}
{/*             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-white font-medium">{address}</p>
            </div> */}
          </div>
        </CardContent>
      </Card>
      
      {fullscreenModal}
    </>
  )
}

// Componente simplificado para uso rápido
export function SimplePropertyMap({ 
  address, 
  coordinates, 
  googleMapsLink 
}: { 
  address: string
  coordinates?: { lat: number; lng: number }
  googleMapsLink?: string 
}) {
  return (
    <PropertyMap
      address={address}
      coordinates={coordinates}
      googleMapsLink={googleMapsLink}
      mapType="iframe"
      showFullscreen={false}
      height="h-[250px]"
    />
  )
}

// Componente para cards compactos
export function CompactPropertyMap({ 
  address, 
  coordinates, 
  googleMapsLink 
}: { 
  address: string
  coordinates?: { lat: number; lng: number }
  googleMapsLink?: string 
}) {
  return (
    <PropertyMap
      address={address}
      coordinates={coordinates}
      googleMapsLink={googleMapsLink}
      mapType="static"
      showFullscreen={true}
      height="h-[200px]"
    />
  )
}
