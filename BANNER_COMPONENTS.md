# 🎨 Componentes de Banner - Guía de Uso

## 📋 Resumen

He creado **3 versiones** de componentes de banner siguiendo los lineamientos gráficos del sitio y la paleta de colores lila. Todos los campos son **opcionales** y altamente **personalizables**.

1. **`BannerHero`** - Estilo hero con imagen de fondo completa
2. **`BannerCard`** - Estilo tarjeta con imagen lateral
3. **`BannerMinimal`** - Estilo minimalista con imagen pequeña

**NUEVO:** Incluye **datos JSON mock** y componentes de ejemplo para uso inmediato.

---

## 🚀 Cómo Usar

### 1. Importar el componente deseado

```tsx
import { BannerHero } from "@/components/banner-hero";
import { BannerCard } from "@/components/banner-card";
import { BannerMinimal } from "@/components/banner-minimal";

// O usar los componentes con datos JSON
import {
  HeroBanners,
  CardBanners,
  MinimalBanners,
  SpecificBanner,
} from "@/components/banner-example";
```

### 2. Uso con datos JSON (RECOMENDADO)

```tsx
// Mostrar todos los hero banners
<HeroBanners />

// Mostrar todos los card banners
<CardBanners />

// Mostrar un banner específico
<SpecificBanner bannerType="herobanners" bannerId="hero-main" />
```

### 3. Uso manual (personalizado)

```tsx
<BannerHero
  image="/hero-image.jpg"
  title="Tu Hogar Ideal te Espera"
  subtitle="Inmobiliaria Premium"
  text="Encontrá la propiedad perfecta con nuestro equipo de expertos"
  bulletPoints={[
    "Asesoramiento personalizado",
    "Propiedades verificadas",
    "Financiamiento disponible",
  ]}
  cta={{
    text: "Ver propiedades",
    action: "/propiedades",
    type: "link",
  }}
/>
```

---

## 📊 Datos JSON Mock

He creado `public/data/banners.json` con **datos mock organizados** por categorías:

### **Categorías Disponibles:**

#### 🏠 **Hero Banners** (`herobanners`)

- `hero-main` - Banner principal de la homepage
- `hero-investment` - Enfocado en inversiones
- `hero-contact` - Call-to-action de contacto

#### 🃏 **Card Banners** (`cardbanners`)

- `card-valuation` - Tasación gratuita
- `card-services` - Administración de alquileres
- `card-financing` - Financiamiento disponible

#### 🎯 **Minimal Banners** (`minimalbanners`)

- `minimal-news` - Nuevas propiedades
- `minimal-alert` - Ofertas especiales
- `minimal-contact` - Consultá con experto
- `minimal-newsletter` - Suscripción newsletter

#### 🌟 **Seasonal Banners** (`seasonalbanners`)

- `seasonal-summer` - Promoción de verano
- `seasonal-newyear` - Promoción año nuevo

#### 📢 **CTA Banners** (`ctabanners`)

- `cta-sell` - ¿Querés vender?
- `cta-rent` - ¿Buscás alquilar?

---

## 🎨 Características de Cada Versión

### ⭐ **BannerHero** - Estilo Hero

**Ideal para:** Headers principales, landing pages, secciones destacadas

**Características:**

- 🖼️ **Imagen de fondo** completa con overlay
- 🎭 **3 tipos de overlay**: dark, light, gradient
- 📐 **3 alineaciones**: left, center, right
- 🎨 **3 variantes**: primary, secondary, accent
- 📱 **Altura mínima**: 60vh
- ✨ **Efectos**: Drop shadow en textos

**Props específicas:**

```tsx
interface BannerHeroProps {
  overlay?: "dark" | "light" | "gradient";
  alignment?: "left" | "center" | "right";
  variant?: "primary" | "secondary" | "accent";
}
```

### 🃏 **BannerCard** - Estilo Tarjeta

**Ideal para:** Secciones informativas, promociones, testimonios

**Características:**

- 🖼️ **Imagen lateral** (izquierda o derecha)
- 📏 **3 tamaños**: small, medium, large
- 🎨 **Gradientes sutiles** de fondo
- 💳 **Diseño de tarjeta** con sombras
- 📱 **Layout responsive** automático

**Props específicas:**

```tsx
interface BannerCardProps {
  imagePosition?: "left" | "right";
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "accent";
}
```

### 🎯 **BannerMinimal** - Estilo Minimalista

**Ideal para:** Notificaciones, anuncios, CTAs secundarios

**Características:**

- 🖼️ **Imagen pequeña** circular (24px)
- 📐 **2 layouts**: horizontal, vertical
- 🎨 **3 fondos**: transparent, muted, card
- 🔘 **Botón outline** sutil
- 📱 **Muy compacto** y eficiente

