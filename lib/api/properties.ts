import { API_CONFIG, buildApiUrl } from './config';
import { Property, ApiResponse, PropertyFilters } from '../types/properties';

// Función genérica para hacer requests a la API
async function apiRequest<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Configuración para desarrollo
      cache: 'no-store', // Deshabilitamos cache en desarrollo
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: ApiResponse<T> = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Error en la respuesta de la API');
    }

    return data.data;
  } catch (error) {
    console.error('Error en API request:', error);
    throw error;
  }
}

// Obtener propiedades destacadas
export async function getFeaturedProperties(clientSlug?: string): Promise<Property[]> {
  try {
    const params = clientSlug ? { clientSlug } : undefined;
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.FEATURED_PROPERTIES, params);
    return await apiRequest<Property[]>(url);
  } catch (error) {
    console.warn('API no disponible, usando datos de fallback para propiedades destacadas');
    // Importar datos de fallback dinámicamente

  }
}

// Obtener todas las propiedades
export async function getAllProperties(clientSlug?: string): Promise<Property[]> {
  try {
    const params = clientSlug ? { clientSlug } : undefined;
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.PROPERTIES, params);
    return await apiRequest<Property[]>(url);
  } catch (error) {
    console.warn('API no disponible, usando datos de fallback para todas las propiedades');
    // Importar datos de fallback dinámicamente

  }
}

// Obtener propiedad específica por ID
export async function getPropertyById(id: string, clientSlug?: string): Promise<Property> {
  try {
    const params = clientSlug ? { clientSlug } : undefined;
    const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.PROPERTY_DETAIL}/${id}`, params);
    return await apiRequest<Property>(url);
  } catch (error) {
    console.warn('API no disponible, usando datos de fallback para detalle de propiedad');
    // Importar datos de fallback dinámicamente

  }
}

// Función para filtrar propiedades en el cliente
export function filterProperties(properties: Property[], filters: PropertyFilters): Property[] {
  return properties.filter(property => {
    // Filtro por tipo de transacción
    if (filters.transactionType && property.transactionType !== filters.transactionType) {
      return false;
    }

    // Filtro por tipo de propiedad
    if (filters.propertyType && property.propertyType !== filters.propertyType) {
      return false;
    }

    // Filtro por moneda
    if (filters.currency && property.currency !== filters.currency) {
      return false;
    }

    // Filtro por precio
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }

    // Filtro por ubicación
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    // Filtro por dormitorios
    if (filters.bedrooms && property.features.bedrooms < filters.bedrooms) {
      return false;
    }

    // Filtro por baños
    if (filters.bathrooms && property.features.bathrooms < filters.bathrooms) {
      return false;
    }

    // Filtro por garaje
    if (filters.hasGarage !== undefined) {
      const hasGarage = property.features.garage > 0;
      if (filters.hasGarage !== hasGarage) {
        return false;
      }
    }

    // Filtro de búsqueda
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = [
        property.title,
        property.description,
        property.address,
        property.location,
        ...property.tags
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });
}

// Función para ordenar propiedades
export function sortProperties(properties: Property[], sortBy: string, sortOrder: 'asc' | 'desc' = 'asc'): Property[] {
  return [...properties].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'area':
        comparison = (a.features.coveredArea || 0) - (b.features.coveredArea || 0);
        break;
      case 'bedrooms':
        comparison = a.features.bedrooms - b.features.bedrooms;
        break;
      case 'recent':
        // Asumiendo que tenemos fechas en createdAt
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      default:
        return 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
}
