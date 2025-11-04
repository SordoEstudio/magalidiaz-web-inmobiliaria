"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaLinkedin, FaTwitter, FaYoutube, FaTiktok, FaTelegram, FaDiscord, FaReddit, FaPinterest } from "react-icons/fa"
import { CMSFallback } from "@/components/cms-fallback"
import contactDataFallback from "@/public/data/contactDataCms.json" // Fallback estático
import aboutDataFallback from "@/public/data/aboutDataCms.json" // Fallback estático

interface AboutContactSectionProps {
  data?: any
  fallback?: any
  loading?: boolean
  error?: string | null
}

export function AboutContactSection({ 
  data,
  loading = false, 
  error = null 
}: AboutContactSectionProps) {
  // Usar datos pasados como props o fallback
  const safeAboutData = data?.aboutData?.data || data?.aboutData 
  const safeContactData = data?.contactData?.data || data?.contactData 
  


  const renderIcon = (icon: string) => {
    switch (icon) {
      case "FaWhatsapp": return <FaWhatsapp className="h-5 w-5 text-primary" />
      case "FaPhone": return <FaPhone className="h-5 w-5 text-primary" />
      case "FaEnvelope": return <FaEnvelope className="h-5 w-5 text-primary" />
      case "FaMapMarkerAlt": return <FaMapMarkerAlt className="h-5 w-5 text-primary" />
      case "FaInstagram": return <FaInstagram className="h-5 w-5 text-primary" />
      case "FaFacebook": return <FaFacebook className="h-5 w-5 text-primary" />
      case "FaLinkedin": return <FaLinkedin className="h-5 w-5 text-primary" />
      case "FaTwitter": return <FaTwitter className="h-5 w-5 text-primary" />
      case "FaYoutube": return <FaYoutube className="h-5 w-5 text-primary" />
      case "FaTiktok": return <FaTiktok className="h-5 w-5 text-primary" />
      case "FaTelegram": return <FaTelegram className="h-5 w-5 text-primary" />
      case "FaDiscord": return <FaDiscord className="h-5 w-5 text-primary" />
      case "FaReddit": return <FaReddit className="h-5 w-5 text-primary" />
      case "FaPinterest": return <FaPinterest className="h-5 w-5 text-primary" />
    }
  }

  const handleClick = (link: string) => {
    window.open(link, '_blank')
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* About Section */}
              <CMSFallback 
                fallbackData={safeAboutData}
                componentType="about_component"
                isLoading={loading}
                error={error}
              >
{/*             {isFromCMS && (
              <div className="text-xs text-green-600 mb-2 text-center">
                ✓ Datos desde CMS
              </div>
            )} */}
            <div className="space-y-6 max-w-2xl mx-auto p-6">
              <div className="flex justify-center">
                <img 
                  src={safeAboutData.img_perfil} 
                  alt={safeAboutData.txt_image_alt || safeAboutData.txt_nombre} 
                  width={100} 
                  height={100} 
                  className="rounded-full object-cover" 
                />
              </div>
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                  {safeAboutData.txt_nombre} <span className="text-primary">{safeAboutData.txt_apellido}</span>
                </h2>
                
                {safeAboutData.lista_titulos && safeAboutData.lista_titulos.map((titulo: any, index: number) => (
                  <div key={index} className="mb-4 items-center justify-center mx-auto">
                    <p className="text-sm text-foreground font-bold">
                      {titulo.txt_titulo}{" - "}
                      <span className="text-sm text-muted-foreground">{titulo.txt_matricula}</span>
                    </p>
                  </div>
                ))}
                
                <p className="text-lg text-muted-foreground text-pretty mb-6">
                  {safeAboutData.txt_descripcion}
                </p>
                <p className="text-lg text-muted-foreground text-pretty mb-6 italic">
                  {safeAboutData.txt_destacado}
                </p>
              </div>
            </div>
          </CMSFallback>

              {/* Contact Section */}
              <CMSFallback 
                fallbackData={safeContactData}
                componentType="contact_info"
                isLoading={loading}
                error={error}
              >
          
            <Card className="border-border/50 shadow-xl bg-card">
{/*               {contactIsFromCMS && (
                <div className="text-xs text-green-600 mb-2 text-center">
                  ✓ Datos desde CMS
                </div>
              )} */}
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-6 text-center border-b border-primary/50 pb-4">Contacto</h3>
                <div className="space-y-2">
                  {safeContactData?.lista_contacto.map((contact: any) => (
                    <div key={contact.txt_nombre} className="group py-2 cursor-pointer">
                      <Button 
                        variant="ghost" 
                        size="default" 
                        className="w-full hover:bg-transparent justify-start gap-3 h-14 cursor-pointer" 
                        onClick={() => handleClick(contact.link_destino)}
                      >
                        {renderIcon(contact.icon_contacto)}
                        <div className="text-left py-4 group-hover:border-primary/50 border-b border-transparent">
                          <p className="text-muted-foreground text-md font-semibold">{contact.txt_nombre}</p>
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary">{contact.txt_etiqueta}</p>
                          {contact.txt_horario && <p className="text-sm opacity-90 text-muted-foreground">{contact.txt_horario}</p>}
                        </div>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CMSFallback>
        </div>
      </div>
    </section>
  )
}