"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Home, Building, MapPin } from "lucide-react"
import heroImg from "@/public/house-with-garden-and-pool.png"
import Image from "next/image"
import Link from "next/link"
import { useProperties } from "@/lib/hooks/useProperties"
import { useDynamicFilters } from "@/lib/hooks/useDynamicFilters"
export function HeroSearch() {
  const [searchType, setSearchType] = useState("all")
  const [propertyType, setPropertyType] = useState("all")
  const [location, setLocation] = useState("all")

  // Obtener datos dinámicos de propiedades
  const { properties } = useProperties()
  const dynamicFilters = useDynamicFilters(properties)

  // Función para construir URL con parámetros de búsqueda
  const buildSearchUrl = () => {
    const params = new URLSearchParams()
    
    if (searchType && searchType !== 'all') {
      params.set('operation', searchType)
    }
    
    if (propertyType && propertyType !== 'all') {
      params.set('propertyType', propertyType)
    }
    
    if (location && location !== 'all') {
      params.set('location', location)
    }
    
    const queryString = params.toString()
    return queryString ? `/propiedades?${queryString}` : '/propiedades'
  }

  return (
    <section className="relative min-h-[100vh] md:min-h-[80vh] flex items-center justify-center"> 
      {/* Background Image with Overlay */}
  
        <Image src={heroImg} alt="Hero Search" className="absolute inset-0 w-full h-full object-cover" fill />
        {/* Overlay con gradiente usando la nueva paleta lila */}
        <div className="absolute inset-0 bg-black/70 " />
  
      

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-background mb-6 text-balance">
            Encontrá tu <span className="text-primary">lugar ideal</span>
          </h1>
          <p className="text-xl text-background mb-8 text-pretty">
            Miles de propiedades en venta y alquiler. Tu próximo hogar te está esperando.
          </p>

          {/* Search Form con glassmorphism effect*/}
          <div className=" backdrop-blur-md  bg-foreground/10 rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Buy/Rent Toggle */}
              <div className="space-y-2 w-full">
                <label className="text-sm font-medium pl-2 text-background block text-left">Operación</label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="text-background border-white/20 bg-white/10 hover:bg-white/20 focus:bg-white/20 w-full">
                    <SelectValue className="text-background" />
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
              <div className="space-y-2 w-full">
                <label className="text-sm font-medium pl-2 text-background block text-left">Tipo de propiedad</label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="text-background border-white/20 bg-white/10 hover:bg-white/20 focus:bg-white/20 w-full">
                    <SelectValue placeholder="Seleccionar" className="text-background placeholder:text-background/70" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    {dynamicFilters.propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          {type.value === 'departamento' && <Building className="h-4 w-4" />}
                          {type.value === 'casa' && <Home className="h-4 w-4" />}
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium pl-2 text-background block text-left">Ubicación</label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="text-background border-white/20 bg-white/10 hover:bg-white/20 focus:bg-white/20 w-full">
                    <SelectValue placeholder="Seleccionar ubicación" className="text-background placeholder:text-background/70" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las ubicaciones</SelectItem>
                    {dynamicFilters.locations.map((loc) => (
                      <SelectItem key={loc.value} value={loc.value}>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {loc.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-background block text-left">&nbsp;</label>
                <Link href={buildSearchUrl()}>
                <Button size="lg" className="w-full h-10 bg-primary hover:bg-primary/90 cursor-pointer">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar propiedad
                </Button>
                </Link>
              </div>
            </div>

            <div className="text-sm text-background pt-4 mt-4">
              <div className="border-t border-white/20 pt-4">
                <a href="https://wa.me/5491123456789" target="_blank" rel="noopener noreferrer " className="hover:underline">
                <p>
                  <span className="font-bold">¿Queres tasar tu propiedad?</span>
                  <br />Contactanos y te ayudamos a obtener el mejor precio.
                </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
