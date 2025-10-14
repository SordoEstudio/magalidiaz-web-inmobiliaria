# 📋 Especificación del Componente FAQ CMS

## 🎯 **Estructura de Datos CMS**

### **Tipo de Componente**: `faq_component`

### **Estructura de Datos**:

```json
{
  "txt_titulo": "Preguntas frecuentes",
  "txt_subtitulo": "Encontrá respuestas a las consultas más comunes sobre nuestros servicios inmobiliarios",
  "lista_faqs": [
    {
      "id": "1",
      "txt_pregunta": "¿Cómo funciona el proceso de compra de una propiedad?",
      "txt_respuesta": "Nuestro proceso de compra es simple y transparente...",
      "txt_categoria": "Compra"
    }
  ],
  "btn_contacto": {
    "txt_label": "Contactanos",
    "link_url": "/contacto",
    "icon_contacto": "FaWhatsapp"
  },
  "txt_mensaje_contacto": "¿No encontraste tu respuesta? Nuestro equipo está listo para ayudarte..."
}
```

## 🔧 **Campos del Componente**

### **Campos Principales**

| Campo                  | Tipo   | Descripción                         | Ejemplo                         |
| ---------------------- | ------ | ----------------------------------- | ------------------------------- |
| `txt_titulo`           | string | Título principal del FAQ            | "Preguntas frecuentes"          |
| `txt_subtitulo`        | string | Subtítulo descriptivo               | "Encontrá respuestas..."        |
| `lista_faqs`           | array  | Lista de preguntas y respuestas     | Ver estructura abajo            |
| `btn_contacto`         | object | Configuración del botón de contacto | Ver estructura abajo            |
| `txt_mensaje_contacto` | string | Mensaje del CTA de contacto         | "¿No encontraste tu respuesta?" |

### **Estructura de `lista_faqs`**

```typescript
interface FAQItem {
  id: string; // ID único de la pregunta
  txt_pregunta: string; // Texto de la pregunta
  txt_respuesta: string; // Texto de la respuesta
  txt_categoria?: string; // Categoría opcional
}
```

### **Estructura de `btn_contacto`**

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
- `link_` - URLs y enlaces

### **Ejemplos de Nomenclatura**

```json
{
  "txt_titulo": "Título principal",
  "txt_subtitulo": "Subtítulo descriptivo",
  "lista_faqs": "Array de preguntas",
  "btn_contacto": "Botón de contacto",
  "txt_mensaje_contacto": "Mensaje del CTA"
}
```

## 🚀 **Uso del Componente**

### **Implementación Básica**

```tsx
import { FAQSimple } from "@/components/faq-simple";

export function MyPage() {
  return <FAQSimple variant="default" showContactCTA={true} />;
}
```

### **Props del Componente**

```typescript
interface FAQSectionProps {
  title?: string; // Título personalizado
  subtitle?: string; // Subtítulo personalizado
  faqs?: FAQItem[]; // FAQs personalizados
  showContactCTA?: boolean; // Mostrar CTA de contacto
  variant?: "default" | "compact" | "expanded";
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
  data: faqData,
  loading,
  error,
  isFromCMS,
} = useCMSData("faq_component", faqSectionFallback);

// Usar datos del CMS o fallback
const safeFaqData = faqData || faqSectionFallback;
const faqsToRender = faqData?.lista_faqs || faqs;
```

## ✅ **Características Implementadas**

- ✅ **Datos dinámicos** desde CMS
- ✅ **Fallback automático** con datos estáticos
- ✅ **Estructura estándar** según especificaciones CMS
- ✅ **Indicador visual** de origen de datos
- ✅ **Botón de contacto** configurable
- ✅ **Mensaje personalizable** del CTA
- ✅ **Categorización** de preguntas
- ✅ **Responsive design** con Tailwind CSS

## 🎯 **Ventajas del Flujo Simplificado**

1. **Sin mappers complejos** - Datos directos del CMS
2. **Fallbacks garantizados** - Siempre funciona
3. **Fácil mantenimiento** - Código simple y claro
4. **Escalabilidad** - Fácil agregar nuevos campos
5. **Tipado opcional** - TypeScript cuando se necesite

## 📝 **Próximos Pasos**

1. **Agregar más tipos de FAQ** (categorías, filtros)
2. **Implementar búsqueda** en preguntas
3. **Agregar analytics** de preguntas más consultadas
4. **Sistema de votación** para utilidad de respuestas
5. **Integración con chatbot** para respuestas automáticas

---

¡El componente FAQ está listo para usar con el flujo CMS simplificado! 🚀
