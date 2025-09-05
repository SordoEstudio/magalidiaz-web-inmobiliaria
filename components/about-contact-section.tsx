"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {  Award, Clock, House } from "lucide-react"
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaInstagram, FaFacebook } from "react-icons/fa"
import aboutData from "@/public/data/aboutSection.json"
import contactData from "@/public/data/contactSection.json"

export function AboutContactSection() {
const renderIcon = (icon: string) => {
  switch (icon) {
    case "FaWhatsapp": return <FaWhatsapp className="h-5 w-5 text-primary" />
    case "FaPhone": return <FaPhone className="h-5 w-5 text-primary" />
    case "FaEnvelope": return <FaEnvelope className="h-5 w-5 text-primary" />
    case "FaMapMarkerAlt": return <FaMapMarkerAlt className="h-5 w-5 text-primary" />
    case "FaInstagram": return <FaInstagram className="h-5 w-5 text-primary" />
    case "FaFacebook": return <FaFacebook className="h-5 w-5 text-primary" />
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
          <div className="space-y-6 max-w-2xl mx-auto p-6 ">
            <div className="flex justify-center">
              <img src={aboutData.image} alt={aboutData.nombre} width={100} height={100} className="rounded-full" />
            </div>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                {aboutData.nombre} <span className="text-primary">{aboutData.apellido}</span>
              </h2>
                {aboutData.titulos.map((titulo) => (
              <div  className="mb-4 items-center justify-center  mx-auto">
                    <p className="text-sm text-foreground font-bold">{titulo.titulo}{" - "}<span className="text-sm text-muted-foreground">{titulo.matricula}</span>
                    </p>
          
                </div>
                ))}
              <p className="text-lg text-muted-foreground text-pretty mb-6">
                {aboutData.descripcion}
              </p>
              <p className="text-lg text-muted-foreground text-pretty mb-6 italic">
                {aboutData.featuredText}
            </p>
              
            </div>
{/* STATS */}
{/*             <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{aboutData.stats.operaciones}</p>
                  <p className="text-sm text-muted-foreground">Operaciones</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{aboutData.stats.experiencia}</p>
                  <p className="text-sm text-muted-foreground">Experiencia</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center">
                  <House className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{aboutData.stats.propiedades}</p>
                  <p className="text-sm text-muted-foreground">Propiedades</p>
                </div>
              </div>
            </div> */}

{/*             <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {aboutData.cta}
            </Button> */}
          </div>

          {/* Contact Section */}
          <div>
            <Card className="border-border/50 shadow-xl bg-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-6 text-center border-b border-primary/50 pb-4">Contacto</h3>
                <div className="space-y-2">
                  {contactData.contactLinks.map((contact) => (
                    
                    <div key={contact.name} className="group py-2 cursor-pointer " >
                    <Button variant="ghost" size="default" className="w-full hover:bg-transparent justify-start  gap-3 h-14  cursor-pointer " onClick={() => handleClick(contact.link)}>
                      {renderIcon(contact.icon)}
                    <div className="text-left py-4  group-hover:border-primary/50 border-b border-transparent">
                      <p className="text-muted-foreground text-md font-semibold ">{contact.name}</p>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary">{contact.label}</p>
                      {contact.horario && <p className="text-sm opacity-90 text-muted-foreground">{contact.horario}</p>}
                    </div>
                  </Button>
                  </div>
                ))}


{/*      {contactData.horario &&             <div className="flex items-start gap-3 p-4  border-t-2 border-foreground/10">
                    <FaClock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Horario de atención</p>
                      <p className="text-sm text-muted-foreground">
                        {contactData.horario}
                      </p>
                    </div>
                  </div>} */}

</div>
                
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
