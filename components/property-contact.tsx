"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Phone, Share2 } from "lucide-react"

interface PropertyContactProps {
  whatsappNumber: string
  phoneNumber: string
  propertyTitle: string
}

export function PropertyContact({ whatsappNumber, phoneNumber, propertyTitle }: PropertyContactProps) {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hola! Me interesa la propiedad: ${propertyTitle}`)
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`, "_self")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: propertyTitle,
          text: `Mira esta propiedad: ${propertyTitle}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  return (
    <>
      {/* Desktop sticky contact card */}
      <Card className="sticky top-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">¿Te interesa esta propiedad?</h3>

          <div className="space-y-3">
            <Button onClick={handleWhatsApp} className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
              <MessageCircle className="h-5 w-5 mr-2" />
              Contactar por WhatsApp
            </Button>

            <Button onClick={handleCall} variant="outline" className="w-full bg-transparent" size="lg">
              <Phone className="h-5 w-5 mr-2" />
              Llamar ahora
            </Button>

            <Button onClick={handleShare} variant="ghost" className="w-full">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir propiedad
            </Button>
          </div>

          <div className="mt-4 pt-4 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">Asesor inmobiliario</p>
            <p className="font-medium">Juan Pérez</p>
            <p className="text-sm text-muted-foreground">Mat. 1234</p>
          </div>
        </CardContent>
      </Card>

      {/* Mobile floating contact button */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <Button
          onClick={handleWhatsApp}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </>
  )
}
