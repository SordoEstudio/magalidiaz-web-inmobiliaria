# 🏠 API Endpoints de Propiedades - Documentación Frontend

## 📋 Resumen

Esta documentación describe los endpoints públicos simplificados para el sistema de propiedades, diseñados para ser consumidos por el frontend con una estrategia de filtrado del lado del cliente.

## 🎯 Estrategia de Implementación

- **Sin paginación**: Ideal para volúmenes pequeños de datos
- **Sin filtros complejos**: Frontend aplica filtros con `useMemo/useCallback`
- **Endpoints directos**: URLs simples y fáciles de consumir
- **Cache optimizado**: Diferentes tiempos según el tipo de endpoint

---

## 📡 Endpoints Disponibles

### 1. ⭐ Propiedades Destacadas

**Endpoint:** `GET /api/featured-properties`

**Descripción:** Retorna 4-6 propiedades con `isFeatured: true`

**Parámetros de Query:**
- `clientSlug` (opcional): Slug del cliente para multi-tenancy

**Ejemplo de Uso:**
```javascript
// Obtener propiedades destacadas
const response = await fetch('/api/featured-properties');
const data = await response.json();

// Con cliente específico
const response = await fetch('/api/featured-properties?clientSlug=mi-cliente');
const data = await response.json();
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "_id": {"buffer": [104, 209, 186, 245, ...]},
      "title": "Departamento de lujo con amenities",
      "description": "Hermosa propiedad ubicada en Puerto Madero, CABA...",
      "transactionType": "venta",
      "propertyType": "departamento",
      "condition": "excelente estado",
      "status": "disponible",
      "address": "Manuel Belgrano 565",
      "location": "Puerto Madero, CABA",
      "coordinates": {
        "lat": -34.6037,
        "lng": -58.3816
      },
      "addressLink": "https://www.google.com/maps/embed?...",
      "price": 450000,
      "currency": "USD",
      "features": {
        "bedrooms": 2,
        "bathrooms": 2,
        "garage": 1,
        "coveredArea": 95,
        "totalArea": null
      },
      "rooms": {},
      "image": "http://localhost:3000/luxury-apartment-building-modern.png",
      "images": [
        {
          "url": "http://localhost:3000/luxury-apartment-building-modern.png",
          "alt": "Departamento de lujo con amenities"
        }
      ],
      "tags": [],
      "amenities": [],
      "year": 2025,
      "isFeatured": true,
      "publishedAt": {},
      "createdAt": {},
      "updatedAt": {}
    }
  ],
  "count": 6
}
```

**Cache:** 30 minutos

---

### 2. 🏠 Todas las Propiedades

**Endpoint:** `GET /api/properties`

**Descripción:** Retorna array completo de propiedades disponibles

**Parámetros de Query:**
- `clientSlug` (opcional): Slug del cliente para multi-tenancy

**Ejemplo de Uso:**
```javascript
// Obtener todas las propiedades
const response = await fetch('/api/properties');
const data = await response.json();

// Con cliente específico
const response = await fetch('/api/properties?clientSlug=mi-cliente');
const data = await response.json();
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    // Array completo de propiedades con la misma estructura que featured-properties
  ],
  "count": 11
}
```

**Cache:** 15 minutos

---

### 3. 🏡 Propiedad Específica

**Endpoint:** `GET /api/properties/[id]`

**Descripción:** Retorna propiedad completa con todos los detalles

**Parámetros:**
- `id` (requerido): ObjectId de la propiedad en formato hexadecimal

**Parámetros de Query:**
- `clientSlug` (opcional): Slug del cliente para multi-tenancy

**Ejemplo de Uso:**
```javascript
// Obtener propiedad específica
const propertyId = '68d1baf4864bd1a22308a555';
const response = await fetch(`/api/properties/${propertyId}`);
const data = await response.json();

// Con cliente específico
const response = await fetch(`/api/properties/${propertyId}?clientSlug=mi-cliente`);
const data = await response.json();
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    // Propiedad completa con la misma estructura que featured-properties
  }
}
```

**Cache:** 1 hora

---

## 🔧 Implementación en React

### Hook Personalizado

