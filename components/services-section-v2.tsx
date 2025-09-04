"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Phone } from "lucide-react"

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  features: string[]
  primaryCTA: {
    text: string
    action: string
    type: 'link' | 'phone' | 'external'
  }
  secondaryCTA: {
    text: string
    action: string
    type: 'link' | 'phone' | 'external'
  }
}

const services: ServiceCardProps[] = [
  {
    icon: ({ className }: { className?: string }) => (
      <div className={`w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>
    ),
    title: "Corretaje de inmuebles",
    description: "Asesoramiento integral en compra y venta de propiedades con el mejor precio del mercado.",
    features: ["Asesoramiento personalizado", "Negociación experta", "Acompañamiento completo"],
    primaryCTA: {
      text: "Consultar",
      action: "https://wa.me/5491123456789",
      type: 'external'
    },
    secondaryCTA: {
      text: "Ver propiedades",
      action: "/propiedades",
      type: 'link'
    }
  },
  {
    icon: ({ className }: { className?: string }) => (
      <div className={`w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
    ),
    title: "Tasaciones",
    description: "Valuaciones profesionales y certificadas para conocer el valor real de tu propiedad.",
    features: ["Certificación oficial", "Análisis de mercado", "Reporte detallado"],
    primaryCTA: {
      text: "Solicitar tasación",
      action: "https://wa.me/5491123456789?text=Hola! Quiero solicitar una tasación",
      type: 'external'
    },
    secondaryCTA: {
      text: "Más información",
      action: "/tasaciones",
      type: 'link'
    }
  },
  {
    icon: ({ className }: { className?: string }) => (
      <div className={`w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
    ),
    title: "Administración de alquileres",
    description: "Gestión completa de propiedades en alquiler, desde la búsqueda hasta el cobro.",
    features: ["Búsqueda de inquilinos", "Cobro mensual", "Mantenimiento"],
    primaryCTA: {
      text: "Administrar mi propiedad",
      action: "tel:+5491123456789",
      type: 'phone'
    },
    secondaryCTA: {
      text: "Ver alquileres",
      action: "/alquileres",
      type: 'link'
    }
  },
  {
    icon: ({ className }: { className?: string }) => (
      <div className={`w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
    ),
    title: "Estudios de títulos",
    description: "Análisis legal completo para garantizar operaciones seguras y sin inconvenientes.",
    features: ["Verificación legal", "Análisis de deudas", "Certificado de dominio"],
    primaryCTA: {
      text: "Consultar estudio",
      action: "https://wa.me/5491123456789?text=Hola! Necesito un estudio de título",
      type: 'external'
    },
    secondaryCTA: {
      text: "Información legal",
      action: "/estudios-titulos",
      type: 'link'
    }
  },
  {
    icon: ({ className }: { className?: string }) => (
      <div className={`w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      </div>
    ),
    title: "Venta y alquiler",
    description: "Amplio portfolio de propiedades en venta y alquiler en las mejores ubicaciones.",
    features: ["Propiedades exclusivas", "Ubicaciones premium", "Financiamiento"],
    primaryCTA: {
      text: "Ver propiedades",
      action: "/propiedades",
      type: 'link'
    },
    secondaryCTA: {
      text: "Contactar",
      action: "https://wa.me/5491123456789",
      type: 'external'
    }
  },
  {
    icon: ({ className }: { className?: string }) => (
      <div className={`w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      </div>
    ),
    title: "Asesoramiento personalizado",
    description: "Atención dedicada y profesional para encontrar la solución que mejor se adapte a vos.",
    features: ["Consulta gratuita", "Plan personalizado", "Seguimiento continuo"],
    primaryCTA: {
      text: "Agendar consulta",
      action: "https://wa.me/5491123456789?text=Hola! Quiero agendar una consulta",
      type: 'external'
    },
    secondaryCTA: {
      text: "Conocer más",
      action: "/asesoramiento",
      type: 'link'
    }
  },
]

function ServiceCard({ icon: Icon, title, description, features, primaryCTA, secondaryCTA }: ServiceCardProps) {
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
    <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border-0 bg-gradient-to-br from-white to-gray-50/50 hover:from-white hover:to-primary/5">
      {/* Decorative background element */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardContent className="p-6 relative z-10">
        {/* Icon with gradient background */}
        <div className="mb-4">
          <Icon className="mb-4" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {description}
        </p>

        {/* Features list */}
        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Footer with CTAs */}
      <CardFooter className="p-6 pt-0 relative z-10">
        <div className="w-full space-y-3">
          {/* Primary CTA */}
          <Button 
            onClick={() => handleCTAAction(primaryCTA.action, primaryCTA.type)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 group-hover:shadow-lg"
          >
            {primaryCTA.text}
            {getCTAIcon(primaryCTA.type)}
          </Button>

          {/* Secondary CTA */}
          <Button 
            variant="outline"
            onClick={() => handleCTAAction(secondaryCTA.action, secondaryCTA.type)}
            className="w-full border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
          >
            {secondaryCTA.text}
            {getCTAIcon(secondaryCTA.type)}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export function ServicesSectionV2() {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Nuestros <span className="text-primary">servicios</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Ofrecemos una amplia gama de servicios inmobiliarios para acompañarte en cada paso de tu operación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
} 