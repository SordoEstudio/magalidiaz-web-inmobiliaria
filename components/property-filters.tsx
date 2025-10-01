"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import {  SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react"
import { Property } from "@/lib/types/properties"
import { useDynamicFilters, useFilterStats } from "@/lib/hooks/useDynamicFilters"
import { Combobox } from "@/components/ui/combobox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface PropertyFiltersProps {
  properties: Property[] | null
  onFiltersChange: (filters: any) => void
  initialFilters?: {
    transactionType?: string
    propertyType?: string
    location?: string
    bedrooms?: string
    bathrooms?: string
    amenities?: string[]
  }
}

export function PropertyFilters({ properties, onFiltersChange, initialFilters }: PropertyFiltersProps) {
  const [propertyType, setPropertyType] = useState("all")
  const [operation, setOperation] = useState("all")
  const [bedrooms, setBedrooms] = useState("")
  const [bathrooms, setBathrooms] = useState("")
  const [location, setLocation] = useState("all")
  const [amenities, setAmenities] = useState<string[]>([])
  const [amenitiesOpen, setAmenitiesOpen] = useState(false)

  // Obtener filtros dinámicos basados en las propiedades disponibles
  const dynamicFilters = useDynamicFilters(properties)
  const filterStats = useFilterStats(properties)

  // Efecto para aplicar filtros iniciales desde URL (solo una vez)
  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.transactionType) {
        setOperation(initialFilters.transactionType)
      }
      if (initialFilters.propertyType) {
        setPropertyType(initialFilters.propertyType)
      }
      if (initialFilters.location) {
        setLocation(initialFilters.location)
      }
      if (initialFilters.bedrooms) {
        setBedrooms(initialFilters.bedrooms)
      }
      if (initialFilters.bathrooms) {
        setBathrooms(initialFilters.bathrooms)
      }
      if (initialFilters.amenities) {
        setAmenities(initialFilters.amenities)
      }

      // Aplicar filtros inmediatamente
      setTimeout(() => {
        onFiltersChange({
          propertyType: initialFilters.propertyType || "all",
          operation: initialFilters.transactionType || "all",
          bedrooms: initialFilters.bedrooms || "",
          bathrooms: initialFilters.bathrooms || "",
          location: initialFilters.location || "all",
          amenities: initialFilters.amenities || []
        })
      }, 0)
    }
  }, []) // Removemos las dependencias para evitar bucles

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
    setPropertyType("all")
    setOperation("all")
    setBedrooms("")
    setBathrooms("")
    setLocation("all")
    setAmenities([])
    setAmenitiesOpen(false)
    
    // Aplicar filtros vacíos inmediatamente
    onFiltersChange({
      propertyType: "all",
      operation: "all",
      bedrooms: "",
      bathrooms: "",
      location: "all",
      amenities: []
    })
  }

  return (
    <Card className="mt-4 bg-card border-border">
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
                <SelectItem value="all">Todas las operaciones</SelectItem>
                {dynamicFilters.transactionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
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
                <SelectItem value="all">Todos los tipos</SelectItem>
                {dynamicFilters.propertyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Ubicación</Label>
            <Combobox
              options={dynamicFilters.locations}
              value={location}
              onValueChange={(value) => {
                setLocation(value)
                // Aplicar filtros automáticamente
                setTimeout(() => {
                  onFiltersChange({
                    propertyType,
                    operation,
                    bedrooms,
                    bathrooms,
                    location: value,
                    amenities
                  })
                }, 0)
              }}
              placeholder="Seleccionar ubicación"
              searchPlaceholder="Buscar ubicación..."
              emptyText="No se encontraron ubicaciones."
              showAllOption={true}
              allOptionLabel="Todas las ubicaciones"
            />
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
                  {dynamicFilters.bedrooms.map((bedroom) => (
                    <SelectItem key={bedroom.value} value={bedroom.value}>
                      {bedroom.label}
                    </SelectItem>
                  ))}
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
                  {dynamicFilters.bathrooms.map((bathroom) => (
                    <SelectItem key={bathroom.value} value={bathroom.value}>
                      {bathroom.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Amenities */}
          <Collapsible open={amenitiesOpen} onOpenChange={setAmenitiesOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                <Label className="text-sm font-medium cursor-pointer">Comodidades</Label>
                {amenitiesOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              <div className="grid grid-cols-2 gap-3">
                {dynamicFilters.amenities.map((amenity) => (
                  <div key={amenity.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity.value}
                      checked={amenities.includes(amenity.value)}
                      className="border-primary/50"
                      onCheckedChange={(checked) => handleAmenityChange(amenity.value, checked as boolean)}
                    />
                    <Label htmlFor={amenity.value} className="text-sm cursor-pointer">
                      {amenity.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  )
}
