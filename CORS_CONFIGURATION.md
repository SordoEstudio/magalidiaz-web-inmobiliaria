# 🌐 Configuración de CORS para API Backend

## 📋 Dominios que Necesitan Acceso

Tu API backend necesita permitir requests desde estos dominios:

### 🎯 **Dominios Principales:**
- `https://micms.website` - CMS principal
- `https://*.micms.website` - Todos los subdominios del CMS
- `https://mb-inmobiliaria-v0.vercel.app` - Frontend en Vercel
- `https://*.vercel.app` - Previews de Vercel
- `http://localhost:4000` - Desarrollo local (frontend)
- `http://localhost:3000` - Desarrollo local (si necesario)

## ⚙️ Configuración de CORS en el Backend

### **Si usas Express.js:**

```javascript
const cors = require('cors');

const corsOptions = {
  origin: [
    // CMS
    'https://micms.website',
    /^https:\/\/.*\.micms\.website$/,
    
    // Frontend en Vercel
    'https://mb-inmobiliaria-v0.vercel.app',
    /^https:\/\/.*\.vercel\.app$/,
    
    // Desarrollo local
    'http://localhost:4000',
    'http://localhost:3000',
    
    // Otros dominios si necesarios
    /^https:\/\/.*\.harvestech\.com\.ar$/,
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'X-CSRF-Token',
    'X-Api-Version'
  ]
};

app.use(cors(corsOptions));
```

### **Si usas Next.js API Routes:**

```javascript
// En tu handler de API
export default async function handler(req, res) {
  // Configurar CORS
  const allowedOrigins = [
    'https://micms.website',
    'https://mb-inmobiliaria-v0.vercel.app',
    'http://localhost:4000'
  ];
  
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin) || 
      /^https:\/\/.*\.micms\.website$/.test(origin) ||
      /^https:\/\/.*\.vercel\.app$/.test(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Tu lógica de API aquí...
}
```

### **Si usas Fastify:**

```javascript
await fastify.register(require('@fastify/cors'), {
  origin: [
    'https://micms.website',
    /^https:\/\/.*\.micms\.website$/,
    'https://mb-inmobiliaria-v0.vercel.app',
    /^https:\/\/.*\.vercel\.app$/,
    'http://localhost:4000',
    'http://localhost:3000'
  ],
  credentials: true
});
```

## 🔧 Configuración por Entorno

### **Desarrollo:**
```javascript
const corsOptions = {
  origin: true, // Permitir todos los orígenes en desarrollo
  credentials: true
};
```

### **Producción:**
```javascript
const corsOptions = {
  origin: [
    'https://micms.website',
    /^https:\/\/.*\.micms\.website$/,
    'https://mb-inmobiliaria-v0.vercel.app',
    /^https:\/\/.*\.vercel\.app$/
  ],
  credentials: true
};
```

## 🧪 Verificar Configuración de CORS

### **1. Usando curl:**
```bash
# Verificar desde micms.website
curl -H "Origin: https://micms.website" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://api.harvestech.com.ar/api/public/v1/properties

# Verificar desde vercel
curl -H "Origin: https://mb-inmobiliaria-v0.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://api.harvestech.com.ar/api/public/v1/properties
```

### **2. Usando JavaScript en browser:**
```javascript
// En console del browser en micms.website
fetch('https://api.harvestech.com.ar/api/public/v1/properties?clientSlug=harvestech')
  .then(response => {
    console.log('✅ CORS OK:', response.status);
    return response.json();
  })
  .catch(error => {
    console.error('❌ CORS Error:', error);
  });
```

## 🚨 Errores Comunes de CORS

### **Error**: "has been blocked by CORS policy"
```
Access to fetch at 'https://api.harvestech.com.ar/...' from origin 'https://micms.website' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

**Solución:** Agregar `https://micms.website` a los orígenes permitidos.

### **Error**: "CORS policy: Request header ... is not allowed"
```
Access to fetch at '...' has been blocked by CORS policy: 
Request header 'authorization' is not allowed by Access-Control-Allow-Headers
```

**Solución:** Agregar el header a `allowedHeaders`.

### **Error**: "Credential is not supported if the CORS header 'Access-Control-Allow-Origin' is '*'"
**Solución:** Usar orígenes específicos en lugar de `*` cuando `credentials: true`.

## ✅ Checklist de Configuración

- [ ] Agregar `https://micms.website` a orígenes permitidos
- [ ] Agregar regex `^https:\/\/.*\.micms\.website$` para subdominios
- [ ] Agregar `https://mb-inmobiliaria-v0.vercel.app`
- [ ] Agregar regex `^https:\/\/.*\.vercel\.app$` para previews
- [ ] Configurar `credentials: true` si necesitas cookies/auth
- [ ] Probar con curl o browser console
- [ ] Verificar que no hay errores en browser DevTools

## 🔄 Aplicar Cambios

1. **Actualizar configuración CORS en tu API backend**
2. **Reiniciar el servidor API**
3. **Probar desde micms.website:**
   - Abrir https://micms.website
   - Abrir DevTools (F12)
   - Intentar hacer una request a tu API
   - Verificar que no hay errores de CORS

## 📞 URLs de Prueba

Una vez configurado CORS, estas URLs deberían funcionar desde micms.website:

```
✅ https://api.harvestech.com.ar/api/public/v1/properties?clientSlug=harvestech
✅ https://api.harvestech.com.ar/api/public/v1/properties/featured?clientSlug=harvestech
✅ https://api.harvestech.com.ar/api/public/v1/properties/[id]?clientSlug=harvestech
```
