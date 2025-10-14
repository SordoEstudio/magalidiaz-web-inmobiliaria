"use client"

import { useState, useEffect } from 'react'
import { useCMSComponents } from '@/lib/hooks/useCMSComponents'
import { getConfigInfo } from '@/lib/config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, ChevronRight, RefreshCw, AlertCircle, CheckCircle, Clock, Database, Globe, Settings } from 'lucide-react'

interface CMSDebugPanelProps {
  className?: string
}

export function CMSDebugPanel({ className }: CMSDebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [configInfo, setConfigInfo] = useState<any>(null)
  const [apiCalls, setApiCalls] = useState<any[]>([])
  
  // Hook para obtener componentes CMS
  const { 
    components, 
    mappedComponents, 
    loading, 
    error, 
    refetch, 
    getComponentByType, 
    getComponentsByPage,
    cacheStats 
  } = useCMSComponents()

  // Obtener información de configuración
  useEffect(() => {
    const config = getConfigInfo()
    setConfigInfo(config)
  }, [])

  // Interceptar console.log para capturar llamadas a la API
  useEffect(() => {
    const originalLog = console.log
    const originalError = console.error
    
    console.log = (...args) => {
      if (args[0]?.includes?.('CMS Components API Call') || args[0]?.includes?.('CMS Component API Call')) {
        setApiCalls(prev => [...prev, {
          id: Math.random().toString(36).substr(2, 9),
          type: 'call',
          timestamp: new Date().toISOString(),
          message: args[0],
          data: args.slice(1)
        }])
      }
      originalLog(...args)
    }
    
    console.error = (...args) => {
      if (args[0]?.includes?.('CMS Components API Error') || args[0]?.includes?.('CMS Component API Error')) {
        setApiCalls(prev => [...prev, {
          id: Math.random().toString(36).substr(2, 9),
          type: 'error',
          timestamp: new Date().toISOString(),
          message: args[0],
          data: args.slice(1)
        }])
      }
      originalError(...args)
    }

    return () => {
      console.log = originalLog
      console.error = originalError
    }
  }, [])

  const getStatusIcon = () => {
    if (loading) return <Clock className="h-4 w-4 text-yellow-500" />
    if (error) return <AlertCircle className="h-4 w-4 text-red-500" />
    if (components && components.length > 0) return <CheckCircle className="h-4 w-4 text-green-500" />
    return <Database className="h-4 w-4 text-gray-500" />
  }

  const getStatusText = () => {
    if (loading) return "Cargando..."
    if (error) return "Error"
    if (components && components.length > 0) return "Conectado"
    return "Sin datos"
  }

  const getStatusColor = () => {
    if (loading) return "bg-yellow-100 text-yellow-800"
    if (error) return "bg-red-100 text-red-800"
    if (components && components.length > 0) return "bg-green-100 text-green-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border shadow-lg"
          >
            <Settings className="h-4 w-4 mr-2" />
            CMS Debug
            {getStatusIcon()}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-2">
          <Card className="w-96 max-h-96 overflow-y-auto">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                <span>Estado del Sistema CMS</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={refetch}
                  disabled={loading}
                >
                  <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Estado General */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Estado:</span>
                  <Badge className={getStatusColor()}>
                    {getStatusIcon()}
                    <span className="ml-1">{getStatusText()}</span>
                  </Badge>
                </div>
                
                {components && (
                  <div className="text-xs text-muted-foreground">
                    {components.length} componentes cargados
                  </div>
                )}
                
                {error && (
                  <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                    {error}
                  </div>
                )}
              </div>

              {/* Configuración */}
              {configInfo && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Configuración:</div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Entorno:</span>
                      <Badge variant="outline">{configInfo.environment}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Cliente:</span>
                      <span className="text-muted-foreground">{configInfo.clientSlug}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Base URL:</span>
                      <span className="text-muted-foreground text-xs truncate max-w-32">
                        {configInfo.baseUrl}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Proxy:</span>
                      <span className="text-muted-foreground">{configInfo.useProxy || 'false'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Llamadas a la API */}
              {apiCalls.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Últimas llamadas:</div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {apiCalls.slice(-5).reverse().map((call) => (
                      <div 
                        key={call.id}
                        className={`text-xs p-2 rounded ${
                          call.type === 'error' 
                            ? 'bg-red-50 text-red-700' 
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {call.type === 'error' ? '❌ Error' : '🔗 Llamada'}
                          </span>
                          <span className="text-xs opacity-75">
                            {new Date(call.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-xs opacity-75 mt-1">
                          {call.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Estadísticas de Cache */}
              {cacheStats && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Cache Stats:</div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span className="text-muted-foreground">{cacheStats.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Válidos:</span>
                      <span className="text-green-600">{cacheStats.valid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hit Rate:</span>
                      <span className="text-blue-600">{(cacheStats.hitRate * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Componentes CMS */}
              {components && components.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Componentes:</div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {components.map((component, index) => (
                      <div key={component._id} className="text-xs p-2 bg-gray-50 rounded">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{component.name}</span>
                          <Badge 
                            variant={component.isActive ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {component.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {component.type} • {component.page}
                        </div>
                        {mappedComponents && mappedComponents.has(component.type) && (
                          <div className="text-xs text-green-600 mt-1">
                            ✓ Mapeado
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
