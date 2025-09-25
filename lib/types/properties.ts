// Tipos para las propiedades basados en la documentación de la API

export interface PropertyCoordinates {
  lat: number;
  lng: number;
}

export interface PropertyFeatures {
  bedrooms: number;
  bathrooms: number;
  garage: number;
  coveredArea?: number;
  totalArea?: number;
}

export interface PropertyImage {
  url: string;
  alt: string;
}

export interface PropertyId {
  buffer: number[];
}

export interface Property {
  _id?: PropertyId;
  id?: string; // Para compatibilidad con formato anterior
  title: string;
  description: string;
  transactionType: 'venta' | 'alquiler' | 'alquiler_temporario';
  propertyType: 'terreno' | 'lote' | 'departamento' | 'casa' | 'local_comercial' | 'oficina' | 'campo' | 'deposito' | 'galpon';
  condition: string;
  status: 'disponible' | 'reservado' | 'vendido' | 'alquilado';
  address: string;
  location: string;
  coordinates?: PropertyCoordinates;
  addressLink?: string;
  price: number;
  currency: 'ARS' | 'USD';
  features: PropertyFeatures;
  rooms: Record<string, number>;
  image?: string;
  images: PropertyImage[];
  tags: string[];
  amenities: string[];
  year?: number;
  isFeatured: boolean;
  publishedAt: any;
  createdAt: any;
  updatedAt: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export interface PropertyFilters {
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
}

// Función para convertir ObjectId a string (con validación)
export const propertyIdToString = (id: PropertyId | string | undefined): string => {
  if (!id) {
    return Math.random().toString(36).substr(2, 9); // ID temporal si no hay ID
  }
  
  if (typeof id === 'string') {
    return id;
  }
  
  if (id.buffer && Array.isArray(id.buffer)) {
    return Buffer.from(id.buffer).toString('hex');
  }
  
  return Math.random().toString(36).substr(2, 9); // ID temporal si el formato no es válido
};

// Función para convertir string a ObjectId
export const stringToPropertyId = (id: string): PropertyId => {
  return { buffer: Array.from(Buffer.from(id, 'hex')) };
};

// Función para obtener un ID único de una propiedad
export const getPropertyId = (property: Property): string => {
  if (property.id) {
    return property.id;
  }
  
  if (property._id) {
    return propertyIdToString(property._id);
  }
  
  return Math.random().toString(36).substr(2, 9);
};
