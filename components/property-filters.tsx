"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Search, SlidersHorizontal, X, MapPin } from "lucide-react"

interface PropertyFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function PropertyFilters({ onFiltersChange }: PropertyFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [operation, setOperation] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [bedrooms, setBedrooms] = useState("")
  const [bathrooms, setBathrooms] = useState("")
  const [location, setLocation] = useState("")
  const [amenities, setAmenities] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("recent")

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setAmenities([...amenities, amenity])
    } else {
      setAmenities(amenities.filter((a) => a !== amenity))
    }
  }

  const resetFilters = () => {
    setSearchTerm("")
    setPropertyType("")
    setOperation("")
    setPriceRange([0, 1000000])
    setBedrooms("")
    setBathrooms("")
    setLocation("")
    setAmenities([])
    setSortBy("recent")
  }

  return (
    <Card className="sticky top-4 bg-card border-border">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-card-foreground">Filtros</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <X className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar propiedades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Operation Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Operación</Label>
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar operación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="venta">Venta</SelectItem>
                <SelectItem value="alquiler">Alquiler</SelectItem>
                <SelectItem value="alquiler-temporal">Alquiler Temporal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tipo de Propiedad</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="departamento">Departamento</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="ph">PH</SelectItem>
                <SelectItem value="oficina">Oficina</SelectItem>
                <SelectItem value="local">Local Comercial</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Ubicación</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Barrio, ciudad o zona"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Rango de Precio: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
            </Label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000000}
              min={0}
              step={10000}
              className="w-full"
            />
          </div>

          {/* Bedrooms and Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Dormitorios</Label>
              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger>
                  <SelectValue placeholder="Cualquiera" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Baños</Label>
              <Select value={bathrooms} onValueChange={setBathrooms}>
                <SelectTrigger>
                  <SelectValue placeholder="Cualquiera" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Comodidades</Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "pool", label: "Piscina" },
                { id: "garage", label: "Cochera" },
                { id: "garden", label: "Jardín" },
                { id: "balcony", label: "Balcón" },
                { id: "gym", label: "Gimnasio" },
                { id: "security", label: "Seguridad" },
              ].map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={amenities.includes(amenity.id)}
                    onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                  />
                  <Label htmlFor={amenity.id} className="text-sm">
                    {amenity.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Ordenar por</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Más recientes</SelectItem>
                <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                <SelectItem value="area">Superficie</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Apply Filters Button */}
          <Button
            className="w-full"
            onClick={() =>
              onFiltersChange({
                searchTerm,
                propertyType,
                operation,
                priceRange,
                bedrooms,
                bathrooms,
                location,
                amenities,
                sortBy,
              })
            }
          >
            Aplicar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
