// Configuración de la API
export const API_CONFIG = {
  // URL base de la API (backend en puerto 3000)
  BASE_URL: process.env.NEXT_PUBLIC_API_URL ,
  // Endpoints
  ENDPOINTS: {
    FEATURED_PROPERTIES: '/api/public/v1/properties/featured',
    PROPERTIES: '/api/public/v1/properties',
    PROPERTY_DETAIL: '/api/public/v1/properties'
  },
  
  // Configuración de cache
  CACHE: {
    FEATURED_PROPERTIES: 24 * 60 * 60 * 1000, // 24 horas
    PROPERTIES: 24 * 60 * 60 * 1000, // 24 horas
    PROPERTY_DETAIL: 24 * 60 * 60 * 1000, // 24 horas
  }
} as const;

// Función para construir URLs completas
export const buildApiUrl = (endpoint: string, params?: Record<string, string>) => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  
  return url.toString();
};

// Función para verificar si la API está disponible
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};
