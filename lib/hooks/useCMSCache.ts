"use client"

import { useState, useEffect, useCallback } from 'react'
import { CMSComponent } from '@/lib/types/cms-components'

interface CMSCacheEntry {
  data: CMSComponent[]
  timestamp: number
  expiresAt: number
}

interface CMSCache {
  [key: string]: CMSCacheEntry
}

// Cache en memoria con TTL
const CACHE_TTL = 5 * 60 * 1000 // 5 minutos
const CACHE_KEY = 'cms_components_cache'

export const useCMSCache = () => {
  const [cache, setCache] = useState<CMSCache>({})

  // Cargar cache desde localStorage al inicializar
  useEffect(() => {
    try {
      const storedCache = localStorage.getItem(CACHE_KEY)
      if (storedCache) {
        const parsedCache = JSON.parse(storedCache)
        // Verificar que el cache no haya expirado
        const now = Date.now()
        const validCache: CMSCache = {}
        
        Object.entries(parsedCache).forEach(([key, entry]: [string, any]) => {
          if (entry.expiresAt > now) {
            validCache[key] = entry
          }
        })
        
        setCache(validCache)
      }
    } catch (error) {
      console.warn('Error loading CMS cache:', error)
    }
  }, [])

  // Guardar cache en localStorage
  const saveCache = useCallback((newCache: CMSCache) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(newCache))
    } catch (error) {
      console.warn('Error saving CMS cache:', error)
    }
  }, [])

  // Obtener datos del cache
  const getFromCache = useCallback((key: string): CMSComponent[] | null => {
    const entry = cache[key]
    if (!entry) return null
    
    const now = Date.now()
    if (now > entry.expiresAt) {
      // Cache expirado, remover
      const newCache = { ...cache }
      delete newCache[key]
      setCache(newCache)
      saveCache(newCache)
      return null
    }
    
    return entry.data
  }, [cache, saveCache])

  // Guardar datos en cache
  const setCacheData = useCallback((key: string, data: CMSComponent[]) => {
    const now = Date.now()
    const newEntry: CMSCacheEntry = {
      data,
      timestamp: now,
      expiresAt: now + CACHE_TTL
    }
    
    const newCache = {
      ...cache,
      [key]: newEntry
    }
    
    setCache(newCache)
    saveCache(newCache)
  }, [cache, saveCache])

  // Limpiar cache expirado
  const cleanExpiredCache = useCallback(() => {
    const now = Date.now()
    const newCache: CMSCache = {}
    
    Object.entries(cache).forEach(([key, entry]) => {
      if (entry.expiresAt > now) {
        newCache[key] = entry
      }
    })
    
    if (Object.keys(newCache).length !== Object.keys(cache).length) {
      setCache(newCache)
      saveCache(newCache)
    }
  }, [cache, saveCache])

  // Limpiar todo el cache
  const clearCache = useCallback(() => {
    setCache({})
    localStorage.removeItem(CACHE_KEY)
  }, [])

  // Obtener estadísticas del cache
  const getCacheStats = useCallback(() => {
    const now = Date.now()
    const total = Object.keys(cache).length
    const expired = Object.values(cache).filter(entry => entry.expiresAt <= now).length
    const valid = total - expired
    
    return {
      total,
      valid,
      expired,
      hitRate: valid / Math.max(total, 1)
    }
  }, [cache])

  return {
    getFromCache,
    setCacheData,
    cleanExpiredCache,
    clearCache,
    getCacheStats,
    cache
  }
}
