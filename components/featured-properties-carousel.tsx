"use client"

import { useState, useRef, useEffect } from "react"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useFeaturedProperties, getPropertyKey } from "@/lib/hooks/useProperties"
import Link from "next/link"

export function FeaturedPropertiesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Usar hook de API para obtener propiedades destacadas
  const { featuredProperties, loading, error } = useFeaturedProperties()

  // Detectar si es mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Calcular si se pueden mostrar más propiedades
  const cardsToShow = isMobile ? 1 : 3
  const canGoNext = currentIndex < (featuredProperties?.length || 0) - cardsToShow
  const canGoPrevious = currentIndex > 0

  // Navigation functions
  const goToPrevious = () => {
    if (canGoPrevious) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const goToNext = () => {
    if (canGoNext) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  // Touch/swipe functionality
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && canGoNext) {
      goToNext()
    }
    if (isRightSwipe && canGoPrevious) {
      goToPrevious()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  // Reset index when properties change
  useEffect(() => {
    setCurrentIndex(0)
  }, [featuredProperties])

  // Mostrar loading si está cargando
  if (loading) {
    return (
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Propiedades Destacadas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cargando propiedades destacadas...
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Mostrar error si hay problema
  if (error || !featuredProperties || featuredProperties.length === 0) {
    return (
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Propiedades Destacadas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No se pudieron cargar las propiedades destacadas.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Propiedades Destacadas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubrí las mejores oportunidades inmobiliarias seleccionadas especialmente para vos
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="icon"
              className={`${canGoPrevious ? 'opacity-100' : 'hidden'} absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background`}
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className={`${canGoNext ? 'opacity-100' : 'hidden'} absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background`}
              onClick={goToNext}
  
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Properties Grid */}
          <div
            ref={carouselRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
              }}
            >
              {featuredProperties.map((property, index) => (
                <div
                  key={getPropertyKey(property, index)}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / cardsToShow}%` }}
                >
                  <PropertyCard {...property} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-center mt-6 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              disabled={!canGoPrevious}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={!canGoNext}
            >
              Siguiente
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(featuredProperties.length / cardsToShow) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === Math.floor(currentIndex / cardsToShow)
                    ? 'bg-primary'
                    : 'bg-muted-foreground/30'
                }`}
                onClick={() => setCurrentIndex(index * cardsToShow)}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="group cursor-pointer" asChild>
            <Link href="/propiedades">
            Ver todas las propiedades
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
