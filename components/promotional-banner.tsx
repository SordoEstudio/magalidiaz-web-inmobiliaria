"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Megaphone } from "lucide-react"

export function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-background/90 border-y border-primary/20 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Megaphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">¡Tasación sin cargo hasta fin de mes!</p>
              <p className="text-sm text-muted-foreground">
                Conocé el valor real de tu propiedad con nuestros expertos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button size="sm" className="hidden sm:inline-flex bg-primary  cursor-pointer">
              Más información
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground cursor-pointer hover:bg-transparent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
