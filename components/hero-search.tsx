"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Home, Building, MapPin } from "lucide-react"

export function HeroSearch() {
  const [searchType, setSearchType] = useState("compra")
  const [propertyType, setPropertyType] = useState("")
  const [location, setLocation] = useState("")

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/5">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Encontrá tu <span className="text-primary">hogar ideal</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Miles de propiedades en venta y alquiler. Tu próximo hogar te está esperando.
          </p>

          {/* Search Form */}
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Buy/Rent Toggle */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Operación</label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compra">Compra</SelectItem>
                    <SelectItem value="alquiler">Alquiler</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Tipo de propiedad</label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="departamento">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Departamento
                      </div>
                    </SelectItem>
                    <SelectItem value="casa">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Casa
                      </div>
                    </SelectItem>
                    <SelectItem value="ph">PH</SelectItem>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="oficina">Oficina</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Ubicación</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Barrio, ciudad..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-transparent">Buscar</label>
                <Button size="lg" className="w-full h-10">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar propiedad
                </Button>
              </div>
            </div>

            {/* Secondary CTA */}
            <div className="text-center pt-4 border-t border-border/50">
              <Button variant="link" className="text-primary hover:text-primary/80">
                ¿Querés tasar tu propiedad? Hacé click aquí
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
