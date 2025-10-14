#!/usr/bin/env node

/**
 * Script para probar las llamadas a la API de componentes CMS
 * Uso: node scripts/test-cms-api.js
 */

const https = require("https");
const http = require("http");

// Configuración
const config = {
  // URLs de prueba
  urls: [
    "https://micms.website/api/public/v1/cms-components?clientSlug=harvestech",
    "http://localhost:3000/api/public/v1/cms-components?clientSlug=harvestech",
    "http://localhost:8000/api/public/v1/cms-components?clientSlug=harvestech",
  ],
  timeout: 10000, // 10 segundos
};

// Función para hacer petición HTTP/HTTPS
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const protocol = url.startsWith("https") ? https : http;

    const request = protocol.get(
      url,
      {
        timeout: config.timeout,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "CMS-API-Test/1.0",
        },
      },
      (response) => {
        const responseTime = Date.now() - startTime;
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          resolve({
            url,
            status: response.statusCode,
            statusText: response.statusMessage,
            headers: response.headers,
            responseTime,
            data: data,
            success: response.statusCode >= 200 && response.statusCode < 300,
          });
        });
      }
    );

    request.on("error", (error) => {
      const responseTime = Date.now() - startTime;
      reject({
        url,
        error: error.message,
        responseTime,
        success: false,
      });
    });

    request.on("timeout", () => {
      const responseTime = Date.now() - startTime;
      request.destroy();
      reject({
        url,
        error: "Timeout",
        responseTime,
        success: false,
      });
    });
  });
}

// Función para probar una URL
async function testUrl(url) {
  console.log(`\n🔗 Probando: ${url}`);
  console.log("─".repeat(80));

  try {
    const result = await makeRequest(url);

    console.log(`✅ Status: ${result.status} ${result.statusText}`);
    console.log(`⏱️  Tiempo de respuesta: ${result.responseTime}ms`);
    console.log(`📋 Headers:`);
    Object.entries(result.headers).forEach(([key, value]) => {
      console.log(`   ${key}: ${value}`);
    });

    // Intentar parsear JSON
    try {
      const jsonData = JSON.parse(result.data);
      console.log(`📦 Datos de respuesta:`);
      console.log(`   Success: ${jsonData.success}`);
      console.log(`   Message: ${jsonData.message}`);

      if (jsonData.data && jsonData.data.components) {
        console.log(`   Componentes: ${jsonData.data.components.length}`);
        console.log(`   Cliente: ${jsonData.data.client?.name || "N/A"}`);

        // Mostrar detalles de los primeros 3 componentes
        jsonData.data.components.slice(0, 3).forEach((component, index) => {
          console.log(`   Componente ${index + 1}:`);
          console.log(`     ID: ${component._id}`);
          console.log(`     Nombre: ${component.name}`);
          console.log(`     Tipo: ${component.type}`);
          console.log(`     Página: ${component.page}`);
          console.log(`     Estado: ${component.status}`);
          console.log(`     Activo: ${component.isActive}`);
          console.log(`     Visible: ${component.isVisible}`);
        });
      }
    } catch (parseError) {
      console.log(`❌ Error al parsear JSON: ${parseError.message}`);
      console.log(`📄 Respuesta raw (primeros 200 chars):`);
      console.log(result.data.substring(0, 200));
    }

    return result;
  } catch (error) {
    console.log(`❌ Error: ${error.error || error.message}`);
    console.log(`⏱️  Falló después de: ${error.responseTime}ms`);
    return error;
  }
}

// Función principal
async function main() {
  console.log("🚀 Iniciando pruebas de API de componentes CMS");
  console.log("═".repeat(80));

  const results = [];

  for (const url of config.urls) {
    const result = await testUrl(url);
    results.push(result);

    // Pausa entre pruebas
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Resumen
  console.log("\n📊 RESUMEN DE PRUEBAS");
  console.log("═".repeat(80));

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`✅ Exitosas: ${successful.length}`);
  console.log(`❌ Fallidas: ${failed.length}`);

  if (successful.length > 0) {
    console.log("\n✅ URLs que funcionan:");
    successful.forEach((result) => {
      console.log(`   ${result.url} (${result.responseTime}ms)`);
    });
  }

  if (failed.length > 0) {
    console.log("\n❌ URLs que fallan:");
    failed.forEach((result) => {
      console.log(`   ${result.url} - ${result.error || "Error desconocido"}`);
    });
  }

  // Recomendaciones
  console.log("\n💡 RECOMENDACIONES:");
  if (successful.length === 0) {
    console.log("   - Verificar que la API esté ejecutándose");
    console.log("   - Revisar la configuración de CORS");
    console.log("   - Verificar las variables de entorno");
  } else {
    console.log("   - Usar la URL que responde más rápido");
    console.log("   - Configurar fallbacks para alta disponibilidad");
  }

  console.log("\n🏁 Pruebas completadas");
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testUrl, makeRequest };
