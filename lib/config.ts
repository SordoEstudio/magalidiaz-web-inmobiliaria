// Configuración unificada de la API y cliente
export const API_CONFIG = {
  // URL base para desarrollo
  BASE_URL: '/api/public/v1',
  
  // Cliente para pruebas
  CLIENT_SLUG: 'harvestech',
  
  // Endpoints
  ENDPOINTS: {
    FEATURED_PROPERTIES: '/properties/featured',
    PROPERTIES: '/properties',
    PROPERTY_DETAIL: '/properties'
  }
} as const;

// Función para construir URLs completas con clientSlug
export const buildApiUrl = (endpoint: string, params?: Record<string, string>) => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`, window.location.origin);
  
  // Agregar clientSlug automáticamente
  url.searchParams.append('clientSlug', API_CONFIG.CLIENT_SLUG);
  
  // Agregar parámetros adicionales
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  
  return url.toString();
};
