# Componente FAQ Section

## Descripción
Componente de preguntas frecuentes (FAQ) diseñado para la página principal del sitio inmobiliario. Sigue los lineamientos de diseño y estética del sitio actual.

## Características

### ✨ Funcionalidades
- **Acordeón interactivo** - Expandir/contraer preguntas
- **Filtros por categoría** - Organizar preguntas por temas
- **Animaciones suaves** - Transiciones y efectos visuales
- **Responsive design** - Optimizado para todos los dispositivos
- **CTA de contacto** - Botones para contactar directamente
- **Numeración visual** - Cada pregunta tiene un número identificador

### 🎨 Diseño
- **Paleta de colores** - Usa la paleta lila del sitio (#860dff)
- **Gradientes sutiles** - Fondo con gradiente suave
- **Cards con hover effects** - Interacciones visuales
- **Iconografía consistente** - Iconos de Lucide React
- **Tipografía** - Jerarquía clara de títulos y texto

### 📱 Responsive
- **Mobile-first** - Optimizado para dispositivos móviles
- **Breakpoints** - Adaptación automática a diferentes pantallas
- **Touch-friendly** - Botones y áreas táctiles optimizadas

## Uso

### Importación
```tsx
import { FAQSection } from "@/components/faq-section"
```

### Uso Básico
```tsx
<FAQSection />
```

### Uso con Datos JSON
```tsx
import { FAQExample } from "@/components/faq-example"
import faqData from "@/public/data/faqSection.json"

<FAQExample />
```

### Uso Personalizado
```tsx
const customFAQs = [
  {
    id: "1",
    question: "¿Cuál es el horario de atención?",
    answer: "Atendemos de lunes a viernes de 9:00 a 18:00 hs.",
    category: "Horarios"
  }
]

<FAQSection
  title="Consultas Generales"
  subtitle="Información básica"
  faqs={customFAQs}
  showContactCTA={true}
  variant="default"
/>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | `"Preguntas Frecuentes"` | Título principal de la sección |
| `subtitle` | `string` | `"Encontrá respuestas..."` | Subtítulo descriptivo |
| `faqs` | `FAQItem[]` | `defaultFAQs` | Array de preguntas y respuestas |
| `showContactCTA` | `boolean` | `true` | Mostrar botones de contacto |
| `variant` | `'default' \| 'compact' \| 'expanded'` | `'default'` | Variante de espaciado |

## Estructura de FAQItem

```typescript
interface FAQItem {
  id: string          // Identificador único
  question: string    // Pregunta
  answer: string      // Respuesta
  category?: string   // Categoría (opcional)
}
```

## Variantes

### Default
- Espaciado estándar (py-16)
- Ideal para la página principal

### Compact
- Espaciado reducido (py-12)
- Para secciones con menos espacio

### Expanded
- Espaciado amplio (py-20)
- Para páginas dedicadas a FAQ

## Categorías Incluidas

- **Compra** - Proceso de compra de propiedades
- **Venta** - Proceso de venta y comisiones
- **Financiamiento** - Créditos y financiamiento
- **Tasación** - Valuación de propiedades
- **Documentación** - Requisitos legales
- **Comercial** - Propiedades comerciales
- **Alquiler** - Servicios de alquiler
- **Zonas** - Cobertura geográfica

## Datos Mock

El archivo `public/data/faqSection.json` contiene:
- 10 preguntas frecuentes
- 8 categorías diferentes
- Respuestas detalladas y profesionales
- Estructura JSON completa

## Estilos CSS

### Variables CSS Utilizadas
- `--primary` - Color principal lila (#860dff)
- `--background` - Fondo de la página
- `--foreground` - Color del texto
- `--muted` - Colores secundarios
- `--border` - Bordes y separadores

### Clases Tailwind Principales
- `bg-gradient-to-b` - Gradiente de fondo
- `hover:shadow-lg` - Efectos hover
- `transition-all duration-300` - Transiciones suaves
- `text-primary` - Color principal
- `border-primary/30` - Bordes con transparencia

## Accesibilidad

- **Navegación por teclado** - Todos los elementos son accesibles
- **ARIA labels** - Etiquetas para lectores de pantalla
- **Contraste** - Cumple estándares WCAG
- **Focus states** - Estados de foco visibles

## Performance

- **Lazy loading** - Carga bajo demanda
- **Animaciones CSS** - Optimizadas para GPU
- **Throttling** - Eventos optimizados
- **Bundle size** - Código minimalista

## Integración

### En la Home
```tsx
// app/page.tsx
import { FAQSection } from "@/components/faq-section"

export default function HomePage() {
  return (
    <div>
      {/* Otros componentes */}
      <FAQSection />
    </div>
  )
}
```

### Con Datos Dinámicos
```tsx
// Cargar desde API o CMS
const [faqData, setFaqData] = useState(null)

useEffect(() => {
  fetch('/api/faqs')
    .then(res => res.json())
    .then(data => setFaqData(data))
}, [])

return faqData ? <FAQSection {...faqData} /> : <div>Cargando...</div>
```

## Personalización

### Colores
Modificar las variables CSS en `app/globals.css`:
```css
:root {
  --primary: #tu-color;
  --background: #tu-fondo;
}
```

### Espaciado
Ajustar las clases de padding en las variantes:
```tsx
const getVariantClasses = () => {
  switch (variant) {
    case 'compact': return 'py-8'    // Menos espacio
    case 'expanded': return 'py-24'  // Más espacio
    default: return 'py-16'
  }
}
```

### Animaciones
Personalizar las animaciones CSS:
```css
@keyframes custom-fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```

## Mantenimiento

### Agregar Nuevas Preguntas
1. Editar `public/data/faqSection.json`
2. Agregar nueva entrada con `id`, `question`, `answer`, `category`
3. El componente se actualiza automáticamente

### Modificar Categorías
1. Actualizar el array de categorías en el JSON
2. El filtro se genera automáticamente
3. Las preguntas se agrupan por categoría

### Cambiar Estilos
1. Modificar las clases Tailwind en el componente
2. Actualizar las variables CSS en `globals.css`
3. Ajustar las animaciones según necesidad

## Troubleshooting

### Problemas Comunes

**Las preguntas no se expanden:**
- Verificar que el componente tenga `"use client"`
- Revisar que los IDs sean únicos

**Los filtros no funcionan:**
- Confirmar que las categorías coincidan
- Verificar la estructura del JSON

**Estilos no se aplican:**
- Revisar que Tailwind esté configurado
- Verificar las variables CSS

### Debug
```tsx
// Agregar logs para debug
console.log('FAQs loaded:', faqs)
console.log('Selected category:', selectedCategory)
console.log('Open items:', openItems)
```

## Roadmap

### Próximas Mejoras
- [ ] Búsqueda en tiempo real
- [ ] Favoritos de preguntas
- [ ] Compartir preguntas
- [ ] Analytics de preguntas más consultadas
- [ ] Integración con CMS
- [ ] Modo oscuro mejorado
- [ ] Animaciones más avanzadas
- [ ] Soporte para multimedia en respuestas

### Versiones Futuras
- **v2.0** - Búsqueda y filtros avanzados
- **v2.1** - Integración con CMS
- **v3.0** - Componente completamente dinámico
