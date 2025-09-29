"use client"

import { useState } from "react"
import { getConfigInfo } from "@/lib/config"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function DebugConfig() {
  const [isVisible, setIsVisible] = useState(false)
  const [config, setConfig] = useState<any>(null)

  const handleShowConfig = () => {
    setConfig(getConfigInfo())
    setIsVisible(!isVisible)
  }

  if (process.env.NODE_ENV === 'production') {
    return null // No mostrar en producción
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleShowConfig}
        variant="outline"
        size="sm"
        className="mb-2"
      >
        🔍 Debug Config
      </Button>

      {isVisible && config && (
        <Card className="w-80 max-h-96 overflow-auto">
          <CardHeader>
            <CardTitle className="text-sm">🛠️ Configuración Actual</CardTitle>
            <CardDescription>
              Variables de entorno y configuración de API
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="font-medium">Entorno:</div>
              <Badge variant={config.environment === 'production' ? 'destructive' : 'secondary'}>
                {config.environment}
              </Badge>

              <div className="font-medium">Cliente:</div>
              <Badge variant="outline">{config.clientSlug}</Badge>

              <div className="font-medium">Contexto:</div>
              <Badge variant={config.isClient ? 'default' : 'secondary'}>
                {config.isClient ? 'Cliente' : 'Servidor'}
              </Badge>

              <div className="font-medium">Base URL:</div>
              <div className="truncate text-xs bg-muted p-1 rounded">
                {config.baseUrl}
              </div>

              <div className="font-medium">API URL:</div>
              <div className="truncate text-xs bg-muted p-1 rounded">
                {config.apiUrl || 'No definida'}
              </div>

              <div className="font-medium">Usar Proxy:</div>
              <Badge variant={config.useProxy === 'true' ? 'default' : 'outline'}>
                {config.useProxy || 'false'}
              </Badge>
            </div>

            <div className="pt-2 border-t">
              <div className="text-xs text-muted-foreground">
                <strong>URLs generadas:</strong>
              </div>
              <div className="text-xs bg-muted p-2 rounded mt-1 space-y-1">
                <div><strong>Featured:</strong> /api/public/v1/properties/featured</div>
                <div><strong>All:</strong> /api/public/v1/properties</div>
                <div><strong>Detail:</strong> /api/public/v1/properties/[id]</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
