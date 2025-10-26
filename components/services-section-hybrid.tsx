"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { CMSFallback } from "@/components/cms-fallback"
import servicesDataFallback from "@/public/data/servicesDataCms.json"

interface ServicesSectionHybridProps {
  data?: any
  fallback?: any
  loading?: boolean
  error?: string | null
}

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>,
  title: string,
  description: string,
  isFeatured: boolean,
  cta: {
    link: string,
    label: string  }
}

interface CMSServiceItem {
  id: string
  txt_nombre: string
  txt_descripcion: string
  icon_servicio: string
  destacado: boolean
  btn_servicio: {
    txt_label: string
    link_url: string
    icon_btn: string
  }
}

// Función para renderizar iconos dinámicamente
const renderIcon = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    FaHome: ({ className }: { className?: string }) => (
      <div className={`w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>
    ),
    FaCalculator: ({ className }: { className?: string }) => (
      <div className={`w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
    ),
    FaBuilding: ({ className }: { className?: string }) => (
      <div className={`w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
    ),
    FaFileContract: ({ className }: { className?: string }) => (
      <div className={`w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
    ),
    FaKey: ({ className }: { className?: string }) => (
      <div className={`w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      </div>
    ),
    FaUserTie: ({ className }: { className?: string }) => (
      <div className={`w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    )
  }
  
  return iconMap[iconName] || iconMap.FaHome
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
    isFeatured: true,
    cta: {
      label: "Consultar",
      link: "https://wa.me/5491123456789"

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
    isFeatured: false,
    cta: {
      label: "Solicitar tasación",
      link: "https://wa.me/5491123456789?text=Hola! Quiero solicitar una tasación"
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
    isFeatured: false,
    cta: {
      label: "Administrar mi propiedad",
      link: "tel:+5491123456789"
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
    isFeatured: false,
    cta: {
      label: "Consultar estudio",
      link: "https://wa.me/5491123456789?text=Hola! Necesito un estudio de título"
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
    isFeatured: false,
    cta: {
      label: "Ver propiedades",
      link: "/propiedades"
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
    description: "Atención personalizada para encontrar la solución que mejor se adapte a vos.",
    isFeatured: false,
    cta: {
      label: "Agendar consulta",
      link: "https://wa.me/5491123456789?text=Hola! Quiero agendar una consulta"
    }
  },
]

function ServiceCard({ icon: Icon, title, description, cta: { label, link }, isFeatured=false }: ServiceCardProps) {


  return (
        <Link href={link} className="block" target="_blank" rel="noopener noreferrer">
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-border/50 hover:border-primary/30 bg-card ${isFeatured ? 'border-2 border-primary/50 bg-primary/10' : ''}`}>
      <CardContent className="md:p-6 text-center">
        {/* Icon with gradient background */}
        <div className="mb-2 md:mb-4 w">
          <Icon className="mx-auto " />
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl md:mb-3 font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>

      {/* Footer with single CTA */}
      <CardFooter className="p-6 pt-0 text-center hidden sm:block">
        <div 
          className="w-full flex items-center justify-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity"
        >
              {label}
        </div>
      </CardFooter>
    </Card>
            </Link>

  )
}

export function ServicesSectionHybrid({ 
  data, 
  fallback, 
  loading = false, 
  error = null 
}: ServicesSectionHybridProps) {
  // Usar datos pasados como props o fallback
  const servicesData = data?.data || data || fallback || servicesDataFallback
  
  // Usar datos del CMS o fallback
  const safeServicesData = servicesData || servicesDataFallback
  const servicesToRender = safeServicesData?.lista_servicios || []

  return (
    <CMSFallback 
      fallbackData={safeServicesData}
      componentType="services_component"
      isLoading={loading}
      error={error}
    >
      <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
{/*             {data && (
              <div className="text-xs text-green-600 mb-2">
                ✓ Datos desde CMS
              </div>
            )} */}
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
               Nuestros <span className="text-primary">servicios</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {safeServicesData.txt_subtitulo}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesToRender.map((service: any, index: number) => {
              const IconComponent = renderIcon(service._icon_servicio || service.icon_servicio)
              
              // Manejar diferentes estructuras de botón del CMS
              const btnData = service.btn_servicio || {}
              const label = btnData.txt_label || btnData.label_servicio || 'Ver más'
              const link = btnData.link_url || btnData.url_enlace || '#'
              
              return (
                <ServiceCard 
                  key={service.id || index} 
                  icon={IconComponent}
                  title={service.txt_nombre}
                  description={service.txt_descripcion}
                  isFeatured={service.boolean_destacado}
                  cta={{
                    label: label,
                    link: link
                  }}
                />
              )
            })}
          </div>
        </div>
      </section>
    </CMSFallback>
  )
} 