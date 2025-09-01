"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Bed, Bath, Car, Maximize } from "lucide-react"

interface PropertyCardProps {
  id: string
  title: string
  price: string
  location: string
  image: string
  bedrooms: number
  bathrooms: number
  area: number
  hasGarage: boolean
  isNew?: boolean
  isFeatured?: boolean
  publishedDays: number
}

export function PropertyCard({
  id,
  title,
  price,
  location,
  image,
  bedrooms,
  bathrooms,
  area,
  hasGarage,
  isNew = false,
  isFeatured = false,
  publishedDays,
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleWhatsAppContact = () => {
    const message = `Hola! Me interesa la propiedad: ${title} - ${price}`
    const whatsappUrl = `https://wa.me/5491123456789?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `${title} - ${price}`,
        url: window.location.href + `/propiedad/${id}`,
      })
    } else {
      navigator.clipboard.writeText(window.location.href + `/propiedad/${id}`)
    }
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-card border-border">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && <Badge className="bg-accent text-accent-foreground font-medium">Nuevo</Badge>}
          {isFeatured && <Badge className="bg-primary text-primary-foreground font-medium">Destacado</Badge>}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-foreground"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-accent text-accent" : ""}`} />
        </Button>

        {/* Floating CTA on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <Button onClick={handleWhatsAppContact} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button variant="secondary" onClick={handleShare} className="bg-white/90 hover:bg-white text-foreground">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Price */}
          <div className="text-2xl font-bold text-primary">{price}</div>

          {/* Title */}
          <h3 className="font-semibold text-card-foreground line-clamp-2 text-balance">{title}</h3>

          {/* Location */}
          <p className="text-muted-foreground text-sm">📍 {location}</p>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{area}m²</span>
            </div>
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{bathrooms}</span>
            </div>
            {hasGarage && (
              <div className="flex items-center gap-1">
                <Car className="h-4 w-4" />
                <span>Cochera</span>
              </div>
            )}
          </div>

          {/* Published time */}
          <p className="text-xs text-muted-foreground">Publicado hace {publishedDays} días</p>

          {/* View Details Button */}
          <Button variant="outline" className="w-full mt-3 bg-transparent">
            Ver detalle
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
