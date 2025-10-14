"use client"

import { useState, useEffect, useCallback } from 'react';
import { API_CONFIG, buildApiUrl } from '@/lib/config';
import { CMSComponent, CMSComponentsResponse, CMSComponentFilters, UseCMSComponentsReturn } from '@/lib/types/cms-components';
import { useCMSCache } from './useCMSCache';

// Hook para obtener todos los componentes CMS
export const useCMSComponents = (filters?: CMSComponentFilters): UseCMSComponentsReturn => {
  const [components, setComponents] = useState<CMSComponent[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Cache hook
  const { getFromCache, setCacheData, getCacheStats } = useCMSCache();

  const fetchComponents = useCallback(async () => {
    const startTime = Date.now();
    const requestId = Math.random().toString(36).substr(2, 9);
    
    // Generar clave de cache
    const cacheKey = `cms_${JSON.stringify(filters || {})}`;
    
    try {
      setLoading(true);
      setError(null);

      // Verificar cache primero
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        console.log('🎯 [CACHE HIT] Using cached CMS components');
        setComponents(cachedData);
        setLoading(false);
        return;
      }

      // Construir parámetros de consulta
      const params: Record<string, string> = {
        clientSlug: API_CONFIG.CLIENT_SLUG
      };

      // Agregar filtros si existen
      if (filters?.type) {
        params.type = filters.type;
      }
      if (filters?.page_filter) {
        params.page_filter = filters.page_filter;
      }
      if (filters?.status) {
        params.status = filters.status;
      }

      const url = buildApiUrl(API_CONFIG.ENDPOINTS.CMS_COMPONENTS, params);
      
      console.group(`🔗 [${requestId}] CMS Components API Call`);
      console.log('📡 URL:', url);
      console.log('🔧 Params:', params);
      console.log('🎯 Filters:', filters);
      console.log('⏰ Start Time:', new Date().toISOString());
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseTime = Date.now() - startTime;
      console.log('⏱️ Response Time:', `${responseTime}ms`);
      console.log('📊 Status:', response.status, response.statusText);
      console.log('📋 Headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error Response Body:', errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: CMSComponentsResponse = await response.json();
      
      console.log('📦 Response Data:', data);
      console.log('✅ Success:', data.success);
      console.log('📊 Components Count:', data.data?.components?.length || 0);
      console.log('🏢 Client Info:', data.data?.client);
      
      if (data.success && data.data.components) {
        // Filtrar solo componentes activos y visibles
        const validComponents = data.data.components.filter(component => 
          component.isActive && component.isVisible
        );
        
        setComponents(validComponents);
        
        // Guardar en cache
        setCacheData(cacheKey, validComponents);
        
        console.log('✅ CMS Components loaded successfully');
        console.log('📊 Cache Stats:', getCacheStats());
        
        // Log detallado de cada componente
        validComponents.forEach((component, index) => {
          console.log(`📄 Component ${index + 1}:`, {
            id: component._id,
            name: component.name,
            type: component.type,
            page: component.page,
            status: component.status,
            isActive: component.isActive,
            isVisible: component.isVisible,
            hasData: !!component.data,
            dataKeys: component.data ? Object.keys(component.data) : [],
            hasThumbnail: !!component.thumbnail,
            clientName: component.clientName,
            createdAt: component.createdAt,
            updatedAt: component.updatedAt
          });
        });
      } else {
        console.error('❌ API Response Error:', data.message);
        throw new Error(data.message || 'Error al cargar componentes CMS');
      }
      
      console.groupEnd();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      const responseTime = Date.now() - startTime;
      
      console.group(`❌ [${requestId}] CMS Components API Error`);
      console.error('🚨 Error:', errorMessage);
      console.error('⏱️ Failed after:', `${responseTime}ms`);
      console.error('🔧 Filters used:', filters);
      console.error('📡 URL attempted:', buildApiUrl(API_CONFIG.ENDPOINTS.CMS_COMPONENTS, { clientSlug: API_CONFIG.CLIENT_SLUG }));
      console.groupEnd();
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  );

  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  const refetch = useCallback(() => {
    fetchComponents();
  }, [fetchComponents]);

  // Funciones de utilidad para acceder a componentes
  const getComponentByType = useCallback((type: string) => {
    if (!components) return null;
    return components.find(component => component.type === type);
  }, [components]);

  const getComponentsByPage = useCallback((page: string) => {
    if (!components) return [];
    return components.filter(component => component.page === page);
  }, [components]);

  return {
    components,
    loading,
    error,
    refetch,
    getComponentByType,
    getComponentsByPage,
    cacheStats: getCacheStats()
  };
};

// Hook para obtener un componente específico por ID
export const useCMSComponent = (componentId: string) => {
  const [component, setComponent] = useState<CMSComponent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComponent = async () => {
    const startTime = Date.now();
    const requestId = Math.random().toString(36).substr(2, 9);
    
    try {
      setLoading(true);
      setError(null);

      const params = {
        clientSlug: API_CONFIG.CLIENT_SLUG
      };

      const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.CMS_COMPONENT_DETAIL}/${componentId}`, params);
      
      console.group(`🔗 [${requestId}] CMS Component API Call`);
      console.log('📡 URL:', url);
      console.log('🆔 Component ID:', componentId);
      console.log('🔧 Params:', params);
      console.log('⏰ Start Time:', new Date().toISOString());
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseTime = Date.now() - startTime;
      console.log('⏱️ Response Time:', `${responseTime}ms`);
      console.log('📊 Status:', response.status, response.statusText);
      console.log('📋 Headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error Response Body:', errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      console.log('📦 Response Data:', data);
      console.log('✅ Success:', data.success);
      console.log('🏢 Client Info:', data.data?.client);
      
      if (data.success && data.data.component) {
        setComponent(data.data.component);
        console.log('✅ CMS Component loaded successfully');
        console.log('📄 Component Details:', {
          id: data.data.component._id,
          name: data.data.component.name,
          type: data.data.component.type,
          page: data.data.component.page,
          status: data.data.component.status,
          isActive: data.data.component.isActive,
          isVisible: data.data.component.isVisible,
          hasData: !!data.data.component.data,
          dataKeys: data.data.component.data ? Object.keys(data.data.component.data) : [],
          hasThumbnail: !!data.data.component.thumbnail,
          clientName: data.data.component.clientName,
          createdAt: data.data.component.createdAt,
          updatedAt: data.data.component.updatedAt
        });
      } else {
        console.error('❌ API Response Error:', data.message);
        throw new Error(data.message || 'Error al cargar componente CMS');
      }
      
      console.groupEnd();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      const responseTime = Date.now() - startTime;
      
      console.group(`❌ [${requestId}] CMS Component API Error`);
      console.error('🚨 Error:', errorMessage);
      console.error('⏱️ Failed after:', `${responseTime}ms`);
      console.error('🆔 Component ID:', componentId);
      console.error('📡 URL attempted:', buildApiUrl(`${API_CONFIG.ENDPOINTS.CMS_COMPONENT_DETAIL}/${componentId}`, { clientSlug: API_CONFIG.CLIENT_SLUG }));
      console.groupEnd();
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (componentId) {
      fetchComponent();
    }
  }, [componentId]);

  const refetch = () => {
    if (componentId) {
      fetchComponent();
    }
  };

  return {
    component,
    loading,
    error,
    refetch
  };
};

