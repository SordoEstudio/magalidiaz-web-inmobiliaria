"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Phone } from "lucide-react"

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  cta: {
    text: string
    action: string
    type: 'link' | 'phone' | 'external'
  }
}

const services: ServiceCardProps[] = [
  {
    icon: ({ className }: { className?: string }) => (
      <div className={`w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>
    ),
    title: "Corretaje de inmuebles",
    description: "Asesoramiento integral en compra y venta de propiedades con el mejor precio del mercado.",
    cta: {
      text: "Consultar",
      action: "https://wa.me/5491123456789",
      type: 'external'
    }
  },
  {
    icon: ({ className }: { className?: string }) => (
      <div className={`w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
    ),
    title: "Tasaciones",
    description: "Valuaciones profesionales y certificadas para conocer el valor real de tu propiedad.",
    cta: {
      text: "Solicitar tasación",
      action: "https://wa.me/5491123456789?text=Hola! Quiero solicitar una tasación",
      type: 'external'
    }
  },
  {
    icon: ({ className }: { className?: string }) => (
      <div className={`w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
    ),
    title: "Administración de alquileres",
    description: "Gestión completa de propiedades en alquiler, desde la búsqueda hasta el cobro.",
    cta: {
      text: "Administrar mi propiedad",
      action: "tel:+5491123456789",
      type: 'phone'
    }
  },
  {
    icon: ({ className }: { className?: string }) => (
      <div className={`w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
    ),
    title: "Estudios de títulos",
    description: "Análisis legal completo para garantizar operaciones seguras y sin inconvenientes.",
    cta: {
      text: "Consultar estudio",
      action: "https://wa.me/5491123456789?text=Hola! Necesito un estudio de título",
      type: 'external'
    }
  },
  {
    icon: ({ className }: { className?: string }) => (
      <div className={`w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      </div>
    ),
    title: "Venta y alquiler",
    description: "Amplio portfolio de propiedades en venta y alquiler en las mejores ubicaciones.",
    cta: {
      text: "Ver propiedades",
      action: "/propiedades",
      type: 'link'
    }
  },
  {
    icon: ({ className }: { className?: string }) => (
      <div className={`w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    ),
    title: "Asesoramiento personalizado",
    description: "Atención dedicada y profesional para encontrar la solución que mejor se adapte a vos.",
    cta: {
      text: "Agendar consulta",
      action: "https://wa.me/5491123456789?text=Hola! Quiero agendar una consulta",
      type: 'external'
    }
  },
]

function ServiceCard({ icon: Icon, title, description, cta }: ServiceCardProps) {
  const handleCTAAction = (action: string, type: string) => {
    switch (type) {
      case 'phone':
        window.location.href = action
        break
      case 'external':
        window.open(action, '_blank')
        break
      case 'link':
        window.location.href = action
        break
    }
  }

  const getCTAIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return <Phone className="w-4 h-4" />
      case 'external':
        return <ExternalLink className="w-4 h-4" />
      case 'link':
        return <ArrowRight className="w-4 h-4" />
      default:
        return <ArrowRight className="w-4 h-4" />
    }
  }

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-border/50 hover:border-primary/30 bg-card">
      <CardContent className="p-6 text-center">
        {/* Icon with gradient background */}
        <div className="mb-4">
          <Icon className="mx-auto" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>

      {/* Footer with single CTA */}
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={() => handleCTAAction(cta.action, cta.type)}
          variant="outline"
          className="w-full bg-primary/5 text-foreground font-medium transition-all duration-300 group-hover:shadow-lg hover:text-primary"
        >
          {cta.text}
          {getCTAIcon(cta.type)}
        </Button>
      </CardFooter>
    </Card>
  )
}

export function ServicesSectionHybrid() {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Nuestros <span className="text-primary">servicios</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Ofrecemos una amplia gama de servicios inmobiliarios para acompañarte en cada paso de tu operación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
} 