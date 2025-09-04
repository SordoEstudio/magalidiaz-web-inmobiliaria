"use client"

import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Home, Building, Search } from "lucide-react"
import featuredProperties from "@/public/data/featuredProperties.json"

export function FeaturedPropertiesIntegrated() {
  // Calcular cuántos espacios vacíos tenemos
  const totalSlots = featuredProperties.length <= 3 ? 3 : 6 // 3 o 6 slots según cantidad
  const emptySlots = (featuredProperties.length === 3 || featuredProperties.length === 6) 
    ? 0 
    : Math.max(0, totalSlots - featuredProperties.length)

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Propiedades reales */}
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
          
          {/* Espacios vacíos con botón integrado - solo si hay menos de 3 propiedades */}
          {emptySlots > 0 && Array.from({ length: emptySlots }, (_, index) => (
            <div
              key={`empty-${index}`}
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2  border-primary/20 rounded-2xl  hover:border-primary/40 hover:from-primary/10 hover:to-primary/20"
            >
              <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
                {index === 0 ? (
                  // Primer espacio vacío: Botón principal
                  <>
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                      <Search className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      ¿Buscás algo específico?
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      Explora nuestro catálogo completo de propiedades
                    </p>
                    <Button 
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground group w-full cursor-pointer"
                      onClick={() => window.location.href = '/propiedades'}
                    >
                      Ver más propiedades
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </>
                ) : (
                  // Espacios adicionales: Mensaje sutil
                  <>
                    <div className="w-16 h-16 bg-muted-foreground/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                      <Building className="h-8 w-8 text-muted-foreground/40 group-hover:text-primary/60" />
                    </div>
                    <h3 className="text-xl font-semibold text-muted-foreground mb-3 group-hover:text-primary/80 transition-colors">
                      ¿Tenés una propiedad?
                    </h3>
                    <p className="text-muted-foreground/60 text-sm leading-relaxed">
                      Publicá tu propiedad con nosotros y encontrá al inquilino o comprador ideal.
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
          </div>
        { emptySlots == 0 && Array.from({ length: emptySlots}) &&         <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground group cursor-pointer"
            onClick={() => window.location.href = '/propiedades'}
            >
            Ver más propiedades
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>} 
              </div>
    </section>
  )
} 