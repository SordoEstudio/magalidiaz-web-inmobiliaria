# 📋 Especificación: Gestión SEO desde CMS

## 🎯 Objetivo

Permitir gestionar elementos de SEO desde el CMS de forma que:

1. **Metadata crítica** se genere **server-side** (en tiempo de build/request)
2. **Contenido SEO adicional** pueda cargarse **client-side** sin afectar SEO
3. Los cambios se reflejen **sin necesidad de redeploy** (runtime)

---

## 📊 Elementos SEO Editables desde CMS

### 🔴 **Nivel 1: Metadata Crítica (Server-Side - REQUERIDO)**

Estos elementos **DEBEN** cargarse server-side porque:

- Van en el `<head>` del HTML inicial
- Son leídos por crawlers antes del JavaScript
- Afectan directamente el SEO

#### 1.1 **Configuración Global del Sitio**

```typescript
interface SEOGlobalConfig {
  // Información básica
  siteName: string; // "Magali Diaz Asesor Inmobiliario"
  siteDescription: string; // Descripción principal
  siteUrl: string; // URL base del sitio
  defaultLocale: string; // "es_ES"

  // Redes sociales
  twitterHandle?: string; // "@magalidiaz"
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;

  // Logo e imágenes
  logoUrl: string; // URL del logo
  defaultOgImage?: string; // Imagen por defecto para OG

  // Schema.org - RealEstateAgent
  agentName: string; // Nombre del agente
  agentEmail?: string;
  agentPhone?: string;
  agentAddress?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };

  // SEO adicional
  defaultKeywords: string[]; // Keywords globales
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  googleSiteVerification?: string;
}
```

**Carga:** Server-side en `app/layout.tsx` → `generateMetadata()`

---

#### 1.2 **Metadata por Página/Plantilla**

```typescript
interface SEOPageConfig {
  page: string; // "home" | "propiedades" | "propiedad" | "contacto"

  // Metadata básica
  title?: string; // Título personalizado (opcional)
  description?: string; // Descripción personalizada
  keywords?: string[]; // Keywords específicos de la página

  // Open Graph
  ogImage?: string; // Imagen específica para esta página
  ogType?: string; // "website" | "article"

  // Schema adicional
  schema?: object; // Schema JSON-LD adicional

  // Robots
  robotsIndex?: boolean; // Permitir indexación
  robotsFollow?: boolean;
}
```

**Carga:** Server-side en layouts específicos (ej: `app/propiedades/layout.tsx`)

---

#### 1.3 **Metadata Dinámica por Propiedad** (Ya implementado parcialmente)

```typescript
interface SEOPropertyConfig {
  propertyId: string;

  // Overrides de metadata
  customTitle?: string; // Si existe, sobreescribe el generado
  customDescription?: string; // Si existe, sobreescribe el generado
  customOgImage?: string; // Imagen específica para OG
  customKeywords?: string[]; // Keywords adicionales

  // Schema adicional
  additionalSchema?: object[];
}
```

**Carga:** Server-side en `app/propiedad/[id]/layout.tsx` → `generateMetadata()`

---

### 🟡 **Nivel 2: Contenido SEO (Client-Side - OPCIONAL)**

Estos elementos pueden cargarse client-side porque:

- No afectan el `<head>` inicial
- Son mejoras de UX/SEO secundarias
- No bloquean la indexación

#### 2.1 **Breadcrumbs Visuales**

```typescript
interface SEOBreadcrumb {
  label: string;
  url: string;
}
```

**Carga:** Client-side (ya hay schema en server-side)

---

#### 2.2 **Contenido SEO Adicional por Página**

```typescript
interface SEOContent {
  page: string;
  sections: {
    heading?: string; // H1 adicional o sección
    content?: string; // Contenido descriptivo
    faqItems?: Array<{
      // FAQ Schema
      question: string;
      answer: string;
    }>;
    structuredContent?: object; // Contenido estructurado adicional
  };
}
```

**Carga:** Client-side después de carga inicial

---

## 🏗️ Arquitectura de Implementación

### **Opción A: Server-Side con Revalidación (RECOMENDADO)**

