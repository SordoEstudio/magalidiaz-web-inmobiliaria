"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Phone, Home, Calculator, Building, FileText, Key, Users } from "lucide-react"

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
    icon: Home,
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
    icon: Calculator,
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
    icon: Building,
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
    icon: FileText,
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
    icon: Key,
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
    icon: Users,
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
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-border/50 hover:border-primary/30 bg-card">
      <CardContent className="p-6">
        {/* Icon with background */}
        <div className="w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/25 transition-colors">
          <Icon className="h-8 w-8 text-primary" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-card-foreground mb-3 text-center group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-center mb-4 leading-relaxed">
          {description}
        </p>

        {/* Features list */}
        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Footer with CTAs */}
      <CardFooter className="p-6 pt-0">
        <div className="w-full space-y-3">
          {/* Primary CTA */}
          <Button 
            onClick={() => handleCTAAction(primaryCTA.action, primaryCTA.type)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            {primaryCTA.text}
            {getCTAIcon(primaryCTA.type)}
          </Button>

          {/* Secondary CTA */}
          <Button 
            variant="outline"
            onClick={() => handleCTAAction(secondaryCTA.action, secondaryCTA.type)}
            className="w-full border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40"
          >
            {secondaryCTA.text}
            {getCTAIcon(secondaryCTA.type)}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export function ServicesSectionSimple() {
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