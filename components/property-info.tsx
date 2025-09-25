import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {  Bath, Car, Ruler, MapPin,  BedDouble, Star } from "lucide-react"
import { useCallback } from "react";

interface PropertyInfoProps {
  title: string
  address: string
  price: number
  currency: string
  propertyType: string
  transactionType: string
  condition: string
  year: number
  rooms: {key: string, value: number}
  status: string
  location: string
  features: {
    bedrooms: number
    bathrooms: number
    garage: number
    coveredArea: number
    totalArea: number
  }
  tags: string[]
}

export function PropertyInfo({ title, address, price, currency, propertyType, transactionType, condition, year, status, location, features, tags, rooms }: PropertyInfoProps) {
  const formatPrice = useCallback((price: number, currency: string) => {
    if (currency === "USD") {
      return `USD ${Math.round(price).toLocaleString('es-AR')}`
    } else {
      return `$ ${Math.round(price).toLocaleString('es-AR')}`
    }
  }, []);

  return (
    <div className="space-y-6">
            {/* Tags */}
{/*             {tags.length > 0 && (
        <div>
          <div className="flex flex-wrap gap-1 items-center">
            <h3 className="font-semibold text-sm mb-3 flex items-center">
             
              <span className="flex items-center h-6">
                <Tag className="h-5 w-5 text-primary" />
              </span>
            </h3>
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-sm bg-transparent text-primary">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )} */}
      <div className="flex flex-wrap gap-1 items-center">

            {propertyType && (
              <Badge variant="secondary" className="text-sm font-medium">
            {propertyType}
          </Badge>
        )}
        <Badge variant="secondary" className="text-sm font-medium">
          {transactionType}
        </Badge>

        {condition && (
          <Badge variant="secondary" className="text-sm font-medium">
            {condition}
          </Badge>
        )}
        {status && (
        <Badge variant="default" className="text-sm font-medium">
        {status}
      </Badge>
    )}
    </div>

      {/* Title and Address */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance">{title}</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{address}{", "}{location}</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl md:text-4xl font-bold text-primary">{formatPrice(price, currency)}</span>
      </div>

      {/* Key Features */}
      <Card>
        <CardContent className="p-">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Características Principales
          </h3>
          <div className="flex flex-row items-stretch justify-between divide-x divide-gray-200  px-2 py-4">
            <div className="flex flex-1 flex-col items-center px-2">
              <BedDouble className="h-6 w-6 text-primary mb-2" />
              <span className="font-semibold">{features.bedrooms}</span>
              <span className="text-sm text-muted-foreground">Dormitorios</span>
            </div>
            <div className="flex flex-1 flex-col items-center px-2">
              <Bath className="h-6 w-6 text-primary mb-2" />
              <span className="font-semibold">{features.bathrooms}</span>
              <span className="text-sm text-muted-foreground">Baños</span>
            </div>
            <div className="flex flex-1 flex-col items-center px-2">
              <Car className="h-6 w-6 text-primary mb-2" />
              <span className="font-semibold">{features.garage}</span>
              <span className="text-sm text-muted-foreground">Cochera</span>
            </div>
            <div className="flex flex-1 flex-col items-center px-2">
              <Ruler className="h-6 w-6 text-primary mb-2" />
              <span className="font-semibold">{features.coveredArea}m²</span>
              <span className="text-sm text-muted-foreground">Sup. Cubierta</span>
            </div>
            <div className="flex flex-1 flex-col items-center px-2">
              <Ruler className="h-6 w-6 text-primary mb-2" />
              <span className="font-semibold">{features.totalArea}m²</span>
              <span className="text-sm text-muted-foreground">Sup. Total</span>
            </div>
          </div>
        </CardContent>
      </Card>


    </div>
  )
}
