"use client"

import { useState, useEffect } from 'react';
import { API_CONFIG, buildApiUrl } from '@/lib/config';

// Tipos basados en la respuesta real de la API
interface Property {
  _id: { 
    buffer: { [key: string]: number } // Objeto con propiedades numéricas, no array
  };
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

interface ApiResponse {
  success: boolean;
  data: {
    properties: Property[];
    pagination: {
      total: number;
      page: number;
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
          mode: 'cors', // Agregar modo CORS
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
export const useFeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.FEATURED_PROPERTIES);
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
  }, []);

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

// Función para convertir ObjectId buffer a string - MEJORADA
export const objectIdToString = (objectId: { buffer: { [key: string]: number } }): string => {
  console.log('🔄 Converting objectId to string:', objectId);
  
  if (!objectId || !objectId.buffer) {
    console.log('⚠️ Invalid objectId structure');
    return 'unknown';
  }

  try {
    // Convertir el objeto buffer a array de números
    const bufferArray = Object.keys(objectId.buffer)
      .sort((a, b) => parseInt(a) - parseInt(b)) // Ordenar por índice numérico
      .map(key => objectId.buffer[key]);
    
    console.log('✅ Buffer array:', bufferArray);
    
    // Verificar que todos los valores sean números válidos
    if (bufferArray.some(val => isNaN(val) || val < 0 || val > 255)) {
      console.log('⚠️ Invalid buffer values');
      return 'unknown';
    }
    
    // Convertir a string hexadecimal
    const hexString = bufferArray.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log('✅ Hex string:', hexString);
    
    return hexString;
  } catch (error) {
    console.error('❌ Error converting objectId:', error);
    return 'unknown';
  }
};

// Función para generar key único para React
export const getPropertyKey = (property: Property, index: number): string => {
  try {
    const id = objectIdToString(property._id);
    if (id === 'unknown') {
      console.warn('⚠️ Generated unknown ID for property, using index');
      return `property-${index}`;
    }
    return id;
  } catch (error) {
    console.warn('Error generating property key, using index:', error);
    return `property-${index}`;
  }
};

// Función para convertir string a ObjectId buffer (para URLs)
export const stringToObjectId = (id: string): { buffer: { [key: string]: number } } => {
  const bytes: { [key: string]: number } = {};
  for (let i = 0; i < id.length; i += 2) {
    const byteIndex = Math.floor(i / 2);
    bytes[byteIndex.toString()] = parseInt(id.substr(i, 2), 16);
  }
  return { buffer: bytes };
};
