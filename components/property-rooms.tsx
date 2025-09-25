"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Car,
  Trees,
  Building,
  Utensils,
  Home,
  Sparkles,
  Building2,
  CookingPot,
  Sofa,
  ChevronUp,
  ChevronDown,
  BedDouble,
  Bath,
  House,
} from "lucide-react"

interface PropertyRoomsProps {
  rooms: Record<string, number>
}

const roomIcons: Record<string, any> = {
  "Dormitorio": BedDouble,
  "Dormitorios": BedDouble,
  "Baño": Bath,
  "Baños": Bath,
  "Cocina": CookingPot,
  "Living": Sofa,
  "Comedor": Utensils,
  "Garage": Car,
  "Cochera": Car,
  "Patio": Trees,
  "Jardín": Trees,
  "Quincho": Home,
  "Balcón": Building2,
  "Terraza": Building,
  default: Sparkles,
}

export function PropertyRooms({ rooms }: PropertyRoomsProps) {
  // Convertimos el objeto rooms a un array de pares [nombre, cantidad]
  const roomEntries = Object.entries(rooms)
  const [showAll, setShowAll] = useState(false)
  const displayedRooms = showAll ? roomEntries : roomEntries.slice(0, 6)
  const hasMore = roomEntries.length > 6

  const getIcon = (roomName: string) => {
    const IconComponent = roomIcons[roomName] || roomIcons.default
    return <IconComponent className="h-4 w-4" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <House className="h-5 w-5 text-primary" />
          Habitaciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {displayedRooms.map(([roomName, value], index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 justify-start text-sm font-medium"
            >
              {getIcon(roomName)}
              <span>
                {roomName}
                {typeof value === "number" && value > 1
                  ? ` (${value})`
                  : value === 1
                  ? ""
                  : ""}
              </span>
            </div>
          ))}
        </div>

        {hasMore && (
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-4 flex items-center gap-2"
          >
            {showAll ? (
              <>
                Ver menos <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Ver más habitaciones ({roomEntries.length - 6} más) <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
