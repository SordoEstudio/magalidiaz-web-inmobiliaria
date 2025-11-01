"use client"

import { useEffect } from "react"

interface JsonLdProps {
  data: object | object[]
}

/**
 * Componente para renderizar Schema.org JSON-LD structured data
 * @param data - Objeto o array de objetos con schema JSON-LD
 */
export function JsonLd({ data }: JsonLdProps) {
  const jsonData = Array.isArray(data) ? data : [data]

  useEffect(() => {
    // Agregar JSON-LD scripts al head del documento
    jsonData.forEach((schema, index) => {
      const scriptId = `json-ld-${index}`
      
      // Evitar duplicados
      if (document.getElementById(scriptId)) {
        return
      }

      const script = document.createElement("script")
      script.id = scriptId
      script.type = "application/ld+json"
      script.text = JSON.stringify(schema, null, 0)
      document.head.appendChild(script)
    })

    // Cleanup: remover scripts al desmontar
    return () => {
      jsonData.forEach((_, index) => {
        const scriptId = `json-ld-${index}`
        const script = document.getElementById(scriptId)
        if (script) {
          script.remove()
        }
      })
    }
  }, [jsonData])

  return null
}

