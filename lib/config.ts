// Configuración de la API
export const API_CONFIG = {
  // URL base para desarrollo - usar proxy de Next.js
  BASE_URL: '/api/public/v1', // Cambiado a la nueva estructura de endpoints
  
  // Endpoints
  ENDPOINTS: {
    FEATURED_PROPERTIES: '/featured-properties',
    PROPERTIES: '/properties',
    PROPERTY_DETAIL: '/properties'
  }
} as const;

// Función para construir URLs completas
export const buildApiUrl = (endpoint: string, params?: Record<string, string>) => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`, window.location.origin);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  
  return url.toString();
};
