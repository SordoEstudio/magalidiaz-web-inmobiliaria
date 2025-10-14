# 🛠️ Especificación del Componente Servicios CMS

## 🎯 **Estructura de Datos CMS**

### **Tipo de Componente**: `services_component`

### **Estructura de Datos**:

```json
{
  "txt_titulo": "Nuestros servicios",
  "txt_subtitulo": "Ofrecemos una amplia gama de servicios inmobiliarios para acompañarte en cada paso de tu operación",
  "lista_servicios": [
    {
      "id": "1",
      "txt_nombre": "Corretaje de inmuebles",
      "txt_descripcion": "Asesoramiento integral en compra y venta de propiedades con el mejor precio del mercado.",
      "icon_servicio": "FaHome",
      "destacado": true,
      "btn_servicio": {
        "txt_label": "Consultar",
        "link_url": "https://wa.me/5491123456789",
        "icon_btn": "FaWhatsapp"
      }
    }
  ],
  "txt_mensaje_cta": "¿Necesitas un servicio personalizado?",
  "btn_contacto_general": {
    "txt_label": "Contactanos",
    "link_url": "https://wa.me/5491123456789",
    "icon_contacto": "FaWhatsapp"
  }
}
```

## 🔧 **Campos del Componente**

### **Campos Principales**

| Campo                  | Tipo   | Descripción                   | Ejemplo                        |
| ---------------------- | ------ | ----------------------------- | ------------------------------ |
| `txt_titulo`           | string | Título principal de servicios | "Nuestros servicios"           |
| `txt_subtitulo`        | string | Subtítulo descriptivo         | "Ofrecemos una amplia gama..." |
| `lista_servicios`      | array  | Lista de servicios            | Ver estructura abajo           |
| `txt_mensaje_cta`      | string | Mensaje del CTA general       | "¿Necesitas un servicio..."    |
| `btn_contacto_general` | object | Botón de contacto general     | Ver estructura abajo           |

### **Estructura de `lista_servicios`**

```typescript
interface CMSServiceItem {
  id: string; // ID único del servicio
  txt_nombre: string; // Nombre del servicio
  txt_descripcion: string; // Descripción del servicio
  icon_servicio: string; // Icono del servicio (React Icons)
  destacado: boolean; // Si es destacado
  btn_servicio: {
    txt_label: string; // Texto del botón
    link_url: string; // URL de destino
    icon_btn: string; // Icono del botón
  };
}
```

### **Estructura de `btn_contacto_general`**

```typescript
interface ContactButton {
  txt_label: string; // Texto del botón
  link_url: string; // URL de destino
  icon_contacto: string; // Icono (React Icons)
}
```

## 🎨 **Convenciones de Nomenclatura**

### **Prefijos de Campos**

- `txt_` - Campos de texto
- `lista_` - Arrays de elementos
- `btn_` - Objetos de botones
- `icon_` - Iconos y elementos visuales

### **Ejemplos de Nomenclatura**

```json
{
  "txt_titulo": "Título principal",
  "txt_subtitulo": "Subtítulo descriptivo",
  "lista_servicios": "Array de servicios",
  "icon_servicio": "Icono del servicio",
  "btn_servicio": "Botón del servicio"
}
```

## 🚀 **Uso del Componente**

### **Implementación Básica**

```tsx
import { ServicesSectionHybrid } from "@/components/services-section-hybrid";

export function MyPage() {
  return <ServicesSectionHybrid />;
}
```

### **Props del Componente**

```typescript
// El componente no requiere props, usa datos del CMS automáticamente
interface ServicesSectionHybridProps {
  // No props necesarias - datos vienen del CMS
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
  data: servicesData,
  loading,
  error,
  isFromCMS,
} = useCMSData("services_component", servicesDataFallback);

// Usar datos del CMS o fallback
const safeServicesData = servicesData || servicesDataFallback;
const servicesToRender = servicesData?.lista_servicios || services;
```

## 🎯 **Iconos Soportados**

### **Iconos de Servicios**

| Icono            | Descripción         | Uso                          |
| ---------------- | ------------------- | ---------------------------- |
| `FaHome`         | Casa                | Corretaje de inmuebles       |
| `FaCalculator`   | Calculadora         | Tasaciones                   |
| `FaBuilding`     | Edificio            | Administración de alquileres |
| `FaFileContract` | Contrato            | Estudios de títulos          |
| `FaKey`          | Llave               | Venta y alquiler             |
| `FaUserTie`      | Usuario con corbata | Asesoramiento personalizado  |

### **Iconos de Botones**

| Icono        | Descripción | Uso                   |
| ------------ | ----------- | --------------------- |
| `FaWhatsapp` | WhatsApp    | Contacto por WhatsApp |
| `FaPhone`    | Teléfono    | Llamada telefónica    |
| `FaSearch`   | Búsqueda    | Ver propiedades       |
| `FaEnvelope` | Email       | Contacto por email    |

## ✅ **Características Implementadas**

- ✅ **Datos dinámicos** desde CMS
- ✅ **Fallback automático** con datos estáticos
- ✅ **Estructura estándar** según especificaciones CMS
- ✅ **Indicador visual** de origen de datos
- ✅ **Iconos dinámicos** configurables
- ✅ **Botones de acción** personalizables
- ✅ **Servicios destacados** con estilo especial
- ✅ **Responsive design** con Tailwind CSS

## 🎯 **Ventajas del Flujo Simplificado**

1. **Sin mappers complejos** - Datos directos del CMS
2. **Fallbacks garantizados** - Siempre funciona
3. **Fácil mantenimiento** - Código simple y claro
4. **Escalabilidad** - Fácil agregar nuevos servicios
5. **Tipado opcional** - TypeScript cuando se necesite

## 📝 **Próximos Pasos**

1. **Agregar más tipos de servicios** (categorías, filtros)
2. **Implementar búsqueda** en servicios
3. **Agregar analytics** de servicios más consultados
4. **Sistema de reservas** para servicios
5. **Integración con calendario** para citas

## 🔧 **Ejemplo de Uso Completo**

```tsx
"use client";

import { ServicesSectionHybrid } from "@/components/services-section-hybrid";

export function MyPage() {
  return (
    <div>
      <h1>Mi Página</h1>
      <ServicesSectionHybrid />
    </div>
  );
}
```

---

¡El componente Servicios está listo para usar con el flujo CMS simplificado! 🚀
