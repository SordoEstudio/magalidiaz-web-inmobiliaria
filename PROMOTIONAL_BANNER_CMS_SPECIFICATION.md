# 🎯 Promotional Banner CMS Specification

## 📋 **Componente Adaptado a CMS**

El componente `PromotionalBanner` ha sido adaptado para recibir datos del CMS con fallback automático.

## 🔧 **Estructura de Datos CMS**

### **JSON de Fallback**

```json
{
  "txt_titulo": "¡Tasación sin cargo hasta fin de mes!",
  "txt_subtitulo": "Conocé el valor real de tu propiedad con nuestros expertos",
  "txt_mensaje": "Obtén una tasación profesional gratuita y descubre el valor real de tu propiedad",
  "btn_principal": {
    "txt_label": "Más información",
    "link_url": "https://wa.me/5493492693712?text=Hola! Quiero información sobre la tasación gratuita",
    "icon_btn": "FaWhatsapp"
  },
  "configuracion": {
    "variant": "primary",
    "position": "top",
    "dismissible": true,
    "autoHide": false,
    "showOnMobile": true,
    "showOnDesktop": true
  },
  "estilo": {
    "background": "gradient",
    "border": "primary",
    "shadow": "medium"
  }
}
```

## 🎯 **Props del Componente**

```tsx
interface PromotionalBannerProps {
  data?: any; // Datos del CMS
  fallback?: any; // Datos de fallback personalizados
  loading?: boolean; // Estado de carga
  error?: string | null; // Error del CMS
}
```

## 🔄 **Flujo de Datos**

### **1. Datos del CMS**

```tsx
// Hook centralizado
const { promotionalBannerData, hasPromotionalBannerData } = usePageCMS();

// Renderizado condicional
{
  hasPromotionalBannerData && (
    <PromotionalBanner
      data={promotionalBannerData}
      loading={cmsLoading}
      error={cmsError}
    />
  );
}
```

### **2. Fallback Automático**

```tsx
// El componente maneja automáticamente el fallback
const bannerData =
  data?.data || data || fallback || promotionalBannerDataFallback;
const safeBannerData = bannerData || promotionalBannerDataFallback;
```

## 🎨 **Características del Componente**

### **Datos Dinámicos**

- ✅ **Título** - `txt_titulo`
- ✅ **Subtítulo** - `txt_subtitulo`
- ✅ **Botón CTA** - `btn_principal.txt_label`
- ✅ **Enlace** - `btn_principal.link_url`
- ✅ **Icono** - `btn_principal.icon_btn`

### **Funcionalidades**

- ✅ **Dismissible** - Se puede cerrar
- ✅ **Responsive** - Se adapta a móvil y desktop
- ✅ **CTA Inteligente** - Detecta WhatsApp vs enlaces normales
- ✅ **Iconos Dinámicos** - Soporte para diferentes iconos

### **Estilos**

- ✅ **Posición fija** - `fixed top-0`
- ✅ **Z-index alto** - `z-50`
- ✅ **Bordes y sombras** - Configurables
- ✅ **Responsive** - Oculto en móvil según configuración

## 🚀 **Uso del Componente**

### **Con Datos del CMS**

```tsx
// Página principal
const { promotionalBannerData, hasPromotionalBannerData } = usePageCMS();

{
  hasPromotionalBannerData && (
    <PromotionalBanner
      data={promotionalBannerData}
      loading={cmsLoading}
      error={cmsError}
    />
  );
}
```

### **Con Datos Personalizados**

```tsx
// Datos personalizados
const customBannerData = {
  txt_titulo: "¡Oferta especial!",
  txt_subtitulo: "Descuento del 20% en todas las propiedades",
  btn_principal: {
    txt_label: "Ver ofertas",
    link_url: "/ofertas",
    icon_btn: "FaTag"
  }
}

<PromotionalBanner
  data={customBannerData}
  loading={false}
  error={null}
/>
```

### **Solo Fallback**

```tsx
// Usar solo datos de fallback
<PromotionalBanner />
```

## 🔧 **Configuración CMS**

### **Tipo de Componente**

```
promotional_banner_component
```

### **Campos Requeridos**

- `txt_titulo` - Título principal
- `txt_subtitulo` - Subtítulo descriptivo
- `btn_principal.txt_label` - Texto del botón
- `btn_principal.link_url` - URL de destino
- `btn_principal.icon_btn` - Icono del botón

### **Campos Opcionales**

- `txt_mensaje` - Mensaje adicional
- `configuracion.variant` - Variante de estilo
- `configuracion.position` - Posición del banner
- `configuracion.dismissible` - Si se puede cerrar
- `configuracion.autoHide` - Si se oculta automáticamente
- `configuracion.showOnMobile` - Mostrar en móvil
- `configuracion.showOnDesktop` - Mostrar en desktop

## 📊 **Estructura de Datos Completa**

```tsx
interface PromotionalBannerData {
  txt_titulo: string;
  txt_subtitulo: string;
  txt_mensaje?: string;
  btn_principal: {
    txt_label: string;
    link_url: string;
    icon_btn: string;
  };
  configuracion: {
    variant: "primary" | "secondary" | "accent";
    position: "top" | "bottom";
    dismissible: boolean;
    autoHide: boolean;
    showOnMobile: boolean;
    showOnDesktop: boolean;
  };
  estilo: {
    background: "gradient" | "solid" | "transparent";
    border: "primary" | "secondary" | "accent";
    shadow: "small" | "medium" | "large";
  };
}
```

## 🎯 **Beneficios de la Implementación**

### **Flexibilidad**

- ✅ **Datos dinámicos** - Contenido editable desde CMS
- ✅ **Fallback automático** - Siempre funciona
- ✅ **Configuración flexible** - Múltiples opciones de estilo

### **Rendimiento**

- ✅ **Una sola llamada API** - Datos centralizados
- ✅ **Cache inteligente** - Datos compartidos
- ✅ **Lazy loading** - Solo se carga cuando se necesita

### **Mantenibilidad**

- ✅ **Código limpio** - Separación de responsabilidades
- ✅ **Fácil testing** - Props mockeables
- ✅ **Escalabilidad** - Fácil agregar nuevas funcionalidades

## 🔄 **Flujo de Renderizado**

1. **Verificación de datos** - ¿Hay datos del CMS?
2. **Fallback automático** - Usar datos de fallback si no hay CMS
3. **Renderizado condicional** - Solo mostrar si hay datos
4. **Interactividad** - Botones y acciones funcionan
5. **Responsive** - Se adapta a diferentes pantallas

---

¡El componente PromotionalBanner está completamente adaptado al CMS con fallback automático! 🚀
