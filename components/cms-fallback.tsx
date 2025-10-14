"use client"

import { ReactNode } from 'react'
import { CMSComponent } from '@/lib/types/cms-components'

interface CMSFallbackProps {
  children: ReactNode
  fallbackData?: any
  componentType?: string
  isLoading?: boolean
  error?: string | null
}

// Datos de fallback estáticos
const FALLBACK_DATA = {
  about_component: {
    img_perfil: "/placeholder-user.jpg",
    txt_nombre: "Usuario",
    txt_apellido: "Demo",
    txt_descripcion: "Descripción por defecto del usuario",
    txt_destacado: "Mensaje destacado por defecto",
    txt_image_alt: "Foto de usuario demo",
    lista_titulos: [
      {
        titulo: "Experiencia",
        descripcion: "Más de 5 años en el sector"
      }
    ]
  },
  hero_banner: {
    titulo_principal: "Bienvenido",
    subtitulo: "Tu inmobiliaria de confianza",
    descripcion: "Encuentra la propiedad perfecta para ti",
    imagen_fondo: "/placeholder.jpg",
    boton_texto: "Ver Propiedades",
    boton_url: "/propiedades"
  },
  services_component: {
    titulo: "Nuestros Servicios",
    descripcion: "Te ayudamos a encontrar la propiedad ideal",
    servicios: [
      {
        icono: "🏠",
        titulo: "Venta",
        descripcion: "Propiedades en venta"
      },
      {
        icono: "🔑",
        titulo: "Alquiler",
        descripcion: "Propiedades en alquiler"
      }
    ]
  }
}

export function CMSFallback({ 
  children, 
  fallbackData, 
  componentType, 
  isLoading, 
  error 
}: CMSFallbackProps) {
  // Si hay error y no hay datos de fallback, mostrar mensaje de error
  if (error && !fallbackData) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 text-sm">
          Error cargando componente: {error}
        </p>
      </div>
    )
  }

  // Si está cargando, mostrar skeleton
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    )
  }

  // Si hay datos de fallback, usarlos
  if (fallbackData) {
    return <>{children}</>
  }

  // Si hay tipo de componente, usar datos estáticos de fallback
  if (componentType && FALLBACK_DATA[componentType as keyof typeof FALLBACK_DATA]) {
    const staticData = FALLBACK_DATA[componentType as keyof typeof FALLBACK_DATA]
    return (
      <div className="opacity-75">
        <div className="text-xs text-gray-500 mb-2">
          Usando datos de fallback para {componentType}
        </div>
        {children}
      </div>
    )
  }

  // Por defecto, mostrar children
  return <>{children}</>
}

// Hook para manejar fallbacks de componentes CMS
export function useCMSFallback(componentType: string, cmsData: any, isLoading: boolean, error: string | null) {
  const fallbackData = cmsData || FALLBACK_DATA[componentType as keyof typeof FALLBACK_DATA]
  
  return {
    fallbackData,
    hasError: !!error,
    isLoading,
    shouldUseFallback: !cmsData && !isLoading
  }
}
