"use client"

import { useState, useEffect } from 'react';
import { API_CONFIG, buildApiUrl } from '@/lib/config';

import { Property } from '@/lib/types/properties';

interface ApiResponse {
  success: boolean;
  data: {
    properties: Property[];
    pagination: {
      total: number;
      page: number;
      pages: number;
      hasNext: boolean;
      hasPrev: boolean;
      limit: number;
    };
  };
  count?: number;
}

interface SinglePropertyApiResponse {
  success: boolean;
  data: Property;
}

// Hook para obtener todas las propiedades
export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.PROPERTIES);
        console.log('🔍 Fetching properties from:', url);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });
        const data: ApiResponse = await response.json();
        
        console.log('📊 Properties API Response:', data);
        
        if (data.success) {
          console.log('✅ Properties loaded successfully:', data.data.length, 'properties');
          setProperties(data.data.properties);
        } else {
          setError('Error al cargar propiedades');
        }
      } catch (err) {
        console.error('❌ Error fetching properties:', err);
        setError('Error de conexión');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error };
};

// Hook para obtener propiedades destacadas
export const useFeaturedProperties = (limit: number = 6) => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.FEATURED_PROPERTIES, { 
          limit: limit.toString() 
        });
        console.log('⭐ Fetching featured properties from:', url);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });
        const data: ApiResponse = await response.json();
        
        console.log('📊 Featured Properties API Response:', data);
        
        if (data.success) {
          console.log('✅ Featured properties loaded successfully:', data.data.length, 'properties');
          setFeaturedProperties(data.data);
        } else {
          setError('Error al cargar propiedades destacadas');
        }
      } catch (err) {
        console.error('❌ Error fetching featured properties:', err);
        setError('Error de conexión');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, [limit]);

  return { featuredProperties, loading, error };
};

// Hook para obtener una propiedad específica
export const useProperty = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || id === 'unknown') {
      setError('ID de propiedad inválido');
      setLoading(false);
      return;
    }

    const fetchProperty = async () => {
      try {
        setLoading(true);
        const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.PROPERTY_DETAIL}/${id}`);
        console.log('🏠 Fetching property detail from:', url);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });
        const data: SinglePropertyApiResponse = await response.json();
        
        console.log('📊 Property Detail API Response:', data);
        
        if (data.success) {
          console.log('✅ Property detail loaded successfully');
          setProperty(data.data);
        } else {
          setError('Propiedad no encontrada');
        }
      } catch (err) {
        console.error('❌ Error fetching property:', err);
        setError('Error de conexión');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return { property, loading, error };
};

// Función simplificada para obtener ID de propiedad
export const getPropertyId = (property: Property): string => {
  return property._id || 'unknown';
};

// Función simplificada para generar key único para React
export const getPropertyKey = (property: Property, index: number): string => {
  return property._id || `property-${index}`;
};

// Función para mapear datos de la API al formato del PropertyCard
export const mapPropertyToCard = (property: Property) => {
  return {
    id: property._id.toString(), // Usar directamente el ID
    title: property.title,
    price: property.price,
    currency: property.currency,
    location: property.location,
    image: property.image || '',
    images: property.gallery || [], // Mapear gallery a images para compatibilidad
    features: {
      bedrooms: property.features?.bedrooms || 0,
      bathrooms: property.features?.bathrooms || 0,
      coveredArea: property.features?.coveredArea || 0,
      totalArea: property.features?.totalArea || 0,
      garage: property.features?.garage || 0
    },
    isNew: property.year && property.year >= new Date().getFullYear() - 1,
    isFeatured: property.isFeatured,
    publishedDays: property.publishedAt ? 
      Math.floor((Date.now() - new Date(property.publishedAt).getTime()) / (1000 * 60 * 60 * 24)) : 
      0,
    tags: property.tags || []
  };
};

// Función para mapear datos para componentes que usan gallery
export const mapPropertyToGallery = (property: Property) => {
  return {
    ...property,
    images: property.gallery || [] // Mapear gallery a images para componentes de galería
  };
};
