# Componentes de Mapas para Propiedades

## Descripción
Componentes de mapas completamente responsive y flexibles para mostrar la ubicación de propiedades inmobiliarias. Soporta múltiples proveedores de mapas y diferentes tipos de visualización.

## Características

### ✨ Funcionalidades Principales
- **Múltiples proveedores** - Google Maps, OpenStreetMap, Mapbox, HERE Maps
- **Tipos de mapa** - Interactivo, estático, embebido
- **Modal fullscreen** - Vista en pantalla completa
- **Responsive** - Se adapta a todos los dispositivos
- **Fallbacks** - Múltiples opciones de respaldo
- **Sin API key** - OpenStreetMap funciona sin configuración

### 🗺️ Proveedores de Mapas

#### 1. OpenStreetMap (Recomendado)
- ✅ **Gratuito** - Sin API key requerida
- ✅ **Open source** - Sin restricciones de uso
- ✅ **Buena calidad** - Mapas detallados
- ✅ **Responsive** - Funciona en todos los dispositivos

#### 2. Google Maps
- ✅ **Alta calidad** - Mapas muy detallados
- ✅ **Integración** - Fácil integración con otros servicios
- ❌ **API key** - Requiere configuración
- ❌ **Costos** - Puede tener costos por uso

#### 3. Mapbox
- ✅ **Personalizable** - Estilos personalizados
- ✅ **Buena calidad** - Mapas modernos
- ❌ **API key** - Requiere configuración
- ❌ **Costos** - Plan gratuito limitado

#### 4. HERE Maps
- ✅ **Empresarial** - Para uso comercial
- ✅ **Buena calidad** - Mapas profesionales
- ❌ **API key** - Requiere configuración
- ❌ **Costos** - Plan de pago

## Uso

### Importación
```tsx
import { PropertyMap } from "@/components/property-gallery-v2"
import { PropertyMapAlternatives, RecommendedPropertyMap } from "@/components/property-map-alternatives"
```

### Uso Básico (Recomendado)
```tsx
<RecommendedPropertyMap
  address="Av. Corrientes 1234, San Vicente, Buenos Aires"
  coordinates={{ lat: -34.6037, lng: -58.3816 }}
/>
```

### Uso con Google Maps
```tsx
<GooglePropertyMap
  address="Av. Corrientes 1234, San Vicente, Buenos Aires"
  coordinates={{ lat: -34.6037, lng: -58.3816 }}
/>
```

### Uso Avanzado
```tsx
<PropertyMapAlternatives
  address="Av. Corrientes 1234, San Vicente, Buenos Aires"
  coordinates={{ lat: -34.6037, lng: -58.3816 }}
  mapProvider="openstreetmap"
  mapType="interactive"
  showFullscreen={true}
  height="h-[300px]"
/>
```

## Props

### PropertyMapAlternatives

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `address` | `string` | **requerido** | Dirección de la propiedad |
| `coordinates` | `{lat: number, lng: number}` | `undefined` | Coordenadas GPS |
| `mapProvider` | `'google' \| 'openstreetmap' \| 'mapbox' \| 'here'` | `'google'` | Proveedor del mapa |
| `mapType` | `'interactive' \| 'static' \| 'embed'` | `'interactive'` | Tipo de visualización |
| `showFullscreen` | `boolean` | `true` | Mostrar botón pantalla completa |
| `height` | `string` | `'h-[300px]'` | Altura del mapa |
| `className` | `string` | `''` | Clases CSS adicionales |

## Ejemplos de Uso

### Página de Propiedad
```tsx
function PropertyPage({ property }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <RecommendedPropertyMap
        address={property.address}
        coordinates={property.coordinates}
      />
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Ubicación</h3>
        <p className="text-muted-foreground">{property.address}</p>
      </div>
    </div>
  )
}
```

### Card de Propiedad
```tsx
function PropertyCard({ property }) {
  return (
    <Card>
      <PropertyMapAlternatives
        address={property.address}
        coordinates={property.coordinates}
        mapProvider="openstreetmap"
        mapType="static"
        showFullscreen={false}
        height="h-[150px]"
      />
      {/* Resto del card */}
    </Card>
  )
}
```

### Mapa Compacto
```tsx
function CompactMap({ address, coordinates }) {
  return (
    <PropertyMapAlternatives
      address={address}
      coordinates={coordinates}
      mapProvider="openstreetmap"
      mapType="static"
      showFullscreen={false}
      height="h-[200px]"
    />
  )
}
```

## Configuración de API Keys

### Google Maps
```javascript
// next.config.js
module.exports = {
  env: {
    GOOGLE_MAPS_API_KEY: 'tu-api-key-aqui',
  },
}
```

