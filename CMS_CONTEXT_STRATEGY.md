# 🎯 Estrategia Context para Datos CMS

## 📊 **Análisis de Rendimiento: Context vs Props**

### **Context para Datos Globales**

```tsx
// ✅ BUENO para datos que se usan en múltiples páginas
const ContactContext = createContext();
const AboutContext = createContext();
```

### **Props para Datos Específicos**

```tsx
// ✅ BUENO para datos específicos de una página
<Component data={specificData} />
```

## 🎯 **Recomendación: Context Híbrido**

### **Context para:**

- ✅ **Datos de Contacto** - Se usan en múltiples páginas
- ✅ **Datos de About** - Se usan en múltiples páginas
- ✅ **Datos globales** - Configuración, usuario, etc.

### **Props para:**

- ✅ **Datos específicos** - Services, FAQ, Banners
- ✅ **Datos de página** - Contenido específico

## 🔧 **Implementación Propuesta**

### **1. Context para Datos Globales**

```tsx
// contexts/ContactContext.tsx
import { createContext, useContext, ReactNode } from "react";
import { useCMSComponents } from "@/lib/hooks/useCMSComponents";
import contactDataFallback from "@/public/data/contactDataCms.json";

interface ContactContextType {
  contactData: any;
  loading: boolean;
  error: string | null;
  hasContactData: boolean;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: ReactNode }) {
  const { getComponentByType, loading, error } = useCMSComponents();
  const contactData = getComponentByType("contact_info");

  const value = {
    contactData: contactData?.data || contactDataFallback,
    loading,
    error,
    hasContactData: !!contactData,
  };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return context;
}
```

### **2. Context para Datos About**

```tsx
// contexts/AboutContext.tsx
import { createContext, useContext, ReactNode } from "react";
import { useCMSComponents } from "@/lib/hooks/useCMSComponents";
import aboutDataFallback from "@/public/data/aboutDataCms.json";

interface AboutContextType {
  aboutData: any;
  loading: boolean;
  error: string | null;
  hasAboutData: boolean;
}

const AboutContext = createContext<AboutContextType | undefined>(undefined);

export function AboutProvider({ children }: { children: ReactNode }) {
  const { getComponentByType, loading, error } = useCMSComponents();
  const aboutData = getComponentByType("about_component");

  const value = {
    aboutData: aboutData?.data || aboutDataFallback,
    loading,
    error,
    hasAboutData: !!aboutData,
  };

  return (
    <AboutContext.Provider value={value}>{children}</AboutContext.Provider>
  );
}

export function useAbout() {
  const context = useContext(AboutContext);
  if (context === undefined) {
    throw new Error("useAbout must be used within an AboutProvider");
  }
  return context;
}
```

### **3. Provider Combinado**

```tsx
// contexts/CMSProvider.tsx
import { ReactNode } from "react";
import { ContactProvider } from "./ContactContext";
import { AboutProvider } from "./AboutContext";

export function CMSProvider({ children }: { children: ReactNode }) {
  return (
    <ContactProvider>
      <AboutProvider>{children}</AboutProvider>
    </ContactProvider>
  );
}
```

## 📊 **Comparación de Rendimiento**

| Métrica            | Props Drilling | Context  | Híbrido  |
| ------------------ | -------------- | -------- | -------- |
| **Llamadas API**   | 1 por página   | 1 global | 1 global |
| **Re-renders**     | Bajo           | Medio    | Bajo     |
| **Bundle size**    | Pequeño        | Medio    | Medio    |
| **Flexibilidad**   | Baja           | Alta     | Alta     |
| **Mantenibilidad** | Media          | Alta     | Alta     |

## 🎯 **Estrategia Híbrida Recomendada**

### **Context para Datos Globales:**

- ✅ **Contact Data** - Se usa en múltiples páginas
- ✅ **About Data** - Se usa en múltiples páginas

