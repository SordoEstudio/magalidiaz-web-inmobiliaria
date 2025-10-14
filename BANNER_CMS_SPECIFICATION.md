# 🎨 Especificación de Componentes Banner CMS

## 🎯 **Estructura de Datos CMS**

### **Tipos de Componentes**:

- `banner_card_component` - Banner en formato card
- `banner_hero_component` - Banner hero de pantalla completa

## 📋 **Banner Card Component**

### **Estructura de Datos**:

```json
{
  "txt_titulo": "Encuentra tu hogar ideal",
  "txt_subtitulo": "Propiedades destacadas",
  "txt_descripcion": "Descubre las mejores propiedades en venta y alquiler con la asesoría profesional que necesitas para tomar la decisión correcta.",
  "img_principal": "/placeholder-banner.jpg",
  "lista_beneficios": [
    "Asesoramiento personalizado",
    "Propiedades verificadas",
    "Financiamiento disponible",
    "Proceso transparente"
  ],
  "btn_principal": {
    "txt_label": "Ver propiedades",
    "link_url": "/propiedades",
    "icon_btn": "FaSearch"
  },
  "configuracion": {
    "variant": "primary",
    "imagePosition": "left",
    "size": "medium"
  }
}
```

### **Campos del Banner Card**

| Campo              | Tipo   | Descripción                 | Ejemplo                     |
| ------------------ | ------ | --------------------------- | --------------------------- |
| `txt_titulo`       | string | Título principal del banner | "Encuentra tu hogar ideal"  |
| `txt_subtitulo`    | string | Subtítulo descriptivo       | "Propiedades destacadas"    |
| `txt_descripcion`  | string | Descripción del banner      | "Descubre las mejores..."   |
| `img_principal`    | string | URL de la imagen principal  | "/placeholder-banner.jpg"   |
| `lista_beneficios` | array  | Lista de beneficios         | ["Asesoramiento...", "..."] |
| `btn_principal`    | object | Botón principal             | Ver estructura abajo        |
| `configuracion`    | object | Configuración del banner    | Ver estructura abajo        |

### **Estructura de `btn_principal`**

```typescript
interface BannerButton {
  txt_label: string; // Texto del botón
  link_url: string; // URL de destino
  icon_btn: string; // Icono (React Icons)
}
```

### **Estructura de `configuracion`**

```typescript
interface BannerConfig {
  variant: "primary" | "secondary" | "accent"; // Variante de color
  imagePosition: "left" | "right"; // Posición de la imagen
  size: "small" | "medium" | "large"; // Tamaño del banner
}
```

## 🎯 **Banner Hero Component**

### **Estructura de Datos**:

```json
{
  "txt_titulo": "Tu hogar perfecto te está esperando",
  "txt_subtitulo": "Inmobiliaria profesional",
  "txt_descripcion": "Con más de 10 años de experiencia en el mercado inmobiliario, te ayudamos a encontrar la propiedad ideal para ti y tu familia.",
  "img_fondo": "/placeholder-hero.jpg",
  "lista_beneficios": [
    "Asesoramiento profesional",
    "Propiedades exclusivas",
    "Financiamiento personalizado",
    "Acompañamiento completo"
  ],
  "btn_principal": {
    "txt_label": "Comenzar búsqueda",
    "link_url": "/propiedades",
    "icon_btn": "FaSearch"
  },
  "configuracion": {
    "variant": "primary",
    "overlay": "dark",
    "alignment": "center"
  }
}
```

### **Campos del Banner Hero**

| Campo              | Tipo   | Descripción                 | Ejemplo                     |
| ------------------ | ------ | --------------------------- | --------------------------- |
| `txt_titulo`       | string | Título principal del banner | "Tu hogar perfecto..."      |
| `txt_subtitulo`    | string | Subtítulo descriptivo       | "Inmobiliaria profesional"  |
| `txt_descripcion`  | string | Descripción del banner      | "Con más de 10 años..."     |
| `img_fondo`        | string | URL de la imagen de fondo   | "/placeholder-hero.jpg"     |
| `lista_beneficios` | array  | Lista de beneficios         | ["Asesoramiento...", "..."] |
| `btn_principal`    | object | Botón principal             | Ver estructura abajo        |
| `configuracion`    | object | Configuración del banner    | Ver estructura abajo        |

### **Estructura de `configuracion` para Hero**

```typescript
interface HeroConfig {
  variant: "primary" | "secondary" | "accent"; // Variante de color
  overlay: "dark" | "light" | "gradient"; // Tipo de overlay
  alignment: "left" | "center" | "right"; // Alineación del contenido
}
```

## 🚀 **Uso de los Componentes**

### **Banner Card**

```tsx
import { BannerCard } from "@/components/banner-card";

export function MyPage() {
  return <BannerCard />;
}
```

### **Banner Hero**

```tsx
import { BannerHero } from "@/components/banner-hero";

export function MyPage() {
  return <BannerHero />;
}
```

## 🔄 **Flujo de Datos**

1. **Hook `useCMSData`** obtiene datos del CMS
2. **Fallback automático** si no hay datos del CMS
3. **Renderizado dinámico** con datos disponibles
4. **Indicador visual** si viene del CMS

### **Ejemplo de Implementación**

```tsx
const {
  data: bannerData,
  loading,
  error,
  isFromCMS,
} = useCMSData("banner_card_component", bannerCardDataFallback);

// Usar datos del CMS o props
const safeBannerData = bannerData || bannerCardDataFallback;
const finalTitle = title || safeBannerData.txt_titulo;
const finalImage = image || safeBannerData.img_principal;
```

## 🎨 **Convenciones de Nomenclatura**

### **Prefijos de Campos**

- `txt_` - Campos de texto
- `img_` - Imágenes
- `lista_` - Arrays de elementos
- `btn_` - Objetos de botones
- `configuracion` - Configuración del componente

### **Ejemplos de Nomenclatura**

```json
{
  "txt_titulo": "Título principal",
  "txt_subtitulo": "Subtítulo",
  "img_principal": "Imagen principal",
  "lista_beneficios": "Array de beneficios",
  "btn_principal": "Botón principal",
  "configuracion": "Configuración del banner"
}
```

## ✅ **Características Implementadas**

- ✅ **Datos dinámicos** desde CMS
- ✅ **Fallback automático** con datos estáticos
- ✅ **Estructura estándar** según especificaciones CMS
- ✅ **Indicador visual** de origen de datos
- ✅ **Configuración flexible** (variantes, posiciones, etc.)
- ✅ **Botones de acción** personalizables
- ✅ **Imágenes dinámicas** configurables
- ✅ **Responsive design** con Tailwind CSS

## 🎯 **Ventajas del Flujo Simplificado**

1. **Sin mappers complejos** - Datos directos del CMS
2. **Fallbacks garantizados** - Siempre funciona
3. **Fácil mantenimiento** - Código simple y claro
4. **Escalabilidad** - Fácil agregar nuevos campos
5. **Tipado opcional** - TypeScript cuando se necesite

## 📝 **Próximos Pasos**

1. **Agregar más variantes** de banner
2. **Implementar animaciones** personalizables
3. **Agregar soporte para video** de fondo
4. **Sistema de templates** para banners
5. **Integración con analytics** para tracking

## 🔧 **Ejemplo de Uso Completo**

```tsx
"use client";

import { BannerCard } from "@/components/banner-card";
import { BannerHero } from "@/components/banner-hero";

export function MyPage() {
  return (
    <div>
      <BannerHero />
      <BannerCard />
    </div>
  );
}
```

---

¡Los componentes Banner están listos para usar con el flujo CMS simplificado! 🚀
