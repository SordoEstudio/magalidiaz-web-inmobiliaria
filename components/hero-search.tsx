"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Home, Building, MapPin } from "lucide-react"
import heroImg from "@/public/house-with-garden-and-pool.png"
import Image from "next/image"
import Link from "next/link"
import { useProperties } from "@/lib/hooks/useProperties"
import { useDynamicFilters } from "@/lib/hooks/useDynamicFilters"
import { useCMSData } from "@/lib/hooks/useCMSData"
import { CMSFallback } from "@/components/cms-fallback"
import { useContact } from "@/contexts/ContactContext"
import heroDataCmsFallback from "@/public/data/heroDataCms.json"

interface HeroSearchProps {
  // Props para CMS
  data?: any
  fallback?: any
  loading?: boolean
  error?: string | null
}

export function HeroSearch({
  data,
  fallback,
  loading: propLoading,
  error: propError
}: HeroSearchProps = {}) {
  const [searchType, setSearchType] = useState("all")
  const [propertyType, setPropertyType] = useState("all")
  const [location, setLocation] = useState("all")
  const { contactData } = useContact()
  // Obtener datos del CMS de forma simplificada
  const { data: heroData } = useCMSData(
    'hero_search',
    heroDataCmsFallback
  )

  // Usar datos pasados como props o del hook
  const finalData = data || heroData || heroDataCmsFallback
  const safeHeroData = finalData?.data || finalData || heroDataCmsFallback


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
  // Usar datos del Context o props como fallback
  const whatsappContact = contactData?.lista_contacto?.find((c: any) => c.icon_contacto === 'FaWhatsapp')

  
  const finalWhatsappNumber = whatsappContact?.link_destino?.replace('https://wa.me/', '') 

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hola! Me interesa la propuesta de tasación`)
    window.open(`https://wa.me/${finalWhatsappNumber}?text=${message}`, "_blank")
  }
  return (
      <section className="relative min-h-[100vh] md:min-h-[80vh] flex items-center justify-center"> 
        {/* Background Image with Overlay */}
        <Image 
          src={safeHeroData.img_background} 
          alt="Hero Search" 
          className="absolute inset-0 w-full h-full object-cover" 
          fill 
          priority
        />
        {/* Overlay con gradiente usando la nueva paleta lila */}
        <div className="absolute inset-0 bg-black/70 " />
  

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">

            {/* Logo */}
            <Image
              src="/logo-lila.png"
              alt="Magali Diaz Asesor Inmobiliario"
              width={150}
              height={150}
              className={"rounded-full mx-auto mb-4"}
              priority
            />

            <h1 className="text-4xl md:text-6xl font-bold text-background mb-6 text-balance">
              {safeHeroData.txt_title} <span className="text-primary">{safeHeroData.txt_featured_text}</span>
            </h1>
            <p className="text-xl text-background mb-8 text-pretty">
              {safeHeroData.txt_description}
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
                  <a onClick={handleWhatsApp} className="hover:underline">
                    <p>
                      <span className="font-bold">{safeHeroData.txt_cta_text}</span>
                      <br />{safeHeroData.txt_cta_description}
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
