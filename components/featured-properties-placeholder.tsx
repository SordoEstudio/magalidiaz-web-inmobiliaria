"use client"

import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus, Home, Building } from "lucide-react"
import featuredProperties from "@/public/data/featuredProperties.json"

export function FeaturedPropertiesPlaceholder() {
  // Calcular cuántas placeholder cards necesitamos para completar la grid de 3
  const totalSlots = 6 // Siempre mostramos 6 slots (2 filas de 3)
  const placeholderCount = totalSlots - featuredProperties.length

  // Crear placeholder cards
  const placeholderCards = Array.from({ length: placeholderCount }, (_, index) => ({
    id: `placeholder-${index}`,
    isPlaceholder: true,
    type: index === 0 ? 'more' : 'coming-soon'
  }))

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Propiedades reales */}
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
          
          {/* Placeholder cards */}
          {placeholderCards.map((placeholder) => (
            <div
              key={placeholder.id}
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 border-dashed border-muted-foreground/20 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 hover:border-primary/30 hover:from-primary/5 hover:to-primary/10"
            >
              <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
                {placeholder.type === 'more' ? (
                  <>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Plus className="h-8 w-8 text-primary/60 group-hover:text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-muted-foreground mb-3 group-hover:text-primary transition-colors">
                      Más propiedades
                    </h3>
                    <p className="text-muted-foreground/70 text-sm leading-relaxed mb-6">
                      Estamos agregando nuevas propiedades destacadas. ¡Volvé pronto!
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40"
                      onClick={() => window.location.href = '/propiedades'}
                    >
                      Ver todas las propiedades
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-muted-foreground/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                      <Building className="h-8 w-8 text-muted-foreground/40 group-hover:text-primary/60" />
                    </div>
                    <h3 className="text-xl font-semibold text-muted-foreground mb-3 group-hover:text-primary/80 transition-colors">
                      Próximamente
                    </h3>
                    <p className="text-muted-foreground/60 text-sm leading-relaxed">
                      Nuevas propiedades se agregarán aquí
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground group"
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