```
┌─────────────┐
│   CMS API   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Next.js Server Components          │
│  ┌──────────────────────────────┐  │
│  │ generateMetadata()            │  │
│  │   ↓                           │  │
│  │ fetchCMS_SEO()                │  │
│  │   ↓                           │  │
│  │ generateMetadata()            │  │
│  └──────────────────────────────┘  │
│                                     │
│  Cache: ISR con revalidación       │
│  (revalidate: 3600 = 1 hora)        │
└─────────────────────────────────────┘
       │
       ▼
┌─────────────┐
│  HTML/Head  │ ← Metadata en <head>
└─────────────┘
```

**Ventajas:**

- ✅ Metadata en HTML inicial (SEO perfecto)
- ✅ Funciona sin JavaScript
- ✅ Revalidación automática (ISR)

**Desventajas:**

- ⚠️ Requiere rebuild o revalidación para cambios
- ⚠️ Cache puede retrasar cambios (max 1 hora)

---

### **Opción B: Runtime Server-Side (ALTERNATIVA)**

```
┌─────────────┐
│   CMS API   │
└──────┬──────┘
       │
       ▼ (cada request)
┌─────────────────────────────────────┐
│  Next.js Runtime (Server)           │
│  ┌──────────────────────────────┐  │
│  │ generateMetadata()            │  │
│  │   ↓                           │  │
│  │ await fetchCMS_SEO()          │  │
│  │   ↓                           │  │
│  │ generateMetadata()            │  │
│  └──────────────────────────────┘  │
│                                     │
│  Sin cache (no-store)               │
└─────────────────────────────────────┘
```

**Ventajas:**

- ✅ Cambios inmediatos (sin rebuild)
- ✅ Siempre datos actualizados

**Desventajas:**

- ⚠️ Mayor latencia en cada request
- ⚠️ Dependencia de API en cada carga

**Recomendación:** Usar **Opción A con revalidación corta** (15-30 minutos)

---

## 📝 Estructura de Datos en CMS

### **1. Componente CMS: `seo_global_config`**

```json
{
  "type": "seo_global_config",
  "key": "seo_global",
  "page": "global",
  "data": {
    "siteName": "Magali Diaz Asesor Inmobiliario",
    "siteDescription": "Encuentra tu propiedad ideal...",
    "siteUrl": "https://magalidiaz.com.ar",
    "defaultLocale": "es_ES",
    "twitterHandle": "@magalidiaz",
    "logoUrl": "/images/logo.png",
    "defaultOgImage": "/images/og-default.jpg",
    "agentName": "Magali Diaz",
    "agentEmail": "contacto@magalidiaz.com.ar",
    "agentPhone": "+54 11 1234-5678",
    "agentAddress": {
      "city": "Buenos Aires",
      "state": "CABA",
      "country": "Argentina"
    },
    "defaultKeywords": [
      "inmobiliaria",
      "propiedades",
      "casas",
      "departamentos"
    ],
    "googleAnalyticsId": "G-XXXXXXXXXX"
  }
}
```

---

### **2. Componente CMS: `seo_page_config`**

```json
{
  "type": "seo_page_config",
  "key": "seo_home",
  "page": "home",
  "data": {
    "title": "Inmobiliaria Magali Diaz - Encuentra tu Hogar Ideal",
    "description": "Propiedades en venta y alquiler en Buenos Aires...",
    "keywords": ["propiedades", "casas venta", "departamentos alquiler"],
    "ogImage": "/images/og-home.jpg",
    "robotsIndex": true,
    "robotsFollow": true
  }
}
```

**Para cada página:**

- `seo_home`
- `seo_propiedades`
- `seo_contacto`
- etc.

---

### **3. Componente CMS: `seo_property_overrides`**

```json
{
  "type": "seo_property_overrides",
  "key": "seo_property_123456",
  "page": "propiedad",
  "data": {
    "propertyId": "123456",
    "customTitle": "Casa 3 Dormitorios en Palermo - Excepcional Oportunidad",
    "customDescription": "Hermosa casa completamente renovada...",
    "customOgImage": "/images/properties/123456-og.jpg",
    "customKeywords": ["palermo", "casa", "renovada", "jardin"]
  }
}
```

---

## 🔧 Implementación Técnica

### **Paso 1: Crear Hook para SEO del CMS (Server-Side)**

