# 🌍 Configuración de Entorno - MbInmobiliaria

## 📋 Variables de Entorno Necesarias

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```bash
# ================================
# 🔧 CONFIGURACIÓN DE API
# ================================

# URL de la API (sin trailing slash)
# Desarrollo: http://localhost:3000
# Producción: https://api.harvestech.com.ar
NEXT_PUBLIC_API_URL=http://localhost:3000

# Cliente/Tenant específico
# Cambiar según el cliente que se esté configurando
NEXT_PUBLIC_CLIENT_SLUG=harvestech

# ================================
# 🚀 CONFIGURACIÓN DE DESARROLLO
# ================================

# Usar proxy de Next.js en desarrollo (true/false)
# true: Usa /api/public/v1/* que redirige a localhost:3000
# false: Hace llamadas directas a NEXT_PUBLIC_API_URL
NEXT_PUBLIC_USE_PROXY=true
```

## 🚀 Configuraciones por Entorno

### 📍 **Desarrollo Local (con API local)**

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_CLIENT_SLUG=harvestech
NEXT_PUBLIC_USE_PROXY=true
NODE_ENV=development
```

### 🌐 **Desarrollo con API Remota**

```bash
NEXT_PUBLIC_API_URL=https://api.harvestech.com.ar
NEXT_PUBLIC_CLIENT_SLUG=casia
NEXT_PUBLIC_USE_PROXY=false
NODE_ENV=development
```

### 🏭 **Producción**

```bash
NEXT_PUBLIC_API_URL=https://api.harvestech.com.ar
NEXT_PUBLIC_CLIENT_SLUG=casia
NODE_ENV=production
# NEXT_PUBLIC_USE_PROXY se ignora en producción
```

## 📊 Comportamiento por Configuración

| Entorno         | USE_PROXY       | Resultado                                 |
| --------------- | --------------- | ----------------------------------------- |
| **development** | `true`          | Usa proxy Next.js → `localhost:3000`      |
| **development** | `false`         | Llamadas directas a `NEXT_PUBLIC_API_URL` |
| **production**  | cualquier valor | Llamadas directas a `NEXT_PUBLIC_API_URL` |

## 🔧 Scripts de Package.json

El proyecto está configurado para usar **puerto 4000** en desarrollo:

```json
{
  "scripts": {
    "dev": "next dev -p 4000", // Frontend en puerto 4000
    "build": "next build",
    "start": "next start"
  }
}
```

## 🛠️ Comandos para Diferentes Configuraciones

### Con npm:

```bash
# Desarrollo local con proxy
npm run dev

# Para cambiar configuración, editar .env.local
```

### Con pnpm:

```bash
# Desarrollo local con proxy
pnpm dev

# Para cambiar configuración, editar .env.local
```

## 🐛 Debug de Configuración

Puedes usar la función `getConfigInfo()` en el código para ver la configuración actual:

```typescript
import { getConfigInfo } from "@/lib/config";

console.log("🔍 Config Debug:", getConfigInfo());
```

## 🚨 Problemas Comunes

### **Error**: "Cannot connect to API"

- ✅ Verificar que la API esté corriendo en el puerto correcto
- ✅ Revisar las variables de entorno en `.env.local`
- ✅ Verificar que `NEXT_PUBLIC_USE_PROXY` esté configurado correctamente

### **Error**: "CORS policy error"

- ✅ En desarrollo local: usar `NEXT_PUBLIC_USE_PROXY=true`
- ✅ En producción: configurar CORS en el servidor API

### **Error**: "Different results with npm vs pnpm"

- ✅ Ambos package managers leen las mismas variables de entorno
- ✅ El problema está en la configuración de `.env.local`
- ✅ Verificar que las variables estén bien definidas

## 📁 Estructura de Archivos de Configuración

```
MbInmobiliariaV0/
├── .env.local          # Tu configuración local (no commitear)
├── ENV_CONFIG.md       # Esta documentación
├── lib/config.ts       # Lógica de configuración
└── next.config.mjs     # Configuración de Next.js
```

## ✅ Checklist de Configuración

- [ ] Crear archivo `.env.local` con las variables necesarias
- [ ] Verificar que la API esté corriendo en el puerto configurado
- [ ] Probar con `npm run dev` y `pnpm dev` para confirmar consistencia
- [ ] Verificar en browser console los logs de configuración
- [ ] Confirmar que las llamadas API lleguen al endpoint correcto
