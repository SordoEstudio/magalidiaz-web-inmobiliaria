import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Bed, Bath, Car, Ruler, MapPin, Tag } from "lucide-react"

interface PropertyInfoProps {
  title: string
  address: string
  price: string
  type: "venta" | "alquiler"
  features: {
    bedrooms: number
    bathrooms: number
    garage: number
    coveredArea: number
    totalArea: number
  }
  tags: string[]
}

export function PropertyInfo({ title, address, price, type, features, tags }: PropertyInfoProps) {
  return (
    <div className="space-y-6">
      {/* Title and Address */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance">{title}</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{address}</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl md:text-4xl font-bold text-primary">{price}</span>
        <Badge variant="secondary" className="text-sm font-medium">
          {type === "venta" ? "En Venta" : "En Alquiler"}
        </Badge>
      </div>

      {/* Key Features */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            Características Principales
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
              <Bed className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">Dormitorios</span>
              <span className="font-semibold">{features.bedrooms}</span>
            </div>

            <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
              <Bath className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">Baños</span>
              <span className="font-semibold">{features.bathrooms}</span>
            </div>

            <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
              <Car className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">Cochera</span>
              <span className="font-semibold">{features.garage}</span>
            </div>

            <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
              <Ruler className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">Sup. Cubierta</span>
              <span className="font-semibold">{features.coveredArea}m²</span>
            </div>

            <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
              <Ruler className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">Sup. Total</span>
              <span className="font-semibold">{features.totalArea}m²</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            Etiquetas
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
