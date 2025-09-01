"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Waves,
  Trees,
  Flame,
  Snowflake,
  Wifi,
  Shield,
  Car,
  Dumbbell,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react"

interface PropertyAmenitiesProps {
  amenities: string[]
}

const amenityIcons: Record<string, any> = {
  Pileta: Waves,
  Jardín: Trees,
  Parrilla: Flame,
  "Aire Acondicionado": Snowflake,
  WiFi: Wifi,
  Seguridad: Shield,
  Cochera: Car,
  Gimnasio: Dumbbell,
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
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-2 p-3 justify-start text-sm font-medium"
            >
              {getIcon(amenity)}
              {amenity}
            </Badge>
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
