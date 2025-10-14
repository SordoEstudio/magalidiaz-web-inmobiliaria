// Configuración de entorno
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// Configuración de API basada en entorno
export const API_CONFIG = {
  // URL base según entorno
  BASE_URL: (() => {
    // En producción: usar la URL completa de la API (nunca localhost)
    if (isProduction) {
      const prodApiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      // Si está configurado con localhost en producción, usar fallback
      if (!prodApiUrl || prodApiUrl.includes('localhost')) {
        console.warn('⚠️ NEXT_PUBLIC_API_URL contiene localhost en producción, usando fallback');
        return 'https://micms.website/api/public/v1';
      }
      
      return prodApiUrl;
    }

    if (isDevelopment) {
      return process.env.NEXT_PUBLIC_API_DEV ;
    }
    
    // En desarrollo: usar proxy local o URL directa
    if (process.env.NEXT_PUBLIC_USE_PROXY === 'true') {
      return '/api/public/v1'; // Usa el proxy de Next.js
    }
    
    return process.env.NEXT_PUBLIC_API_URL;
  })(),
  
  // Cliente configurado por variable de entorno
  CLIENT_SLUG: process.env.NEXT_PUBLIC_CLIENT_SLUG || 'harvestech',
  
  // Endpoints
  ENDPOINTS: {
    FEATURED_PROPERTIES: '/properties/featured',
    PROPERTIES: '/properties',
    PROPERTY_DETAIL: '/properties',
    CMS_COMPONENTS: '/cms-components',
    CMS_COMPONENT_DETAIL: '/cms-components'
  }
} as const;

// Función para construir URLs completas con clientSlug
export const buildApiUrl = (endpoint: string, params?: Record<string, string>) => {
  let baseUrl: string;
  
  // En el cliente (browser)
  if (typeof window !== 'undefined') {
    // Si la BASE_URL es relativa, usar el origin actual
    if (API_CONFIG.BASE_URL.startsWith('/')) {
      baseUrl = `${window.location.origin}${API_CONFIG.BASE_URL}${endpoint}`;
    } else {
      baseUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
    }
  } else {
    // En el servidor (SSR/SSG)
    if (API_CONFIG.BASE_URL.startsWith('/')) {
      // Para rutas relativas en servidor, usar localhost
      baseUrl = `${process.env.NEXT_PUBLIC_API_URL}${API_CONFIG.BASE_URL}${endpoint}`;
    } else {
      baseUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
    }
  }
  
  const url = new URL(baseUrl);
  
  // Agregar parámetros adicionales
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  
  // Agregar clientSlug automáticamente solo si no está presente
  if (!url.searchParams.has('clientSlug')) {
    url.searchParams.append('clientSlug', API_CONFIG.CLIENT_SLUG);
  }
  
  return url.toString();
};

// Función para debug de configuración
export const getConfigInfo = () => {
  return {
    environment: process.env.NODE_ENV,
    baseUrl: API_CONFIG.BASE_URL,
    clientSlug: API_CONFIG.CLIENT_SLUG,
    useProxy: process.env.NEXT_PUBLIC_USE_PROXY,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    isClient: typeof window !== 'undefined'
  };
};