### **Props para Datos Específicos:**

- ✅ **Services Data** - Solo en página principal
- ✅ **FAQ Data** - Solo en página principal
- ✅ **Banner Data** - Solo en página principal

## 🔧 **Implementación Práctica**

### **1. Layout Principal**

```tsx
// app/layout.tsx
import { CMSProvider } from "@/contexts/CMSProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CMSProvider>{children}</CMSProvider>
      </body>
    </html>
  );
}
```

### **2. Componente PropertyContact**

```tsx
// components/property-contact.tsx
import { useContact } from "@/contexts/ContactContext";
import { useAbout } from "@/contexts/AboutContext";

export function PropertyContact({
  whatsappNumber,
  phoneNumber,
  propertyTitle,
}) {
  const { contactData, loading, error } = useContact();
  const { aboutData } = useAbout();

  // Usar datos del contexto
  const whatsapp = contactData?.lista_contacto?.find(
    (c) => c.icon_contacto === "FaWhatsapp"
  );
  const phone = contactData?.lista_contacto?.find(
    (c) => c.icon_contacto === "FaPhone"
  );

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        {/* Usar datos del contexto */}
        <img src={aboutData?.img_perfil} alt={aboutData?.txt_nombre} />
        <p>
          {aboutData?.txt_nombre} {aboutData?.txt_apellido}
        </p>
        {/* ... */}
      </CardContent>
    </Card>
  );
}
```

### **3. Página de Propiedades**

```tsx
// app/propiedades/page.tsx
import { PropertyContact } from "@/components/property-contact";

export default function PropiedadesPage() {
  return (
    <div>
      {/* El componente ya tiene acceso a los datos via Context */}
      <PropertyContact
        whatsappNumber="+5493492693712"
        phoneNumber="+5493492693712"
        propertyTitle="Propiedad en venta"
      />
    </div>
  );
}
```

## 🚀 **Beneficios de la Estrategia Híbrida**

### **Rendimiento:**

- ✅ **Una sola llamada API** - Context global
- ✅ **Cache inteligente** - Datos compartidos
- ✅ **Menos re-renders** - Solo cuando cambian datos globales
- ✅ **Lazy loading** - Context se carga solo cuando se necesita

### **Mantenibilidad:**

- ✅ **Código más limpio** - Sin props drilling
- ✅ **Fácil testing** - Context mockeable
- ✅ **Escalabilidad** - Fácil agregar nuevos contextos
- ✅ **Reutilización** - Datos disponibles en cualquier componente

### **Desarrollo:**

- ✅ **Menos duplicación** - Datos centralizados
- ✅ **Mejor debugging** - Estado claro en DevTools
- ✅ **Fácil mantenimiento** - Cambios en un solo lugar

## 📝 **Implementación Gradual**

### **Fase 1: Context para Contact**

```tsx
// Implementar ContactContext
// Actualizar PropertyContact
// Mantener props para otros datos
```

### **Fase 2: Context para About**

```tsx
// Implementar AboutContext
// Actualizar AboutContactSection
// Mantener props para otros datos
```

### **Fase 3: Evaluar otros datos**

```tsx
// Evaluar si Services, FAQ necesitan Context
// Mantener híbrido según necesidad
```

## 🎯 **Recomendación Final**

**Para tu caso específico, recomiendo:**

1. **Context para Contact** - Se usa en múltiples páginas
2. **Context para About** - Se usa en múltiples páginas
3. **Props para Services/FAQ** - Solo en página principal

### **Ventajas:**

- ✅ **Rendimiento óptimo** - Context solo para datos globales
- ✅ **Flexibilidad** - Fácil acceso desde cualquier componente
- ✅ **Mantenibilidad** - Código limpio y organizado
- ✅ **Escalabilidad** - Fácil agregar nuevos contextos

---

¡La estrategia híbrida te dará el mejor rendimiento con máxima flexibilidad! 🚀
