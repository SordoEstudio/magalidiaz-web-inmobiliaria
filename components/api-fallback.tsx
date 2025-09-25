"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"
import { checkApiHealth } from "@/lib/api/config"

interface ApiFallbackProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ApiFallback({ children, fallback }: ApiFallbackProps) {
  const [isApiAvailable, setIsApiAvailable] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const checkApi = async () => {
    setIsChecking(true)
    const available = await checkApiHealth()
    setIsApiAvailable(available)
    setIsChecking(false)
  }

  useEffect(() => {
    checkApi()
  }, [])

  if (isApiAvailable === null) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Verificando conexión con la API...</p>
        </div>
      </div>
    )
  }

  if (!isApiAvailable) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-4">
              <p>
                <strong>API no disponible:</strong> No se pudo conectar con el servidor de la API. 
                Asegurate de que el backend esté ejecutándose en el puerto 3000.
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={checkApi}
                  disabled={isChecking}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
                  Reintentar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('http://localhost:3000', '_blank')}
                >
                  Abrir API
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
        
        {fallback && <div>{fallback}</div>}
      </div>
    )
  }

  return <>{children}</>
}
