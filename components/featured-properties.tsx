"use client"

import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const featuredProperties = [
  {
    id: "1",
    title: "Departamento 2 ambientes en San Vicente Centro",
    price: "$180.000",
    location: "San Vicente Centro, Buenos Aires",
    image: "/modern-apartment-exterior.png",
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    hasGarage: true,
    isNew: true,
    isFeatured: true,
    publishedDays: 2,
  },
  {
    id: "2",
    title: "Casa 3 dormitorios con jardín y piscina",
    price: "$350.000",
    location: "Quilmes Oeste, Buenos Aires",
    image: "/house-with-garden-and-pool.png",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    hasGarage: true,
    isNew: false,
    isFeatured: true,
    publishedDays: 5,
  },
  {
    id: "3",
    title: "Departamento de lujo con amenities",
    price: "$450.000",
    location: "Puerto Madero, CABA",
    image: "/luxury-apartment-building-modern.png",
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    hasGarage: true,
    isNew: true,
    isFeatured: true,
    publishedDays: 1,
  },
]

export function FeaturedProperties() {
  return (
    <section className="py-16 bg-background">
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
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="group bg-transparent">
            Ver más propiedades
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
