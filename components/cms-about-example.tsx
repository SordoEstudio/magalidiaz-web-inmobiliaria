"use client"

import { useCMSComponents } from "@/lib/hooks/useCMSComponents"
import { CMSFallback } from "@/components/cms-fallback"

export function CMSAboutExample() {
  const { getComponentByType, loading, error, cacheStats } = useCMSComponents()
  
  // Obtener datos del componente About del CMS
  const aboutComponent = getComponentByType('about_component')
  
  // Datos de fallback estáticos
  const fallbackData = {
    img_perfil: "/client01.jpg",
    txt_nombre: "Usuario",
    txt_apellido: "Demo",
    txt_descripcion: "Descripción por defecto del usuario",
    txt_destacado: "Mensaje destacado por defecto",
    txt_image_alt: "Foto de usuario demo",
    lista_titulos: [
      { txt_titulo: "Profesional", txt_matricula: "Mat. 000" }
    ]
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Ejemplo de Integración CMS</h2>
      
      {/* Información de Debug */}
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Estado del Sistema:</h3>
        <p>Loading: {loading ? 'Sí' : 'No'}</p>
        <p>Error: {error || 'Ninguno'}</p>
        <p>Cache Hit Rate: {cacheStats ? `${(cacheStats.hitRate * 100).toFixed(1)}%` : 'N/A'}</p>
        <p>Componente About: {aboutComponent ? 'Encontrado' : 'No encontrado'}</p>
      </div>

      {/* Componente About con CMS */}
      <CMSFallback 
        fallbackData={fallbackData}
        componentType="about_component"
        isLoading={loading}
        error={error}
      >
        <div className="text-center">
          <img 
            src={aboutComponent?.mappedData?.img_perfil || fallbackData.img_perfil} 
            alt={aboutComponent?.mappedData?.txt_image_alt || fallbackData.txt_image_alt} 
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          
          <h3 className="text-xl font-bold">
            {aboutComponent?.mappedData?.txt_nombre || fallbackData.txt_nombre}{' '}
            <span className="text-blue-600">
              {aboutComponent?.mappedData?.txt_apellido || fallbackData.txt_apellido}
            </span>
          </h3>
          
          {aboutComponent?.mappedData?.lista_titulos && aboutComponent.mappedData.lista_titulos.map((titulo: any, index: number) => (
            <p key={index} className="text-sm text-gray-600 mb-2">
              {titulo.txt_titulo} - {titulo.txt_matricula}
            </p>
          ))}
          
          <p className="text-gray-700 mb-4">
            {aboutComponent?.mappedData?.txt_descripcion || fallbackData.txt_descripcion}
          </p>
          
          <p className="text-gray-600 italic">
            "{aboutComponent?.mappedData?.txt_destacado || fallbackData.txt_destacado}"
          </p>
        </div>
      </CMSFallback>
    </div>
  )
}