```typescript
// lib/hooks/useCMSSEO.ts (Server Component)
export async function getCMSSEOConfig() {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CMS_COMPONENTS}?type=seo_global_config&clientSlug=${API_CONFIG.CLIENT_SLUG}`,
      {
        next: { revalidate: 3600 }, // Revalidar cada hora
      }
    );

    const data = await response.json();
    const component = data.data?.find(
      (c: any) => c.type === "seo_global_config"
    );

    return component?.data || null;
  } catch (error) {
    console.error("Error loading SEO config from CMS:", error);
    return null;
  }
}

export async function getCMSSEOPageConfig(page: string) {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CMS_COMPONENTS}?type=seo_page_config&page=${page}&clientSlug=${API_CONFIG.CLIENT_SLUG}`,
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await response.json();
    const component = data.data?.find(
      (c: any) => c.type === "seo_page_config" && c.page === page
    );

    return component?.data || null;
  } catch (error) {
    return null;
  }
}

export async function getCMSSEOPropertyOverride(propertyId: string) {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CMS_COMPONENTS}?type=seo_property_overrides&page=propiedad&clientSlug=${API_CONFIG.CLIENT_SLUG}`,
      {
        next: { revalidate: 1800 }, // 30 minutos para propiedades
      }
    );

    const data = await response.json();
    const component = data.data?.find(
      (c: any) =>
        c.type === "seo_property_overrides" && c.data?.propertyId === propertyId
    );

    return component?.data || null;
  } catch (error) {
    return null;
  }
}
```

---

### **Paso 2: Actualizar `lib/seo/metadata.ts`**

```typescript
// Agregar funciones que integren con CMS
export async function generateMetadataWithCMS(
  page: string,
  fallbackMetadata: Metadata,
  cmsOverride?: any
): Promise<Metadata> {
  // Si hay override del CMS, usar esos datos
  if (cmsOverride?.title) {
    return {
      ...fallbackMetadata,
      title: cmsOverride.title,
      description: cmsOverride.description || fallbackMetadata.description,
      openGraph: {
        ...fallbackMetadata.openGraph,
        title: cmsOverride.title,
        description:
          cmsOverride.description || fallbackMetadata.openGraph?.description,
        images: cmsOverride.ogImage
          ? [{ url: cmsOverride.ogImage }]
          : fallbackMetadata.openGraph?.images,
      },
    };
  }

  return fallbackMetadata;
}
```

---

### **Paso 3: Actualizar `app/layout.tsx`**

```typescript
import { getCMSSEOConfig } from "@/lib/hooks/useCMSSEO";

export async function generateMetadata(): Promise<Metadata> {
  // Cargar configuración SEO del CMS
  const cmsSEO = await getCMSSEOConfig();

  // Si hay configuración del CMS, usarla; si no, usar defaults
  const siteName = cmsSEO?.siteName || SITE_CONFIG.name;
  const siteDescription = cmsSEO?.siteDescription || SITE_CONFIG.description;

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    // ... resto de metadata usando cmsSEO
  };
}
```

---

### **Paso 4: Actualizar Schema.org con datos del CMS**

```typescript
// lib/seo/schema.ts
export async function generateRealEstateAgentSchemaWithCMS() {
  const cmsSEO = await getCMSSEOConfig();

  if (!cmsSEO) {
    return generateRealEstateAgentSchema(); // Fallback
  }

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: cmsSEO.agentName || cmsSEO.siteName,
    email: cmsSEO.agentEmail,
    telephone: cmsSEO.agentPhone,
    url: cmsSEO.siteUrl,
    address: cmsSEO.agentAddress
      ? {
          "@type": "PostalAddress",
          addressLocality: cmsSEO.agentAddress.city,
          addressRegion: cmsSEO.agentAddress.state,
          addressCountry: cmsSEO.agentAddress.country,
        }
      : undefined,
  };
}
```

---

## 🚀 Flujo de Carga

### **Caso 1: Metadata Global (Layout Principal)**

```
1. Request a página
   ↓
2. Next.js ejecuta generateMetadata() en layout.tsx
   ↓
3. Llama a getCMSSEOConfig() (fetch con cache)
   ↓
4. Si CMS tiene datos → usa CMS
   Si no → usa SITE_CONFIG (fallback)
   ↓
5. Genera metadata
   ↓
6. Inyecta en <head>
```

**Cache:** ISR con revalidación (1 hora)

---

### **Caso 2: Metadata por Página**

```
1. Request a /propiedades
   ↓
2. Next.js ejecuta generateMetadata() en app/propiedades/layout.tsx
   ↓
