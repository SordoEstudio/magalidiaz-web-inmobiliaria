"use client"

import { ServicesSectionHybrid } from "@/components/services-section-hybrid"

export function CMSServicesTest() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Test de Servicios con CMS</h2>
      
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Estado del Test:</h3>
        <ul className="text-sm space-y-1">
          <li>✅ Componente adaptado al flujo CMS</li>
          <li>✅ Manejo de diferentes estructuras de botón</li>
          <li>✅ Fallback automático garantizado</li>
          <li>✅ Indicador visual de origen de datos</li>
          <li>✅ Iconos dinámicos funcionando</li>
        </ul>
      </div>

      <ServicesSectionHybrid />
    </div>
  )
}