**Props específicas:**

```tsx
interface BannerMinimalProps {
  layout?: "horizontal" | "vertical";
  backgroundColor?: "transparent" | "muted" | "card";
  variant?: "primary" | "secondary" | "accent";
}
```

---

## 🔧 Props Comunes (Todos Opcionales)

```tsx
interface CommonBannerProps {
  image?: string; // URL de la imagen
  title?: string; // Título principal
  subtitle?: string; // Subtítulo/etiqueta
  bulletPoints?: string[]; // Lista de puntos
  text?: string; // Texto descriptivo
  cta?: {
    // Call to Action
    text: string; // Texto del botón
    action: string; // URL o acción
    type: "link" | "phone" | "external"; // Tipo de acción
  };
}
```

---

## 📱 Responsive Design

Todas las versiones incluyen:

- **Mobile**: Layout vertical, imagen adaptada
- **Tablet**: Layout intermedio, tamaños ajustados
- **Desktop**: Layout completo, todos los efectos

---

## 🎨 Variantes de Color

### **Primary** (Lila - Default)

- Gradientes y acentos en lila (`#860dff`)
- Ideal para CTAs principales

### **Secondary** (Lila suave)

- Tonos más suaves del lila
- Ideal para secciones informativas

### **Accent** (Lila muy claro)

- Tonos muy sutiles
- Ideal para elementos de apoyo

---

## 📚 Ejemplos de Uso con JSON

### **Mostrar Banner Específico**

```tsx
import { SpecificBanner } from "@/components/banner-example";

// Banner principal de hero
<SpecificBanner bannerType="herobanners" bannerId="hero-main" />

// Banner de tasación
<SpecificBanner bannerType="cardbanners" bannerId="card-valuation" />

// Banner de noticias
<SpecificBanner bannerType="minimalbanners" bannerId="minimal-news" />
```

### **Mostrar Todos los Banners de una Categoría**

```tsx
import { HeroBanners, CardBanners, MinimalBanners } from "@/components/banner-example";

// Todos los hero banners
<HeroBanners />

// Todos los card banners
<CardBanners />

// Todos los minimal banners
<MinimalBanners />
```

### **Uso Manual Personalizado**

```tsx
<BannerHero
  image="/modern-apartment.jpg"
  title="Encontrá tu Hogar Ideal"
  subtitle="Inmobiliaria Premium"
  text="Miles de propiedades verificadas te esperan"
  overlay="gradient"
  alignment="center"
  bulletPoints={[
    "Asesoramiento gratuito",
    "Propiedades verificadas",
    "Financiamiento disponible",
  ]}
  cta={{
    text: "Explorar propiedades",
    action: "/propiedades",
    type: "link",
  }}
/>
```

---

## 🎯 Recomendaciones de Uso

### **Usar Hero Banners para:**

- 🏠 Headers de páginas principales
- 🌟 Secciones hero destacadas
- 📢 Anuncios importantes
- 🎯 Landing pages

### **Usar Card Banners para:**

- 📋 Secciones informativas
- 🎁 Promociones y ofertas
- 💬 Testimonios con imagen
- 📈 Beneficios y features

### **Usar Minimal Banners para:**

- 📢 Notificaciones sutiles
- 🔔 Alertas informativas
- 📎 CTAs secundarios
- 📰 Anuncios pequeños

---

## 🚀 Próximos Pasos

1. **Elige la versión** que mejor se adapte a tu necesidad
2. **Usa los datos JSON** para implementación rápida
3. **Personaliza** según tus contenidos específicos
4. **Ajusta** la variante de color
5. **Configura** el CTA según tu objetivo
6. **Testea** en diferentes dispositivos

---

## 💡 Tips de Personalización

- **Usa los datos JSON** como punto de partida
- **Modifica los datos** en `banners.json` según tus necesidades
- **Combina diferentes versiones** en la misma página
- **Experimenta con las variantes** para crear jerarquía visual
- **Personaliza los CTAs** según tu estrategia de conversión
- **Crea nuevas categorías** agregándolas al JSON

---

## 🔄 Estructura del JSON

```json
{
  "herobanners": [...],
  "cardbanners": [...],
  "minimalbanners": [...],
  "seasonalbanners": [...],
  "ctabanners": [...]
}
```

Cada banner incluye:

- `id` - Identificador único
- `type` - Tipo de componente
- Todas las props opcionales del banner
- Props específicas según el tipo

¿Te gustan estas versiones con datos JSON? ¿Quieres que ajuste algo específico o agregue más categorías?