3. Llama a getCMSSEOPageConfig('propiedades')
   ↓
4. Combina con metadata generada automáticamente
   ↓
5. Si CMS tiene override → prioriza CMS
   ↓
6. Genera metadata final
```

**Cache:** ISR con revalidación (1 hora)

---

### **Caso 3: Metadata por Propiedad**

```
1. Request a /propiedad/123
   ↓
2. Next.js ejecuta generateMetadata() en app/propiedad/[id]/layout.tsx
   ↓
3. Llama a getPropertyById('123')
   ↓
4. Llama a getCMSSEOPropertyOverride('123')
   ↓
5. Si CMS tiene override → lo aplica
   Si no → usa metadata generada de propiedad
   ↓
6. Genera metadata final
```

**Cache:** ISR con revalidación (30 minutos)

---

## ✅ Checklist de Implementación

### **Backend/CMS**

- [ ] Crear endpoint para `seo_global_config`
- [ ] Crear endpoint para `seo_page_config` por página
- [ ] Crear endpoint para `seo_property_overrides` por propiedad
- [ ] Validar estructura de datos
- [ ] Permitir edición en admin panel

### **Frontend**

- [ ] Crear `lib/hooks/useCMSSEO.ts` (server-side)
- [ ] Actualizar `lib/seo/metadata.ts` con integración CMS
- [ ] Actualizar `app/layout.tsx` para cargar SEO del CMS
- [ ] Actualizar `app/propiedades/layout.tsx`
- [ ] Actualizar `app/propiedad/[id]/layout.tsx`
- [ ] Actualizar `lib/seo/schema.ts` para usar CMS
- [ ] Probar con datos reales del CMS

### **Testing**

- [ ] Validar metadata en HTML inicial
- [ ] Verificar que crawlers ven metadata correcta
- [ ] Probar fallback si CMS no responde
- [ ] Validar cache y revalidación
- [ ] Probar cambios en CMS y revalidación

---

## 📊 Comparación: Server-Side vs Client-Side

| Aspecto                      | Server-Side       | Client-Side       |
| ---------------------------- | ----------------- | ----------------- |
| **Metadata en HTML inicial** | ✅ Sí             | ❌ No             |
| **Visible para crawlers**    | ✅ Sí             | ❌ No             |
| **SEO efectivo**             | ✅ Sí             | ❌ No             |
| **Cambios sin redeploy**     | ✅ Sí (con ISR)   | ✅ Sí             |
| **Velocidad de carga**       | ✅ Rápido (cache) | ⚠️ Depende de API |
| **Fallback robusto**         | ✅ Fácil          | ⚠️ Complejo       |

**Conclusión:** Metadata crítica **DEBE** ser server-side

---

## 🎯 Recomendación Final

### **Implementar:**

1. ✅ **Metadata global** → Server-side con ISR (1 hora)
2. ✅ **Metadata por página** → Server-side con ISR (1 hora)
3. ✅ **Metadata por propiedad** → Server-side con ISR (30 min)
4. ✅ **Schema.org** → Server-side usando datos del CMS
5. ⚠️ **Breadcrumbs visuales** → Client-side (opcional)
6. ⚠️ **Contenido SEO adicional** → Client-side (opcional)

### **NO implementar en CMS:**

- ❌ Títulos generados automáticamente (mejor generados)
- ❌ URLs canónicas (se generan automáticamente)
- ❌ Sitemap (se genera automáticamente)
- ❌ Robots.txt (configuración técnica)

---

## 📝 Resumen

**Elementos editables desde CMS:**

- ✅ Configuración global del sitio (nombre, descripción, contacto)
- ✅ Metadata por página (títulos, descripciones, OG images)
- ✅ Overrides por propiedad (títulos personalizados, descripciones)
- ✅ Schema.org data (RealEstateAgent info)
- ✅ Keywords y meta tags adicionales

**Cómo se carga:**

- 🔴 **Server-side** para metadata crítica (generateMetadata)
- 🟡 **Client-side** para contenido SEO adicional (opcional)

**Cuándo se actualiza:**

- ✅ **Sin redeploy** gracias a ISR (Incremental Static Regeneration)
- ✅ Revalidación automática cada 1 hora (configurable)
- ✅ Cambios reflejados en máximo 1 hora

---

**¿Listo para implementar?**
