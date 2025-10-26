"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { PropertyCard } from "@/components/property-card"
import { PropertyCardSkeleton } from "@/components/property-card-skeleton"
import { PropertyFilters } from "@/components/property-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Grid3X3, List } from "lucide-react"
import { useProperties } from "@/lib/hooks/useProperties"
import { useFilteredProperties } from "@/lib/hooks/usePropertyFilters"
import { useCMSComponents } from "@/lib/hooks/useCMSComponents"
import { CMSDebugPanel } from "@/components/cms-debug-panel"
import Link from "next/link"


export default function PropertySearchPage() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showMap, setShowMap] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filters, setFilters] = useState({
    transactionType: "",
    propertyType: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    amenities: [] as string[]
  })

  // Efecto para pre-llenar filtros desde URL
  useEffect(() => {
    const urlOperation = searchParams.get('operation')
    const urlPropertyType = searchParams.get('propertyType')
    const urlLocation = searchParams.get('location')

    if (urlOperation || urlPropertyType || urlLocation) {
      setFilters(prev => ({
        ...prev,
        transactionType: urlOperation || "all",
        propertyType: urlPropertyType || "all", 
        location: urlLocation || "all"
      }))
    }
  }, [searchParams])

  // Usar hook de API para obtener propiedades
  const { properties, loading, error } = useProperties()
  
  // Usar hook de API para obtener componentes CMS
  const { components: cmsComponents, loading: cmsLoading, error: cmsError } = useCMSComponents()

  // Aplicar filtros del lado del cliente
  const filteredProperties = useFilteredProperties(properties , {
    ...filters,
    bedrooms: filters.bedrooms ? parseInt(filters.bedrooms) : undefined,
    bathrooms: filters.bathrooms ? parseInt(filters.bathrooms) : undefined,
    search: searchTerm
  })

  // Función para mapear datos de la API al formato del PropertyCard
  const mapPropertyToCard = (property: any) => {
    return {
      id: property._id.toString(), // Convertir _id a string
      title: property.title,
      price: property.price,
      currency: property.currency,
      location: property.location,
      image: property.image || '',
      features: {
        bedrooms: property.features?.bedrooms || 0,
        bathrooms: property.features?.bathrooms || 0,
        coveredArea: property.features?.coveredArea || 0,
        totalArea: property.features?.totalArea || 0,
        garage: property.features?.garage || 0
      },
      isNew: property.year && property.year >= new Date().getFullYear() - 1,
      isFeatured: property.isFeatured,
      publishedDays: property.publishedAt ? 
        Math.floor((Date.now() - new Date(property.publishedAt).getTime()) / (1000 * 60 * 60 * 24)) : 
        0,
      tags: property.tags || []
    }
  }

  const handleFiltersChange = useCallback((newFilters: any) => {
    setFilters(newFilters)
  }, [])

  // Mostrar datos de CMS Components en consola para debugging
  useEffect(() => {
    if (cmsComponents) {
      console.log('🎨 CMS Components loaded:', cmsComponents.length, 'components');
      console.log('📋 CMS Components data:', cmsComponents);
      
      // Mostrar información detallada de cada componente
      cmsComponents.forEach((component, index) => {
        console.log(`📄 Component ${index + 1}:`, {
          id: component._id,
          name: component.name,
          type: component.type,
          page: component.page,
          status: component.status,
          isActive: component.isActive,
          isVisible: component.isVisible,
          data: component.data,
          thumbnail: component.thumbnail,
          description: component.description,
          clientName: component.clientName
        });
      });
    }
    
    if (cmsError) {
      console.error('❌ CMS Components Error:', cmsError);
    }
  }, [cmsComponents, cmsError])

  // Mostrar loading con skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">I</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">Inmobiliaria</span>
                </div>
              </Link>
              {/* Search Bar Skeleton */}
              <div className="flex-1 max-w-2xl mx-8">
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Filters Sidebar Skeleton */}
            <aside className="w-80 flex-shrink-0">
              <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
                
                {/* Stats */}
                <Skeleton className="h-12 w-full rounded-lg" />
                
                {/* Filter sections */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </aside>

            {/* Main Content Skeleton */}
            <main className="flex-1">
              {/* Results Header Skeleton */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-9" />
                  <Skeleton className="h-9 w-9" />
                </div>
              </div>

              {/* Properties Grid Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
                  <PropertyCardSkeleton key={index} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }

  // Mostrar error si hay problema
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">I</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">Inmobiliaria</span>
                </div>
              </Link>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Error al cargar las propiedades.</p>
              <Button onClick={() => window.location.reload()}>
                Reintentar
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">I</span>
              </div>
              <span className="text-xl font-bold text-foreground">Inmobiliaria</span>
            </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar propiedades por ubicación, tipo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <PropertyFilters 
              properties={properties} 
              onFiltersChange={handleFiltersChange}
              initialFilters={filters}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-foreground">Propiedades Disponibles</h1>
                <Badge variant="secondary" className="text-sm">
                  {filteredProperties.length} resultados
                </Badge>
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-2">
                {/* Sort By */}
{/*                 <div className="flex items-center space-x-2">
                  <Label className="text-sm font-medium">Ordenar por</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Más recientes</SelectItem>
                      <SelectItem value="area">Mayor precio</SelectItem>
                      <SelectItem value="price-low">Menor precio</SelectItem>
                      <SelectItem value="area">Mayor superficie</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Properties Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProperties.map((property) => (
                <PropertyCard 
                  key={property._id.toString()} 
                  {...mapPropertyToCard(property)}
                />
              ))}
            </div>

            {/* Load More */}
{/*             <div className="flex justify-center mt-8">
              <Button variant="outline" size="lg">
                Cargar más propiedades
              </Button>
            </div> */}
          </main>
        </div>
      </div>
      
      {/* Panel de Debug CMS */}
      <CMSDebugPanel />
    </div>
  )
}
