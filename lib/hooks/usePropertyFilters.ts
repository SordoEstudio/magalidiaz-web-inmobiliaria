"use client"

import { useMemo } from 'react';

// Interface basada en el formato de la API
import { Property } from '@/lib/types/properties';

interface PropertyFilters {
  transactionType?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  currency?: string;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  hasGarage?: boolean;
  search?: string;
  amenities?: string[];
  operation?: string; // Para compatibilidad con el componente de filtros
}

export const useFilteredProperties = (
  properties: Property[],
  filters: PropertyFilters
) => {
  return useMemo(() => {
    // Verificar que properties sea un array válido
    if (!Array.isArray(properties) || properties.length === 0) {
      console.log('⚠️ Properties is not an array or is empty:', properties);
      return [];
    }

    console.log('�� Filtering properties:', properties.length, 'properties with filters:', filters);

    return properties.filter(property => {
      // Filtro por tipo de transacción (usar operation si está disponible)
      const transactionType = filters.operation || filters.transactionType;
      if (transactionType && transactionType !== 'all' && property.transactionType !== transactionType) {
        return false;
      }

      // Filtro por tipo de propiedad
      if (filters.propertyType && filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) {
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
      if (filters.location && filters.location !== 'all' && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
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

      // Filtro por amenities (con mapeo dinámico)
      if (filters.amenities && filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(selectedAmenity => 
          property.amenities.some(propertyAmenity => {
            const lowerPropertyAmenity = propertyAmenity.toLowerCase();
            const lowerSelectedAmenity = selectedAmenity.toLowerCase();
            
            // Mapeos específicos para amenities comunes
            if (selectedAmenity === 'pool' && lowerPropertyAmenity.includes('piscina')) return true;
            if (selectedAmenity === 'garage' && lowerPropertyAmenity.includes('cochera')) return true;
            if (selectedAmenity === 'garden' && lowerPropertyAmenity.includes('jardín')) return true;
            if (selectedAmenity === 'balcony' && lowerPropertyAmenity.includes('balcón')) return true;
            if (selectedAmenity === 'gym' && lowerPropertyAmenity.includes('gimnasio')) return true;
            if (selectedAmenity === 'security' && lowerPropertyAmenity.includes('seguridad')) return true;
            
            // Coincidencia directa o por inclusión
            return lowerPropertyAmenity.includes(lowerSelectedAmenity) || 
                   lowerSelectedAmenity.includes(lowerPropertyAmenity);
          })
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });
  }, [properties, filters]);
};
