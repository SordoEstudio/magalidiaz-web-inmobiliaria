"use client"

import { useMemo } from 'react';

// Interface basada en el formato de la API
interface Property {
  _id: { buffer: number[] };
  title: string;
  description: string;
  transactionType: 'venta' | 'alquiler' | 'alquiler_temporario';
  propertyType: 'terreno' | 'lote' | 'departamento' | 'casa' | 'local_comercial' | 'oficina' | 'campo' | 'deposito' | 'galpon';
  condition: string;
  status: 'disponible' | 'reservado' | 'vendido' | 'alquilado';
  address: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  addressLink?: string;
  price: number;
  currency: 'ARS' | 'USD';
  features: {
    bedrooms: number;
    bathrooms: number;
    garage: number;
    coveredArea?: number;
    totalArea?: number | null;
  };
  rooms: Record<string, number>;
  image?: string;
  images: Array<{ url: string; alt: string }>;
  tags: string[];
  amenities: string[];
  year?: number;
  isFeatured: boolean;
  publishedAt: any;
  createdAt: any;
  updatedAt: any;
}

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
      if (transactionType && property.transactionType !== transactionType) {
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

      // Filtro por amenities
      if (filters.amenities && filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          property.amenities.some(propAmenity => 
            propAmenity.toLowerCase().includes(amenity.toLowerCase())
          )
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });
  }, [properties, filters]);
};
