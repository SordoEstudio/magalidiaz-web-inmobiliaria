"use client"

import { useMemo } from 'react';
import { Property } from '@/lib/types/properties';

// Mapeo de valores de API a labels amigables
const PROPERTY_TYPE_LABELS: Record<string, string> = {
  'departamento': 'Departamento',
  'casa': 'Casa',
  'terreno': 'Terreno',
  'lote': 'Lote',
  'local_comercial': 'Local Comercial',
  'oficina': 'Oficina',
  'campo': 'Campo',
  'deposito': 'Depósito',
  'galpon': 'Galpón'
};

const TRANSACTION_TYPE_LABELS: Record<string, string> = {
  'venta': 'Venta',
  'alquiler': 'Alquiler',
  'alquiler_temporario': 'Alquiler Temporario'
};

// Mapeo de amenities de API a labels amigables
const AMENITY_LABELS: Record<string, string> = {
  'Piscina': 'Piscina',
  'Cochera cubierta': 'Cochera',
  'Cochera descubierta': 'Cochera',
  'Jardín': 'Jardín',
  'Balcón': 'Balcón',
  'Gimnasio': 'Gimnasio',
  'Seguridad': 'Seguridad',
  'Aire acondicionado': 'Aire Acondicionado',
  'Calefacción': 'Calefacción',
  'Terraza': 'Terraza',
  'Parrilla': 'Parrilla',
  'Quincho': 'Quincho',
  'Ascensor': 'Ascensor'
};

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface DynamicFilters {
  transactionTypes: FilterOption[];
  propertyTypes: FilterOption[];
  bedrooms: FilterOption[];
  bathrooms: FilterOption[];
  amenities: FilterOption[];
  locations: FilterOption[];
}

export const useDynamicFilters = (properties: Property[] | null): DynamicFilters => {
  return useMemo(() => {
    // Si no hay propiedades, devolver filtros vacíos
    if (!properties || properties.length === 0) {
      return {
        transactionTypes: [],
        propertyTypes: [],
        bedrooms: [],
        bathrooms: [],
        amenities: [],
        locations: []
      };
    }

    // Extraer tipos de transacción únicos
    const transactionTypes = Array.from(
      new Set(properties.map(p => p.transactionType).filter(Boolean))
    ).map(type => ({
      value: type,
      label: TRANSACTION_TYPE_LABELS[type] || type,
      count: properties.filter(p => p.transactionType === type).length
    })).sort((a, b) => a.label.localeCompare(b.label));

    // Extraer tipos de propiedad únicos
    const propertyTypes = Array.from(
      new Set(properties.map(p => p.propertyType).filter(Boolean))
    ).map(type => ({
      value: type,
      label: PROPERTY_TYPE_LABELS[type] || type,
      count: properties.filter(p => p.propertyType === type).length
    })).sort((a, b) => a.label.localeCompare(b.label));

    // Extraer cantidad de dormitorios únicos
    const bedroomCounts = Array.from(
      new Set(properties.map(p => p.features?.bedrooms).filter(count => count !== undefined && count > 0))
    ).sort((a, b) => a - b);

    const bedrooms = bedroomCounts.map(count => ({
      value: count.toString(),
      label: `${count}+`,
      count: properties.filter(p => p.features?.bedrooms >= count).length
    }));

    // Extraer cantidad de baños únicos
    const bathroomCounts = Array.from(
      new Set(properties.map(p => p.features?.bathrooms).filter(count => count !== undefined && count > 0))
    ).sort((a, b) => a - b);

    const bathrooms = bathroomCounts.map(count => ({
      value: count.toString(),
      label: `${count}+`,
      count: properties.filter(p => p.features?.bathrooms >= count).length
    }));

    // Extraer amenities únicos
    const allAmenities = properties.flatMap(p => p.amenities || []);
    const uniqueAmenities = Array.from(new Set(allAmenities)).filter(Boolean);
    
    const amenities = uniqueAmenities
      .map(amenity => {
        // Mapear amenity a un ID conocido o usar el amenity como ID
        let amenityId = amenity.toLowerCase();
        let amenityLabel = AMENITY_LABELS[amenity] || amenity;
        
        // Mapeos específicos para amenities comunes
        if (amenity.toLowerCase().includes('piscina')) {
          amenityId = 'pool';
          amenityLabel = 'Piscina';
        } else if (amenity.toLowerCase().includes('cochera')) {
          amenityId = 'garage';
          amenityLabel = 'Cochera';
        } else if (amenity.toLowerCase().includes('jardín')) {
          amenityId = 'garden';
          amenityLabel = 'Jardín';
        } else if (amenity.toLowerCase().includes('balcón')) {
          amenityId = 'balcony';
          amenityLabel = 'Balcón';
        } else if (amenity.toLowerCase().includes('gimnasio')) {
          amenityId = 'gym';
          amenityLabel = 'Gimnasio';
        } else if (amenity.toLowerCase().includes('seguridad')) {
          amenityId = 'security';
          amenityLabel = 'Seguridad';
        }

        return {
          value: amenityId,
          label: amenityLabel,
          originalAmenity: amenity, // Guardamos el amenity original para filtrado
          count: properties.filter(p => p.amenities?.includes(amenity)).length
        };
      })
      .filter((amenity, index, self) => 
        // Eliminar duplicados basados en el value
        index === self.findIndex(a => a.value === amenity.value)
      )
      .sort((a, b) => a.label.localeCompare(b.label));

    // Extraer ubicaciones únicas
    const locations = Array.from(
      new Set(properties.map(p => p.location).filter(Boolean))
    ).map(location => ({
      value: location,
      label: location,
      count: properties.filter(p => p.location === location).length
    })).sort((a, b) => a.label.localeCompare(b.label));

    return {
      transactionTypes,
      propertyTypes,
      bedrooms,
      bathrooms,
      amenities,
      locations
    };
  }, [properties]);
};

// Hook auxiliar para obtener estadísticas de filtros
export const useFilterStats = (properties: Property[] | null) => {
  return useMemo(() => {
    if (!properties || properties.length === 0) {
      return {
        totalProperties: 0,
        availableProperties: 0,
        avgPrice: 0,
        priceRange: { min: 0, max: 0 }
      };
    }

    const availableProperties = properties.filter(p => p.status === 'disponible');
    const prices = properties.map(p => p.price).filter(price => price > 0);
    
    return {
      totalProperties: properties.length,
      availableProperties: availableProperties.length,
      avgPrice: prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0,
      priceRange: {
        min: prices.length > 0 ? Math.min(...prices) : 0,
        max: prices.length > 0 ? Math.max(...prices) : 0
      }
    };
  }, [properties]);
};
