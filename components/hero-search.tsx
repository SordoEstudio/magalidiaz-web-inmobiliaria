"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Home, Building, MapPin } from "lucide-react"
import heroImg from "@/public/house-with-garden-and-pool.png"
import Image from "next/image"
export function HeroSearch() {
  const [searchType, setSearchType] = useState("compra")
  const [propertyType, setPropertyType] = useState("")
  const [location, setLocation] = useState("")

  return (
    <section className="relative min-h-[100vh] md:min-h-[80vh] flex items-center justify-center"> 
      {/* Background Image with Overlay */}
  
        <Image src={heroImg} alt="Hero Search" className="absolute inset-0 w-full h-full object-cover" fill />
        {/* Overlay con gradiente usando la nueva paleta lila */}
        <div className="absolute inset-0 bg-black/50 " />
  
      

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
                    <SelectItem value="compra">Compra</SelectItem>
                    <SelectItem value="alquiler">Alquiler</SelectItem>
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
                <label className="text-sm font-medium pl-2 text-background block text-left">Ubicación</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-background" />
                  <Input
                    placeholder="Barrio, ciudad..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 text-background placeholder:text-background/70 border-white/20 bg-white/10 focus:bg-white/20 focus:border-white/40"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-background block text-left">&nbsp;</label>
                <Button size="lg" className="w-full h-10 bg-primary hover:bg-primary/90">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar propiedad
                </Button>
              </div>
            </div>

            <div className="text-sm text-background pt-4 mt-4">
              <div className="border-t border-white/20 pt-4">
                <a href="https://wa.me/5491123456789" target="_blank" rel="noopener noreferrer">
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
