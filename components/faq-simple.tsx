"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { FaQuestionCircle, FaWhatsapp } from "react-icons/fa"
import faqSectionFallback from "@/public/data/faqDataCms.json"
import { CMSFallback } from "@/components/cms-fallback"

interface FAQSimpleProps {
  data?: any
  fallback?: any
  loading?: boolean
  error?: string | null
  showContactCTA?: boolean
  variant?: 'default' | 'compact' | 'expanded'
}
interface FAQItem {
  id: string
  txt_pregunta: string
  txt_respuesta: string
}

interface FAQSectionProps {
  title?: string
  subtitle?: string
  faqs?: FAQItem[]
  showContactCTA?: boolean
  variant?: 'default' | 'compact' | 'expanded'
}
const safeFAQs = faqSectionFallback.lista_faqs  // Fallback estático

export function FAQSimple({
  data,
  fallback,
  loading = false,
  error = null,
  showContactCTA = false,
  variant = 'default'
}: FAQSimpleProps) {
  const [openItems, setOpenItems] = useState<string[]>([])
  
  // Usar datos pasados como props o fallback
  const faqData = data?.data || data || fallback || faqSectionFallback
  
  // Usar datos del CMS o fallback
  const safeFaqData = faqData || faqSectionFallback
  const faqsToRender = safeFaqData?.lista_faqs || []
  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }



  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'py-12'
      case 'expanded':
        return 'py-20'
      default:
        return 'py-16'
    } 
  }

  return (
        <CMSFallback 
          fallbackData={safeFaqData}
          componentType="faq_component"
          isLoading={loading}
          error={error}
        >
      <section className={`${getVariantClasses()} bg-gradient-to-b from-background to-muted/20`}>
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
{/*             {data && (
              <div className="text-xs text-green-600 mb-2">
                ✓ Datos desde CMS
              </div>
            )} */}
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Preguntas <span className="text-primary">frecuentes</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {safeFaqData.txt_subtitulo || "Encontrá respuestas a las consultas más comunes sobre nuestros servicios inmobiliarios"}
            </p>
          </div>

        {/* Category Filter */}
{/*         {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    : 'bg-background hover:bg-primary/5 text-foreground border-border/50'
                }`}
              >
                {category === 'all' ? 'Todas' : category}
              </Button>
            ))}
          </div>
        )} */}

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
              {faqsToRender.map((faq: any, index: number) => {
            const isOpen = openItems.includes(faq.id)
            
            return (
              <Card 
                key={faq.id}
                className={`group transition-all duration-300 hover:shadow-lg border-border/50 hover:border-primary/30 bg-card ${
                  isOpen ? 'shadow-lg border-primary/30' : ''
                }`}
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6  text-left flex items-center justify-between hover:bg-muted/30 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4 flex-1 ">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-semibold text-primary">
                          <FaQuestionCircle className="w-4 h-4" />
                        </span>
                      </div>
     
                        <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                          {faq.txt_pregunta}
                        </h3>
{/*                         {faq.category && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                            {faq.category}
                          </span>
                        )} */}
                      
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-primary transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-200" />
                      )}
                    </div>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <div className="ml-12">
                        <div className="h-px bg-border/50 mb-4"></div>
                        <p className="text-muted-foreground leading-relaxed text-pretty">
                          {faq.txt_respuesta}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Contact CTA */}
        {showContactCTA && (
          <div className=" max-w-4xl mx-auto text-center mt-12 ">
            <Card className=" mx-auto bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-4">
{/*                 <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                </div> */}
                <h3 className="text-xl font-semibold text-primary mb-3">
                  ¿No encontraste tu respuesta?
                </h3>
                <p className="text-muted-foreground my-8 text-pretty">
                  {safeFaqData.txt_mensaje_contacto || "Nuestro equipo está listo para ayudarte con cualquier consulta específica sobre nuestros servicios."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => window.location.href = safeFaqData.btn_contacto?.link_url || '/contacto'}
                  >
                    <FaWhatsapp className="w-4 h-4 mr-2" />
                    {safeFaqData.btn_contacto?.txt_label || "Contactanos"}
                  </Button>
{/*                   <Button 
                    size="lg"
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/5"
                    onClick={() => window.location.href = 'tel:+5491123456789'}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar ahora
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </section>
    </CMSFallback>
  )
}
