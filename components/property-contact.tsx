"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Phone, Share2 } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { useContact } from "@/contexts/ContactContext"
import { useAbout } from "@/contexts/AboutContext"

interface PropertyContactProps {
  whatsappNumber: string
  phoneNumber: string
  propertyTitle: string
}

export function PropertyContact({ whatsappNumber, phoneNumber, propertyTitle }: PropertyContactProps) {
  // Obtener datos del Context
  const { contactData, loading: contactLoading, error: contactError } = useContact()
  const { aboutData, loading: aboutLoading, error: aboutError } = useAbout()
  
  // Usar datos del Context o props como fallback
  const whatsappContact = contactData?.lista_contacto?.find((c: any) => c.icon_contacto === 'FaWhatsapp')
  const phoneContact = contactData?.lista_contacto?.find((c: any) => c.icon_contacto === 'FaPhone')
  
  const finalWhatsappNumber = whatsappContact?.link_destino?.replace('https://wa.me/', '') || whatsappNumber
  const finalPhoneNumber = phoneContact?.link_destino?.replace('tel:', '') || phoneNumber

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hola! Me interesa la propiedad: ${propertyTitle}`)
    window.open(`https://wa.me/${finalWhatsappNumber}?text=${message}`, "_blank")
  }

  const handleCall = () => {
    window.open(`tel:${finalPhoneNumber}`, "_self")
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
            {/* Información del asesor desde Context */}
            <img 
              src={aboutData?.img_perfil || '/placeholder-user.jpg'} 
              alt={aboutData?.txt_nombre || 'Asesor'} 
              width={100} 
              height={100} 
              className="rounded-full mx-auto object-cover" 
            />
            <p className="font-medium">
              {aboutData?.txt_nombre || 'Asesor'} {aboutData?.txt_apellido || ''}
            </p>
            <p className="text-sm text-muted-foreground">Asesor inmobiliario</p>
            {aboutData?.lista_titulos?.map((titulo: any, index: number) => (
              <p key={index} className="text-sm text-muted-foreground">
                {titulo.txt_titulo} - {titulo.txt_matricula}
              </p>
            ))}
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
