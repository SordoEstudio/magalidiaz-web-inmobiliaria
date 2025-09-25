"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink, Navigation, Maximize2, Map } from "lucide-react"

interface PropertyMapProps {
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
  mapProvider?: 'google' | 'openstreetmap' | 'mapbox' | 'here'
  mapType?: 'interactive' | 'static' | 'embed'
  showFullscreen?: boolean
  height?: string
  className?: string
}

export function PropertyMapAlternatives({ 
  address, 
  coordinates, 
  mapProvider = 'google',
  mapType = 'interactive',
  showFullscreen = true,
  height = 'h-[300px]',
  className = ''
}: PropertyMapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  // OpenStreetMap (gratuito, sin API key)
  const getOpenStreetMapUrl = () => {
    if (coordinates) {
      return `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng-0.01},${coordinates.lat-0.01},${coordinates.lng+0.01},${coordinates.lat+0.01}&layer=mapnik&marker=${coordinates.lat},${coordinates.lng}`
    }
    
    const encodedAddress = encodeURIComponent(address)
    return `https://www.openstreetmap.org/search?query=${encodedAddress}`
  }

  // Mapbox (requiere API key)
  const getMapboxUrl = () => {
    if (coordinates) {
      return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${coordinates.lng},${coordinates.lat})/${coordinates.lng},${coordinates.lat},15,0/800x400@2x?access_token=YOUR_MAPBOX_TOKEN`
    }
    
    const encodedAddress = encodeURIComponent(address)
    return `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=YOUR_MAPBOX_TOKEN`
  }

  // HERE Maps (requiere API key)
  const getHereMapUrl = () => {
    if (coordinates) {
      return `https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=YOUR_HERE_API_KEY&c=${coordinates.lat},${coordinates.lng}&z=15&w=800&h=400&f=0&style=normal`
    }
    
    const encodedAddress = encodeURIComponent(address)
    return `https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=YOUR_HERE_API_KEY&q=${encodedAddress}&z=15&w=800&h=400&f=0&style=normal`
  }

  // Google Maps (requiere API key)
  const getGoogleMapsUrl = () => {
    if (coordinates) {
      return `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${coordinates.lat},${coordinates.lng}&zoom=15&maptype=roadmap`
    }
    
    const encodedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`
  }

  // Generar link para abrir en el proveedor correspondiente
  const getExternalLink = () => {
    switch (mapProvider) {
      case 'openstreetmap':
        if (coordinates) {
          return `https://www.openstreetmap.org/?mlat=${coordinates.lat}&mlon=${coordinates.lng}&zoom=15`
        }
        return `https://www.openstreetmap.org/search?query=${encodeURIComponent(address)}`
      
      case 'mapbox':
        if (coordinates) {
          return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${coordinates.lng},${coordinates.lat})/${coordinates.lng},${coordinates.lat},15,0/800x400@2x?access_token=YOUR_MAPBOX_TOKEN`
        }
        return `https://www.mapbox.com/`
      
      case 'here':
        if (coordinates) {
          return `https://wego.here.com/directions/mix/${coordinates.lat},${coordinates.lng}`
        }
        return `https://wego.here.com/search/${encodeURIComponent(address)}`
      
      case 'google':
      default:
        if (coordinates) {
          return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
        }
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    }
  }

  // Renderizar mapa según el proveedor y tipo
  const renderMap = () => {
    const mapUrl = (() => {
      switch (mapProvider) {
        case 'openstreetmap':
          return getOpenStreetMapUrl()
        case 'mapbox':
          return getMapboxUrl()
        case 'here':
          return getHereMapUrl()
        case 'google':
        default:
          return getGoogleMapsUrl()
      }
    })()

    if (mapType === 'static') {
      return (
        <div className="relative w-full h-full">
          <img
            src={mapUrl}
            alt={`Mapa de ${address}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback a OpenStreetMap si falla
              if (mapProvider !== 'openstreetmap') {
                e.currentTarget.src = getOpenStreetMapUrl()
              }
            }}
          />
          <div 
            className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors cursor-pointer"
            onClick={() => window.open(getExternalLink(), '_blank')}
          />
        </div>
      )
    }

    return (
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
        onError={() => {
          // Fallback a OpenStreetMap si falla
          if (mapProvider !== 'openstreetmap') {
            window.location.reload()
          }
        }}
      />
    )
  }

  // Modal fullscreen
  const fullscreenModal = isFullscreen ? (
    <div className="fixed inset-0 z-50 bg-black/95">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20 z-20"
          onClick={() => setIsFullscreen(false)}
          aria-label="Cerrar mapa"
        >
          <Navigation className="h-6 w-6" />
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

  const getProviderName = () => {
    switch (mapProvider) {
      case 'openstreetmap': return 'OpenStreetMap'
      case 'mapbox': return 'Mapbox'
      case 'here': return 'HERE Maps'
      case 'google': return 'Google Maps'
      default: return 'Mapa'
    }
  }

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Ubicación
              <span className="text-xs text-muted-foreground ml-2">
                ({getProviderName()})
              </span>
            </div>
            <div className="flex gap-2">
              {showFullscreen && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFullscreen(true)}
                  className="text-xs"
                >
                  <Maximize2 className="h-3 w-3 mr-1" />
                  Pantalla completa
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(getExternalLink(), '_blank')}
                className="text-xs"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Abrir en {getProviderName()}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className={`relative w-full ${height} overflow-hidden rounded-b-lg`}>
            {renderMap()}
            
            {/* Address overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-white font-medium">{address}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {fullscreenModal}
    </>
  )
}

// Componente recomendado para uso general (OpenStreetMap - gratuito)
export function RecommendedPropertyMap({ 
  address, 
  coordinates 
}: { 
  address: string
  coordinates?: { lat: number; lng: number }
}) {
  return (
    <PropertyMapAlternatives
      address={address}
      coordinates={coordinates}
      mapProvider="openstreetmap"
      mapType="interactive"
      showFullscreen={true}
      height="h-[300px]"
    />
  )
}

// Componente para uso con Google Maps (requiere API key)
export function GooglePropertyMap({ 
  address, 
  coordinates 
}: { 
  address: string
  coordinates?: { lat: number; lng: number }
}) {
  return (
    <PropertyMapAlternatives
      address={address}
      coordinates={coordinates}
      mapProvider="google"
      mapType="interactive"
      showFullscreen={true}
      height="h-[300px]"
    />
  )
}