### Mapbox
```javascript
// next.config.js
module.exports = {
  env: {
    MAPBOX_ACCESS_TOKEN: 'tu-access-token-aqui',
  },
}
```

### HERE Maps
```javascript
// next.config.js
module.exports = {
  env: {
    HERE_API_KEY: 'tu-api-key-aqui',
  },
}
```

## Responsive Design

### Breakpoints
- **Mobile** (< 768px) - Mapa compacto, controles táctiles
- **Tablet** (768px - 1024px) - Mapa mediano, controles híbridos
- **Desktop** (> 1024px) - Mapa completo, controles de mouse

### Adaptaciones por Dispositivo
```tsx
// Altura responsive
<PropertyMapAlternatives
  height="h-[200px] md:h-[300px] lg:h-[400px]"
  // ...
/>
```

## Modal Fullscreen

### Características
- **Pantalla completa** - Ocupa todo el viewport
- **Navegación** - Botones para cerrar y abrir en Maps
- **Responsive** - Se adapta a cualquier pantalla
- **Accesibilidad** - Navegación por teclado

### Uso
```tsx
<PropertyMapAlternatives
  showFullscreen={true} // Habilita el modal
  // ...
/>
```

## Fallbacks y Error Handling

### Estrategia de Fallback
1. **Primera opción** - Proveedor seleccionado
2. **Segunda opción** - OpenStreetMap (si falla)
3. **Tercera opción** - Imagen estática con link

### Implementación
```tsx
// Fallback automático en caso de error
<PropertyMapAlternatives
  mapProvider="google" // Si falla, usa OpenStreetMap
  // ...
/>
```

## Performance

### Optimizaciones
- **Lazy loading** - iframe se carga bajo demanda
- **Error handling** - Fallbacks automáticos
- **Responsive images** - Tamaños optimizados
- **Caching** - Mapas estáticos se cachean

### Métricas
- **First Contentful Paint** - < 2s
- **Largest Contentful Paint** - < 3s
- **Cumulative Layout Shift** - < 0.1

## Accesibilidad

### Características
- **ARIA labels** - Etiquetas para lectores de pantalla
- **Navegación por teclado** - Escape para cerrar modal
- **Contraste** - Colores accesibles
- **Alt text** - Descripciones de imágenes

### Implementación
```tsx
<PropertyMapAlternatives
  // Automáticamente incluye:
  // - aria-label en botones
  // - alt text en imágenes
  // - navegación por teclado
  // ...
/>
```

## Troubleshooting

### Problemas Comunes

**El mapa no se carga:**
```tsx
// Verificar que las coordenadas sean correctas
const coordinates = {
  lat: -34.6037, // Latitud (sur = negativo)
  lng: -58.3816  // Longitud (oeste = negativo)
}
```

**API key no funciona:**
```tsx
// Verificar configuración en next.config.js
module.exports = {
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
}
```

**Modal no se abre:**
```tsx
// Verificar que el componente tenga "use client"
"use client"

import { PropertyMapAlternatives } from "@/components/property-map-alternatives"
```

### Debug
```tsx
// Agregar logs para debug
console.log('Address:', address)
console.log('Coordinates:', coordinates)
console.log('Map Provider:', mapProvider)
```

## Recomendaciones

### Para Desarrollo
- **Usar OpenStreetMap** - No requiere API key
- **Implementar fallbacks** - Múltiples opciones
- **Testear en mobile** - Verificar responsive

### Para Producción
- **Configurar API keys** - Para mejor calidad
- **Implementar caching** - Para mejor performance
- **Monitorear uso** - Para controlar costos

### Para SEO
- **Usar coordenadas** - Mejor para SEO local
- **Incluir dirección** - Texto visible para crawlers
- **Schema markup** - Estructura de datos

## Roadmap

### Próximas Mejoras
- [ ] Integración con Leaflet
- [ ] Mapas 3D
- [ ] Street View
- [ ] Rutas y direcciones
- [ ] Múltiples marcadores
- [ ] Clusters de propiedades
- [ ] Filtros por zona
- [ ] Integración con CMS

### Versiones Futuras
- **v2.0** - Integración con Leaflet
- **v2.1** - Mapas 3D y Street View
- **v3.0** - Sistema completo de mapas
- **v3.1** - Integración con CMS

## Migración

### Desde Componente Anterior
```tsx
// ANTES
<PropertyMap address={address} addressLink={link} />

// AHORA
<RecommendedPropertyMap
  address={address}
  coordinates={coordinates}
/>
```

### Compatibilidad
- **Props existentes** - Mantienen compatibilidad
- **Nuevas props** - Tienen valores por defecto
- **Breaking changes** - Ninguno
- **Migration guide** - Disponible en documentación
