"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, SlidersHorizontal, X, MapPin } from "lucide-react"

interface PropertyFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function PropertyFilters({ onFiltersChange }: PropertyFiltersProps) {
  const [propertyType, setPropertyType] = useState("")
  const [operation, setOperation] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [bathrooms, setBathrooms] = useState("")
  const [location, setLocation] = useState("")
  const [amenities, setAmenities] = useState<string[]>([])

  // Función para aplicar filtros automáticamente
  const applyFilters = () => {
    onFiltersChange({
      propertyType,
      operation,
      bedrooms,
      bathrooms,
      location,
      amenities
    })
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setAmenities([...amenities, amenity])
    } else {
      setAmenities(amenities.filter((a) => a !== amenity))
    }
    // Aplicar filtros automáticamente después del cambio
    setTimeout(() => {
      onFiltersChange({
        propertyType,
        operation,
        bedrooms,
        bathrooms,
        location,
        amenities: checked ? [...amenities, amenity] : amenities.filter((a) => a !== amenity)
      })
    }, 0)
  }

  const resetFilters = () => {
    setPropertyType("")
    setOperation("")
    setBedrooms("")
    setBathrooms("")
    setLocation("")
    setAmenities([])
    
    // Aplicar filtros vacíos inmediatamente
    onFiltersChange({
      propertyType: "",
      operation: "",
      bedrooms: "",
      bathrooms: "",
      location: "",
      amenities: []
    })
  }

  return (
    <Card className="sticky top-24 bg-card border-border">
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

          {/* Operation Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Operación</Label>
            <Select 
              value={operation} 
              onValueChange={(value) => {
                setOperation(value)
                // Aplicar filtros automáticamente
                setTimeout(() => {
                  onFiltersChange({
                    propertyType,
                    operation: value,
                    bedrooms,
                    bathrooms,
                    location,
                    amenities
                  })
                }, 0)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar operación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="venta">Venta</SelectItem>
                <SelectItem value="alquiler">Alquiler</SelectItem>
                <SelectItem value="alquiler_temporario">Alquiler Temporario</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tipo de Propiedad</Label>
            <Select 
              value={propertyType} 
              onValueChange={(value) => {
                setPropertyType(value)
                // Aplicar filtros automáticamente
                setTimeout(() => {
                  onFiltersChange({
                    propertyType: value,
                    operation,
                    bedrooms,
                    bathrooms,
                    location,
                    amenities
                  })
                }, 0)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="departamento">Departamento</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
                <SelectItem value="lote">Lote</SelectItem>
                <SelectItem value="local_comercial">Local Comercial</SelectItem>
                <SelectItem value="oficina">Oficina</SelectItem>
                <SelectItem value="campo">Campo</SelectItem>
                <SelectItem value="deposito">Depósito</SelectItem>
                <SelectItem value="galpon">Galpón</SelectItem>
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
                onChange={(e) => {
                  setLocation(e.target.value)
                  // Aplicar filtros automáticamente
                  setTimeout(() => {
                    onFiltersChange({
                      propertyType,
                      operation,
                      bedrooms,
                      bathrooms,
                      location: e.target.value,
                      amenities
                    })
                  }, 0)
                }}
                className="pl-10"
              />
            </div>
          </div>

          {/* Bedrooms and Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Dormitorios</Label>
              <Select 
                value={bedrooms} 
                onValueChange={(value) => {
                  setBedrooms(value)
                  // Aplicar filtros automáticamente
                  setTimeout(() => {
                    onFiltersChange({
                      propertyType,
                      operation,
                      bedrooms: value,
                      bathrooms,
                      location,
                      amenities
                    })
                  }, 0)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="1+" />
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
              <Select 
                value={bathrooms} 
                onValueChange={(value) => {
                  setBathrooms(value)
                  // Aplicar filtros automáticamente
                  setTimeout(() => {
                    onFiltersChange({
                      propertyType,
                      operation,
                      bedrooms,
                      bathrooms: value,
                      location,
                      amenities
                    })
                  }, 0)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="1+" />
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
                    className="border-primary/50"
                    onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                  />
                  <Label htmlFor={amenity.id} className="text-sm">
                    {amenity.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