```typescript
// hooks/useProperties.ts
import { useState, useEffect } from 'react';

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
    totalArea?: number;
  };
  rooms: Record<string, number>;
  image?: string;
  gallery: Array<{ url: string; alt: string }>;
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
  data: Property[];
  count?: number;
}

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/properties');
        const data: ApiResponse = await response.json();
        
        if (data.success) {
          setProperties(data.data);
        } else {
          setError('Error al cargar propiedades');
        }
      } catch (err) {
        setError('Error de conexión');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error };
};

export const useFeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/featured-properties');
        const data: ApiResponse = await response.json();
        
        if (data.success) {
          setFeaturedProperties(data.data);
        } else {
          setError('Error al cargar propiedades destacadas');
        }
      } catch (err) {
        setError('Error de conexión');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return { featuredProperties, loading, error };
};

export const useProperty = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/properties/${id}`);
        const data: { success: boolean; data: Property } = await response.json();
        
        if (data.success) {
          setProperty(data.data);
        } else {
          setError('Propiedad no encontrada');
        }
      } catch (err) {
        setError('Error de conexión');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return { property, loading, error };
};
```

### Filtros del Lado del Cliente

```typescript
// utils/propertyFilters.ts
import { useMemo } from 'react';
import { Property } from '@/types/properties';

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
}

export const useFilteredProperties = (
  properties: Property[],
  filters: PropertyFilters
) => {
  return useMemo(() => {
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
  }, [properties, filters]);
};
```

### Componente de Ejemplo

```typescript
// components/PropertyList.tsx
import React, { useState } from 'react';
import { useProperties } from '@/hooks/useProperties';
import { useFilteredProperties } from '@/utils/propertyFilters';

export const PropertyList: React.FC = () => {
  const { properties, loading, error } = useProperties();
  const [filters, setFilters] = useState<PropertyFilters>({});
  
  const filteredProperties = useFilteredProperties(properties, filters);

  if (loading) return <div>Cargando propiedades...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Filtros */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar..."
          value={filters.search || ''}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        
        <select
          value={filters.transactionType || ''}
          onChange={(e) => setFilters({ ...filters, transactionType: e.target.value })}
        >
          <option value="">Todos los tipos</option>
          <option value="venta">Venta</option>
          <option value="alquiler">Alquiler</option>
          <option value="alquiler_temporario">Alquiler Temporario</option>
        </select>

        <select
          value={filters.propertyType || ''}
          onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
        >
          <option value="">Todos los tipos</option>
          <option value="departamento">Departamento</option>
          <option value="casa">Casa</option>
          <option value="terreno">Terreno</option>
          <option value="local_comercial">Local Comercial</option>
        </select>
      </div>

      {/* Lista de propiedades */}
      <div className="properties-grid">
        {filteredProperties.map((property) => (
          <div key={property._id.buffer.join(',')} className="property-card">
            <h3>{property.title}</h3>
            <p>{property.location}</p>
            <p>{property.currency} {property.price.toLocaleString()}</p>
            <p>{property.features.bedrooms} dormitorios, {property.features.bathrooms} baños</p>
            {property.image && (
              <img src={property.image} alt={property.title} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 🚨 Manejo de Errores

### Códigos de Estado HTTP

- **200**: Éxito
- **400**: ID de propiedad inválido
- **404**: Propiedad no encontrada o cliente no encontrado
- **500**: Error interno del servidor

### Estructura de Error

```json
{
  "success": false,
  "message": "Descripción del error"
}
```

---

## 🔄 Multi-tenancy

Los endpoints soportan multi-tenancy a través de:

1. **Parámetro `clientSlug`**: `?clientSlug=mi-cliente`
2. **Header `Host`**: Subdominio automático
3. **Cliente por defecto**: Si no se especifica ninguno

---

## 📊 Cache y Performance

- **Propiedades destacadas**: 30 minutos de cache
- **Todas las propiedades**: 15 minutos de cache  
- **Propiedad específica**: 1 hora de cache
- **Stale-while-revalidate**: Cache inteligente para mejor UX

---

## 🎨 Tipos de Propiedades Soportados

- `terreno`
- `lote`
- `departamento`
- `casa`
- `local_comercial`
- `oficina`
- `campo`
- `deposito`
- `galpon`

## 💰 Tipos de Transacción

- `venta`
- `alquiler`
- `alquiler_temporario`

## 🌍 Monedas Soportadas

- `ARS` (Peso Argentino)
- `USD` (Dólar Estadounidense)

---

## 📝 Notas de Implementación

1. **ObjectId**: Los IDs vienen como buffer, necesitarás convertirlos a string para usar en URLs
2. **Imágenes**: Las URLs ya están procesadas y son absolutas
3. **Fechas**: Vienen como objetos Date de MongoDB
4. **Filtros**: Implementa filtros del lado del cliente para mejor performance
5. **Cache**: Los endpoints tienen cache configurado, no necesitas implementar cache adicional

---

## 🔗 URLs de Ejemplo

```bash
# Propiedades destacadas
GET http://localhost:3000/api/featured-properties

# Todas las propiedades
GET http://localhost:3000/api/properties

# Propiedad específica
GET http://localhost:3000/api/properties/68d1baf4864bd1a22308a555

# Con cliente específico
GET http://localhost:3000/api/properties?clientSlug=mi-cliente
```
