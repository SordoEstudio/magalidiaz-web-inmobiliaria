# 📝 Guía: Configuración SEO desde JSON

## 📍 Ubicación del Archivo

**Archivo:** `/lib/config/seoConfig.json`

Este archivo contiene toda la configuración crítica de SEO que puede ser editada fácilmente antes de hacer deploy.

---

## 🔧 Cómo Editar

1. Abre el archivo `lib/config/seoConfig.json`
2. Edita los valores que necesites cambiar
3. Guarda el archivo
4. Haz commit y push
5. El deploy actualizará la metadata del sitio

---

## 📋 Estructura del JSON

### **1. `global` - Configuración Global del Sitio**

```json
{
  "global": {
    "siteName": "Nombre del sitio",
    "siteDescription": "Descripción principal",
    "siteUrl": "https://tu-dominio.com",
    "defaultLocale": "es_ES",
    "twitterHandle": "@tu-handle",
    "logoUrl": "/ruta/al/logo.svg",
    "defaultOgImage": "/ruta/imagen-og.jpg",
    "defaultKeywords": ["keyword1", "keyword2"]
  }
}
```

**Campos disponibles:**

| Campo                    | Tipo   | Descripción                              | Requerido   |
| ------------------------ | ------ | ---------------------------------------- | ----------- |
| `siteName`               | string | Nombre del sitio (aparece en títulos)    | ✅          |
| `siteDescription`        | string | Descripción principal (meta description) | ✅          |
| `siteUrl`                | string | URL base del sitio                       | ✅          |
| `defaultLocale`          | string | Idioma (ej: "es_ES")                     | ✅          |
| `twitterHandle`          | string | Handle de Twitter (ej: "@magalidiaz")    | ⚠️ Opcional |
| `facebookUrl`            | string | URL de Facebook                          | ⚠️ Opcional |
| `instagramUrl`           | string | URL de Instagram                         | ⚠️ Opcional |
| `linkedinUrl`            | string | URL de LinkedIn                          | ⚠️ Opcional |
| `logoUrl`                | string | Ruta al logo (desde /public)             | ⚠️ Opcional |
| `defaultOgImage`         | string | Imagen por defecto para Open Graph       | ⚠️ Opcional |
| `googleAnalyticsId`      | string | ID de Google Analytics                   | ⚠️ Opcional |
| `googleTagManagerId`     | string | ID de Google Tag Manager                 | ⚠️ Opcional |
| `googleSiteVerification` | string | Código de verificación de Google         | ⚠️ Opcional |
| `defaultKeywords`        | array  | Keywords globales del sitio              | ⚠️ Opcional |

---

### **2. `agent` - Información del Agente Inmobiliario**

```json
{
  "agent": {
    "agentName": "Nombre del Agente",
    "agentEmail": "email@ejemplo.com",
    "agentPhone": "+54 11 1234-5678",
    "agentAddress": {
      "street": "Calle Falsa 123",
      "city": "Buenos Aires",
      "state": "CABA",
      "country": "Argentina",
      "postalCode": "C1234ABC"
    }
  }
}
```

**Campos disponibles:**

| Campo                     | Tipo   | Descripción          | Requerido   |
| ------------------------- | ------ | -------------------- | ----------- |
| `agentName`               | string | Nombre del agente    | ✅          |
| `agentEmail`              | string | Email de contacto    | ⚠️ Opcional |
| `agentPhone`              | string | Teléfono de contacto | ⚠️ Opcional |
| `agentAddress`            | object | Dirección completa   | ⚠️ Opcional |
| `agentAddress.street`     | string | Calle y número       | ⚠️ Opcional |
| `agentAddress.city`       | string | Ciudad               | ⚠️ Opcional |
| `agentAddress.state`      | string | Provincia/Estado     | ⚠️ Opcional |
| `agentAddress.country`    | string | País                 | ⚠️ Opcional |
| `agentAddress.postalCode` | string | Código postal        | ⚠️ Opcional |

**Uso:** Esta información se usa para generar el Schema.org `RealEstateAgent`.

---

### **3. `pages` - Configuración por Página**

```json
{
  "pages": {
    "home": {
      "title": "Título específico para home",
      "description": "Descripción específica para home",
      "keywords": ["keyword1", "keyword2"],
      "ogImage": "/ruta/imagen-og-home.jpg",
      "ogType": "website"
    },
    "propiedades": {
      "title": "Título para página de propiedades",
      "description": "Descripción para propiedades",
      "keywords": ["propiedades", "casas"],
      "ogImage": "/ruta/imagen-og-propiedades.jpg",
      "ogType": "website"
    }
  }
}
```

**Páginas disponibles:**

- `home` - Página principal
- `propiedades` - Página de listado de propiedades

**Campos por página:**

