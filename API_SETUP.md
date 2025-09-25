# 🚀 Configuración de API - MbInmobiliaria

## 📋 Resumen de Cambios

Se ha implementado la integración con la API de propiedades. El frontend ahora consume datos directamente desde la API en lugar de usar archivos JSON estáticos.

## 🔧 Configuración

### 1. Puerto del Frontend
- **Frontend**: `localhost:4000` (ya configurado en package.json)
- **API**: `localhost:3000` (configurado en lib/config.ts)

### 2. Endpoints Configurados
- `GET /api/featured-properties` - Propiedades destacadas para la home
- `GET /api/properties` - Todas las propiedades para búsqueda
- `GET /api/properties/[id]` - Detalle de propiedad específica

## 🏗️ Arquitectura Implementada

### Hooks Creados
- `useProperties()` - Obtiene todas las propiedades
- `useFeaturedProperties()` - Obtiene propiedades destacadas
- `useProperty(id)` - Obtiene una propiedad específica
- `useFilteredProperties()` - Aplica filtros del lado del cliente

### Componentes Actualizados
- `FeaturedPropertiesCarousel` - Usa API para propiedades destacadas
- `PropertyCard` - Adaptado al formato de la API
- `PropertyFilters` - Filtros compatibles con la API
- Páginas de búsqueda y detalle - Consumen datos de la API

## 🚀 Cómo Ejecutar

### 1. Levantar la API
```bash
# En el directorio de la API (puerto 3000)
npm run dev
# o
yarn dev
```

### 2. Levantar el Frontend
```bash
# En este directorio (puerto 4000)
npm run dev
# o
yarn dev
```

### 3. Verificar Funcionamiento
- **Home**: http://localhost:4000 (propiedades destacadas)
- **Búsqueda**: http://localhost:4000/propiedades (todas las propiedades)
- **Detalle**: http://localhost:4000/propiedad/[id] (propiedad específica)

## 🔄 Flujo de Datos

1. **Home Page**: 
   - `useFeaturedProperties()` → API `/featured-properties`
   - Muestra carrusel de propiedades destacadas

2. **Página de Búsqueda**:
   - `useProperties()` → API `/properties`
   - `useFilteredProperties()` → Filtros del lado del cliente
   - Muestra grid de propiedades con filtros

3. **Página de Detalle**:
   - `useProperty(id)` → API `/properties/[id]`
   - Muestra información completa de la propiedad

## ⚙️ Configuración de API

### Cambiar URL de la API
Editar `lib/config.ts`:
```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api', // Cambiar aquí
  // ...
}
```

### Multi-tenancy
Los endpoints soportan el parámetro `clientSlug`:
```typescript
const url = buildApiUrl('/properties', { clientSlug: 'mi-cliente' });
```

## 🎯 Características Implementadas

### ✅ Funcionalidades
- [x] Carga de propiedades destacadas desde API
- [x] Carga de todas las propiedades desde API
- [x] Detalle de propiedad desde API
- [x] Filtros del lado del cliente
- [x] Estados de loading y error
- [x] Fallback a datos locales en caso de error
- [x] Conversión de ObjectId a string para URLs

### 🔧 Tipos de Datos
- [x] Interfaces TypeScript para la API
- [x] Compatibilidad con formato de la API
- [x] Manejo de ObjectId como buffer
- [x] Tipos de propiedades y transacciones

## 🚨 Manejo de Errores

### Estados de Error
- **Loading**: Muestra spinner mientras carga
- **Error**: Muestra mensaje de error con opción de reintentar
- **Sin datos**: Muestra mensaje informativo

### Fallbacks
- Si la API no está disponible, se muestran mensajes de error
- No hay fallback a JSON local (como solicitaste)

## 📱 Responsive
- Todos los componentes mantienen su diseño responsive
- Los filtros funcionan en mobile y desktop
- El carrusel se adapta al tamaño de pantalla

## 🔍 Filtros Implementados
- Tipo de transacción (venta, alquiler, alquiler temporario)
- Tipo de propiedad (departamento, casa, terreno, etc.)
- Ubicación (búsqueda por texto)
- Dormitorios y baños
- Amenities (piscina, cochera, jardín, etc.)
- Búsqueda por texto libre

## 🎨 UI/UX
- **Sin cambios estéticos**: Solo se cambió la obtención de datos
- **Estados de carga**: Spinners y mensajes informativos
- **Navegación**: Links funcionan con IDs de la API
- **Interacciones**: Botones de WhatsApp, compartir, etc.

## 🚀 Próximos Pasos

1. **Probar con API real**: Verificar que los endpoints funcionen
2. **Optimizar cache**: Implementar cache del lado del cliente si es necesario
3. **Paginación**: Si hay muchas propiedades, implementar paginación
4. **Búsqueda avanzada**: Agregar más filtros si es necesario

## 📞 Soporte

Si hay problemas con la integración:
1. Verificar que la API esté corriendo en puerto 3000
2. Revisar la consola del navegador para errores
3. Verificar que los endpoints de la API respondan correctamente
4. Revisar la configuración en `lib/config.ts`
