"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Phone, Share2 } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import aboutData from "@/public/data/aboutSection.json"
import contactData from "@/public/data/contactSection.json"

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
      <Card className="sticky top-24">
        <CardContent className="p-6">
          <h3 className="font-semibold text-center text-lg mb-4">¿Te interesa esta propiedad?</h3>

          <div className="space-y-3">
            <Button onClick={handleWhatsApp} className="w-full bg-primary hover:bg-primary/80 text-white cursor-pointer" size="lg">
              <FaWhatsapp className="h-5 w-5 mr-2" />
              Contactar por WhatsApp
            </Button>

            <Button onClick={handleCall} variant="outline" className="w-full bg-transparent border-primary cursor-pointer" size="lg">
              <Phone className="h-5 w-5 mr-2" />
              Llamar ahora
            </Button>

            <Button onClick={handleShare} variant="ghost" className="w-full cursor-pointer">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir propiedad
            </Button>
          </div>

          <div className="mt-4 pt-4 border-t border-border text-center">
            {/* foto de aboutData.image */}
            <img src={aboutData.image} alt={aboutData.nombre} width={100} height={100} className="rounded-full mx-auto" />
            <p className="font-medium">{aboutData.nombre} {aboutData.apellido}</p>
            <p className="text-sm text-muted-foreground">Asesor inmobiliario</p>
            <p className="text-sm text-muted-foreground">{aboutData.matricula}</p>
          </div>
        </CardContent>
      </Card>

      {/* Mobile floating contact button */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <Button
          onClick={handleWhatsApp}
          size="lg"
          className="bg-primary hover:bg-primary/80 text-white rounded-full shadow-lg cursor-pointer"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </>
  )
}