| Campo         | Tipo   | Descripción                     | Requerido   |
| ------------- | ------ | ------------------------------- | ----------- |
| `title`       | string | Título específico de la página  | ⚠️ Opcional |
| `description` | string | Descripción específica          | ⚠️ Opcional |
| `keywords`    | array  | Keywords específicos            | ⚠️ Opcional |
| `ogImage`     | string | Imagen Open Graph específica    | ⚠️ Opcional |
| `ogType`      | string | Tipo OG ("website" o "article") | ⚠️ Opcional |

**Nota:** Si no se especifica un campo, se usa la configuración global por defecto.

---

## 🎯 Ejemplos de Uso

### **Ejemplo 1: Cambiar nombre del sitio**

```json
{
  "global": {
    "siteName": "Nuevo Nombre de la Inmobiliaria"
  }
}
```

**Resultado:** Todos los títulos cambiarán a "Nuevo Nombre de la Inmobiliaria"

---

### **Ejemplo 2: Actualizar información de contacto**

```json
{
  "agent": {
    "agentEmail": "nuevo-email@ejemplo.com",
    "agentPhone": "+54 11 9876-5432"
  }
}
```

**Resultado:** El Schema.org se actualizará con el nuevo contacto

---

### **Ejemplo 3: Personalizar metadata de una página**

```json
{
  "pages": {
    "home": {
      "title": "Inmobiliaria Premium - Encuentra tu Hogar Ideal",
      "description": "Las mejores propiedades en Buenos Aires. Casas, departamentos y terrenos.",
      "keywords": ["inmobiliaria", "buenos aires", "propiedades premium"]
    }
  }
}
```

**Resultado:** La página home tendrá estos títulos y descripciones personalizados

---

## ⚠️ Reglas y Buenas Prácticas

### **1. URLs de Imágenes**

- ✅ **Correcto:** `/images/og-home.jpg` (ruta relativa desde `/public`)
- ❌ **Incorrecto:** `https://ejemplo.com/imagen.jpg` (URL absoluta, aunque funciona)

### **2. Longitud de Descripciones**

- ✅ **Recomendado:** 150-160 caracteres para `description`
- ⚠️ Si es más larga, se truncará automáticamente

### **3. Keywords**

- ✅ **Recomendado:** 5-10 keywords relevantes
- ❌ **Evitar:** Keyword stuffing (demasiadas keywords)

### **4. Formato JSON**

- ✅ **Correcto:** Comillas dobles, comas correctas
- ❌ **Incorrecto:** Comillas simples, comas faltantes
- 💡 Usa un editor con validación JSON (VS Code lo hace automáticamente)

---

## 🔍 Validación

Después de editar el JSON:

1. **Valida la sintaxis:**

   - VS Code valida automáticamente
   - O usa: https://jsonlint.com/

2. **Verifica que compile:**

   ```bash
   npm run build
   ```

3. **Prueba localmente:**
   ```bash
   npm run dev
   ```
   - Visita la página
   - Inspecciona el `<head>` para ver la metadata

---

## 📊 Dónde se Usa Cada Campo

### **Metadata Global (`global`)**

- ✅ `<title>` de todas las páginas
- ✅ Meta description global
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Schema.org global

### **Información del Agente (`agent`)**

- ✅ Schema.org `RealEstateAgent`
- ✅ Información de contacto estructurada

### **Configuración por Página (`pages`)**

- ✅ Override de título específico
- ✅ Override de descripción específica
- ✅ Keywords específicos
- ✅ Imágenes OG específicas

---

## 🚀 Flujo de Cambios

```
1. Desarrollador edita seoConfig.json
   ↓
2. Guarda cambios
   ↓
3. Hace commit: git commit -m "Update SEO config"
   ↓
4. Hace push: git push
   ↓
5. Deploy automático (Vercel/GitHub Actions)
   ↓
6. Next.js recompila con nueva metadata
   ↓
7. Cambios reflejados en producción
```

---

## ❓ Preguntas Frecuentes

### **¿Puedo dejar campos vacíos?**

Sí, todos los campos opcionales pueden dejarse como `""` (string vacío) o simplemente omitirse.

### **¿Qué pasa si hay un error en el JSON?**

Next.js no compilará y mostrará un error. Revisa la consola del build.

### **¿Cuánto tarda en reflejarse el cambio?**

Una vez que se hace deploy, los cambios son inmediatos (no hay cache de metadata).

### **¿Puedo usar variables de entorno en el JSON?**

No directamente en el JSON, pero `siteUrl` usa `process.env.NEXT_PUBLIC_SITE_URL` como fallback.

### **¿Qué pasa si no especifico una página en `pages`?**

Se usará la configuración global como fallback.

---

## 📝 Checklist de Edición

Antes de hacer commit:

- [ ] Validé la sintaxis JSON
- [ ] Probé localmente (`npm run dev`)
- [ ] Verifiqué que la metadata aparezca correctamente en el `<head>`
- [ ] Revisé que las URLs de imágenes sean correctas
- [ ] Confirmé que las descripciones tengan 150-160 caracteres
- [ ] Verifiqué que los campos requeridos estén completos

---

**Última actualización:** [Fecha]
**Versión:** 1.0
