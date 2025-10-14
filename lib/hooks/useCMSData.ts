"use client"

import { useCMSComponents } from './useCMSComponents'
import { CMSComponent } from '@/lib/types/cms-components'

/**
 * Hook simplificado para obtener datos de componentes CMS
 * @param componentType - Tipo de componente a buscar
 * @param fallbackData - Datos de fallback si no se encuentra el componente
 * @returns Datos del componente o fallback
 */
export function useCMSData<T = any>(
  componentType: string, 
  fallbackData?: T
): {
  data: T | null
  component: CMSComponent | null
  loading: boolean
  error: string | null
  isFromCMS: boolean
} {
  const { getComponentByType, loading, error } = useCMSComponents()
  
  const component = getComponentByType(componentType)
  const data = component?.data || fallbackData || null
  const isFromCMS = !!component?.data
  
  return {
    data,
    component,
    loading,
    error,
    isFromCMS
  }
}

/**
 * Hook para obtener múltiples componentes por página
 * @param page - Página a buscar
 * @returns Array de componentes de la página
 */
export function useCMSDataByPage(page: string) {
  const { getComponentsByPage, loading, error } = useCMSComponents()
  
  const components = getComponentsByPage(page)
  
  return {
    components,
    loading,
    error
  }
}

/**
 * Hook para obtener un componente específico con datos tipados
 * @param componentType - Tipo de componente
 * @param fallbackData - Datos de fallback
 * @returns Datos tipados del componente
 */
export function useTypedCMSData<T>(
  componentType: string,
  fallbackData: T
): {
  data: T
  loading: boolean
  error: string | null
  isFromCMS: boolean
} {
  const { data, loading, error, isFromCMS } = useCMSData(componentType, fallbackData)
  
  return {
    data: data as T,
    loading,
    error,
    isFromCMS
  }
}
