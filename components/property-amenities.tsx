"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Snowflake,
  Flame,
  Wifi,
  Car,
  Waves,
  Trees,
  Building,
  Droplet,
  Droplets,
  FlameKindling,
  Tv,
  Home,
  Sparkles,
  Building2,
  CookingPot,
  PawPrint,
  Sofa,
  Accessibility,
  Sun,
  ChevronUp,
  ChevronDown,
} from "lucide-react"

interface PropertyAmenitiesProps {
  amenities: string[]
}

const amenityIcons: Record<string, any> = {
"Aire acondicionado": Snowflake,
  "Calefacción": Sun,
  "Gas natural": Flame,
  "Agua corriente": Droplet,
  "Cloacas": Droplets,
  "Internet / WiFi": Wifi,
  "Cable / TV satelital": Tv,
  "Balcón": Building2,
  "Terraza": Building,
  "Jardín": Trees,
  "Patio": Trees,
  "Quincho": Home,
  "Parrilla": FlameKindling,
  "Piscina": Waves,
  "Solárium": Sun,
  "Cochera cubierta": Car,
  "Cochera descubierta": Car,
  "Acceso para personas con movilidad reducida": Accessibility,
  "Amoblado": Sofa,
  "Mascotas permitidas": PawPrint,
  "Cocina equipada": CookingPot,
  default: Sparkles,
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  const [showAll, setShowAll] = useState(false)
  const displayedAmenities = showAll ? amenities : amenities.slice(0, 6)
  const hasMore = amenities.length > 6

  const getIcon = (amenity: string) => {
    const IconComponent = amenityIcons[amenity] || amenityIcons.default
    return <IconComponent className="h-4 w-4" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Amenidades y Extras
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {displayedAmenities.map((amenity, index) => (
            <div
              key={index}
            
              className="flex items-center gap-2 p-3 justify-start text-sm font-medium"
            >
              {getIcon(amenity)}
              {amenity}
            </div>
          ))}
        </div>

        {hasMore && (
          <Button variant="ghost" onClick={() => setShowAll(!showAll)} className="w-full mt-4 flex items-center gap-2">
            {showAll ? (
              <>
                Ver menos <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Ver más amenidades ({amenities.length - 6} más) <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
