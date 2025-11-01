# 🚀 Guía Rápida: SEO desde CMS

## ✅ ¿Qué PUEDE gestionarse desde el CMS?

### 🔴 **Metadata Crítica (Server-Side - Obligatorio)**

| Elemento                                    | Ejemplo                           | Impacto SEO   | Carga       |
| ------------------------------------------- | --------------------------------- | ------------- | ----------- | ------ |
| **Nombre del sitio**                        | "Magali Diaz Asesor Inmobiliario" | ⭐⭐⭐ Alto   | Server      |
| **Descripción global**                      | "Encuentra tu propiedad ideal..." | ⭐⭐⭐ Alto   | Server      |
| **Título por página**                       | "Propiedades en Venta             | Inmobiliaria" | ⭐⭐⭐ Alto | Server |
| **Descripción por página**                  | "Explora nuestras propiedades..." | ⭐⭐⭐ Alto   | Server      |
| **OG Image por página**                     | "/images/og-home.jpg"             | ⭐⭐ Medio    | Server      |
| **Keywords**                                | ["propiedades", "casas", "venta"] | ⭐⭐ Medio    | Server      |
| **Info RealEstateAgent**                    | Nombre, email, teléfono           | ⭐⭐⭐ Alto   | Server      |
| **Título personalizado por propiedad**      | "Casa Excepcional en Palermo"     | ⭐⭐⭐ Alto   | Server      |
| **Descripción personalizada por propiedad** | "Hermosa casa completamente..."   | ⭐⭐⭐ Alto   | Server      |

**✅ Estos SE CARGAN del lado del SERVIDOR** (en `generateMetadata()`)
**✅ Se actualizan sin redeploy** gracias a ISR (revalidación cada 1 hora)

---

### 🟡 **Contenido SEO Adicional (Client-Side - Opcional)**

| Elemento                 | Ejemplo                   | Impacto SEO | Carga  |
| ------------------------ | ------------------------- | ----------- | ------ |
| **Breadcrumbs visuales** | Home > Propiedades > Casa | ⭐ Bajo     | Client |
| **Contenido adicional**  | Texto descriptivo extra   | ⭐ Bajo     | Client |
| **FAQ Schema**           | Preguntas frecuentes      | ⭐⭐ Medio  | Client |

**⚠️ Estos se cargan del lado del CLIENTE** (después de la carga inicial)
**⚠️ Menos críticos para SEO principal**

---

## ❌ ¿Qué NO debe gestionarse desde el CMS?

- ❌ URLs canónicas (se generan automáticamente)
- ❌ Sitemap.xml (se genera automáticamente)
- ❌ Robots.txt (configuración técnica)
- ❌ Estructura de URLs (se genera automáticamente)
- ❌ Metadata técnica (viewport, charset, etc.)

---

## 📊 Respuesta Directa a tus Preguntas

### **1. ¿Qué items pueden ser editables desde el CMS?**

**✅ SÍ pueden ser editables:**

- Configuración global del sitio (nombre, descripción, contacto)
- Metadata por página (títulos, descripciones, imágenes OG)
- Overrides por propiedad individual
- Información para Schema.org (RealEstateAgent)
- Keywords y meta tags

---

### **2. ¿Se cargarían del lado del cliente o server?**

**🔴 Server-Side (RECOMENDADO):**

- ✅ Metadata crítica (títulos, descripciones, OG tags)
- ✅ Schema.org structured data
- ✅ Información del RealEstateAgent

**Por qué:**

- Van en el `<head>` del HTML inicial
- Son leídos por crawlers antes del JavaScript
- Afectan directamente el SEO

**Cómo:**

- Se cargan en `generateMetadata()` (server-side)
- Usando `fetch()` con ISR (Incremental Static Regeneration)
- Revalidación automática cada 1 hora

**🟡 Client-Side (OPCIONAL):**

- Breadcrumbs visuales
- Contenido SEO adicional
- FAQ Schema (si se agrega)

**Por qué:**

- No afectan el `<head>` inicial
- Son mejoras secundarias
- No bloquean la indexación

---

### **3. ¿Por deploy o generados del lado del cliente?**

**✅ Por deploy/ISR (Server-Side):**

- La metadata se genera **server-side** en tiempo de build/request
- Usa **ISR (Incremental Static Regeneration)** con revalidación
- Cambios en CMS se reflejan en **máximo 1 hora** (configurable)
- **NO requiere redeploy** completo del sitio

**Flujo:**

```
1. Usuario edita SEO en CMS
   ↓
2. CMS guarda cambios
   ↓
3. Próximo request a la página (dentro de 1 hora)
   ↓
4. Next.js detecta que cache expiró
   ↓
5. Hace fetch al CMS (server-side)
   ↓
6. Regenera HTML con nueva metadata
   ↓
7. Actualiza cache
```

**❌ NO del lado del cliente (client-side):**

- La metadata crítica **NO debe** cargarse con `useEffect` o hooks del cliente
- Los crawlers no ejecutan JavaScript
- El SEO no funcionaría correctamente

---

## 🎯 Resumen Ejecutivo

### **✅ PUEDE gestionarse desde CMS:**

- Configuración global del sitio
- Metadata por página
- Overrides por propiedad
- Schema.org data

### **✅ SE CARGA del lado del SERVIDOR:**

- En `generateMetadata()` usando `fetch()` con ISR
- Con revalidación automática (1 hora)
- Sin necesidad de redeploy completo

### **✅ SE ACTUALIZA sin redeploy:**

- Cambios en CMS se reflejan en máximo 1 hora
- Gracias a ISR (Incremental Static Regeneration)
- Next.js maneja la revalidación automáticamente

---

## 🚀 Próximos Pasos

1. **Leer especificación completa:** `SEO_CMS_SPECIFICATION.md`
2. **Implementar hooks server-side:** `lib/hooks/useCMSSEO.ts`
3. **Actualizar layouts** para cargar SEO del CMS
4. **Configurar endpoints en CMS** para SEO data
5. **Probar con datos reales**

---

**¿Quieres que implemente la integración con CMS ahora?**
