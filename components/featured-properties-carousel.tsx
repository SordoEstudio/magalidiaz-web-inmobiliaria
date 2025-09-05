"use client"

import { useState, useRef } from "react"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import featuredProperties from "@/public/data/featuredProperties.json"

export function FeaturedPropertiesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Calcular si se pueden mostrar más propiedades
  // En mobile: 1 card, en desktop: 3 cards
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const cardsToShow = isMobile ? 1 : 3
  const canGoNext = currentIndex < featuredProperties.length - cardsToShow
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

  // Get current properties to display
  const getCurrentProperties = () => {
    return featuredProperties.slice(currentIndex, currentIndex + cardsToShow)
  }

  // Corregir el tipo de datos para PropertyCard
  const formatPropertyForCard = (property: any) => {
    return {
      id: property.id,
      title: property.title,
      price: property.price, // Convertir a string
      currency: property.currency || 'USD', // Asegurar que existe
      location: property.location,
      image: property.image,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      hasGarage: property.hasGarage,
      isNew: property.isNew,
      isFeatured: property.isFeatured,
      publishedDays: property.publishedDays,
      tags: property.tags || []
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Propiedades <span className="text-primary">destacadas</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Descubrí las mejores oportunidades del mercado inmobiliario seleccionadas especialmente para vos.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative mb-12">
          {/* Navigation Arrows - solo cuando corresponda */}
          {canGoPrevious && (
            <button
              onClick={goToPrevious}
              className="absolute left-[-20px] top-[214px] transform hover:-translate-x-[10px] z-10 w-12 h-12 bg-primary shadow-sm rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:shadow-lg"
              aria-label="Propiedad anterior"
            >
              <ChevronLeft className="w-6 h-6 text-white font-bold" />
            </button>
          )}

          {canGoNext && (
            <button
              onClick={goToNext}
              className="absolute right-[-20px] top-[214px] transform hover:-translate-x-[-10px] z-10 w-12 h-12 bg-primary shadow-sm rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:shadow-lg"
              aria-label="Siguiente propiedad"
            >
              <ChevronRight className="w-6 h-6 text-white font-bold" />
            </button>
          )}

          {/* Carousel Content */}
          <div 
            ref={carouselRef}
            className="relative overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile: Una card por vez */}
            <div className="block md:hidden">
              <div className="flex justify-center px-4">
                <div className="w-full max-w-sm">
                  <PropertyCard {...formatPropertyForCard(getCurrentProperties()[0])} />
                </div>
              </div>
            </div>

            {/* Desktop: Grid de 3 cards */}
            <div className="hidden md:block">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 pb-12">
                {getCurrentProperties().map((property) => (
                  <PropertyCard key={property.id} {...formatPropertyForCard(property)} />
                ))}
              </div>
            </div>
          </div>

          {/* Indicadores de posición - solo en mobile */}
          <div className="flex justify-center mt-6 md:hidden">
            <div className="flex space-x-2">
              {featuredProperties.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary w-6' 
                      : 'bg-muted-foreground/30'
                  }`}
                  aria-label={`Ir a propiedad ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground group cursor-pointer"
            onClick={() => window.location.href = '/propiedades'}
          >
            Ver más propiedades
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
