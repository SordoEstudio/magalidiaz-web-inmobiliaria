"use client"

import { useCMSComponents } from './useCMSComponents'

/**
 * Hook optimizado para obtener todos los datos CMS de una página
 * Una sola llamada API para todos los componentes
 */
export function usePageCMS() {
  const { 
    components, 
    loading, 
    error, 
    getComponentByType, 
    getComponentsByPage,
    cacheStats 
  } = useCMSComponents()

  // Datos específicos por tipo de componente
  const heroData = getComponentByType('hero_component')
  const aboutData = getComponentByType('about_component')
  const contactData = getComponentByType('contact_info')
  const servicesData = getComponentByType('service_section')
  const faqData = getComponentByType('faq_section')
  const bannerCardData = getComponentByType('banner_card_component')
  const bannerHeroData = getComponentByType('banner_hero_component')
  const promotionalBannerData = getComponentByType('promotional_banner')

  return {
    // Datos específicos
    heroData,
    aboutData,
    servicesData,
    faqData,
    contactData,
    bannerCardData,
    bannerHeroData,
    promotionalBannerData,

    // Estado global
    components,
    loading,
    error,
    cacheStats,
    
    // Funciones de utilidad
    getComponentByType,
    getComponentsByPage,
    
    // Helpers para verificar si hay datos
    hasHeroData: !!heroData,
    hasAboutData: !!aboutData,
    hasContactData: !!contactData,
    hasServicesData: !!servicesData,
    hasFaqData: !!faqData,
    hasPromotionalBannerData: !!promotionalBannerData,
  }
}

/**
 * Hook específico para componentes críticos que necesitan actualización en tiempo real
 * Útil para componentes que cambian frecuentemente o necesitan datos frescos
 */
export function useCriticalCMS(componentType: string, fallbackData: any) {
  const { getComponentByType, loading, error } = useCMSComponents()
  
  const componentData = getComponentByType(componentType)
  const data = componentData?.data || fallbackData
  
  return {
    data,
    loading,
    error,
    isFromCMS: !!componentData,
    component: componentData
  }
}

/**
 * Hook para componentes que pueden ser lazy loaded
 * Útil para componentes que no son críticos para el renderizado inicial
 */
export function useLazyCMS(componentType: string, fallbackData: any) {
  const { getComponentByType } = useCMSComponents()
  
  const componentData = getComponentByType(componentType)
  const data = componentData?.data || fallbackData
  
  return {
    data,
    isFromCMS: !!componentData,
    component: componentData
  }
}
