"use client"

import { useCallback, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Bed, Bath, Car, Maximize, MapPin } from "lucide-react"
import Link from "next/link"
import { FaWhatsapp } from "react-icons/fa"
interface PropertyCardProps {
  id: string
  title: string
  price: number 
  currency: string
  location: string
  image: string
  features: {
    bedrooms: number
    bathrooms: number
    coveredArea: number
    totalArea: number
    garage: number
  }
  isNew?: boolean
  isFeatured?: boolean
  publishedDays: number
  tags?: string[]
}

export function PropertyCard({
  id,
  title,
  price,
  currency,
  location,
  image,
features,
  isNew = false,
  isFeatured = false,
  publishedDays,
  tags = [],
}: PropertyCardProps) {
  const { bedrooms, bathrooms, coveredArea, totalArea, garage } = features
const formatPrice = useCallback((price: number, currency: string) => {
  if (currency === "USD") {
    return `USD ${Math.round(price).toLocaleString('es-AR')}`
  } else {
    return `$ ${Math.round(price).toLocaleString('es-AR')}`
  }
}, [])
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
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-card border-border/50 hover:border-primary/20 pt-0">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-48 object-cover "
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && <Badge className="bg-accent text-accent-foreground font-medium">Nuevo</Badge>}
          {isFeatured && <Badge className="bg-primary text-primary-foreground font-medium">Destacado</Badge>}
        </div>

        {/* Favorite Button */}
{/*         <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white text-foreground shadow-sm"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-primary text-primary" : ""}`} />
        </Button> */}

        {/* Floating CTA on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2 justify-end">
            <Button onClick={handleWhatsAppContact} className=" bg-primary hover:bg-primary text-white cursor-pointer">
              <FaWhatsapp className="h-4 w-4" />
              
            </Button>
            <Button variant="secondary" onClick={handleShare} className="bg-white/95 hover:bg-white text-foreground cursor-pointer">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Link href={`/propiedad/${id}`} target="_blank" className="block cursor-pointer">
      <CardContent className="p-4">

        <div className="space-y-3">
          {/* Price */}
{price !== 0 ? ( <div className="text-2xl font-bold text-primary">{formatPrice(price, currency)}</div>):(
  <div  className="w-full  bg-transparent border-primary/20 font-bold text-primary">
            Consultar precio
          </div>)}
          

          {/* Title */}
          <h3 className="font-semibold text-card-foreground line-clamp-2 text-balance">{title}</h3>

          {/* Location */}
          <p className="flex items-center gap-2 text-foreground text-sm"><MapPin className="h-4 w-4" /> 
          <span> {location}</span>
          </p>

          {/* Amenities */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
{coveredArea > 0 &&            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{coveredArea}m² cubiertos</span>
            </div>}
{totalArea > 0 &&            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{totalArea}m² totales</span>
            </div>}
{bedrooms > 0 &&            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{bedrooms}</span>
            </div>}
{bathrooms > 0 &&            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{bathrooms}</span>
            </div>}

            {garage > 0 && (
              <div className="flex items-center gap-1">
                <Car className="h-4 w-4" />
                <span>{garage}</span>
              </div>
            )}
          </div>


          {/* Tags */}
{/*           {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          )} */}
          {/* Published time */}
{/*           <p className="text-xs text-muted-foreground">Publicado hace {publishedDays} días</p> */}

          {/* View Detail Message */}
          <p className="mt-auto mx-auto border-primary/20 text-primary opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-4 left-1/2 -translate-x-1/2">
            Ver detalle
          </p>
        </div>
      </CardContent>
    </Link>
    </Card>

  )
}
