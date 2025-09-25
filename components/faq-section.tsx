"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Phone } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

interface FAQSectionProps {
  title?: string
  subtitle?: string
  faqs?: FAQItem[]
  showContactCTA?: boolean
  variant?: 'default' | 'compact' | 'expanded'
}

const defaultFAQs: FAQItem[] = [
  {
    id: "1",
    question: "¿Cómo funciona el proceso de compra de una propiedad?",
    answer: "Nuestro proceso de compra es simple y transparente. Primero, te ayudamos a encontrar la propiedad ideal según tus necesidades y presupuesto. Luego, coordinamos las visitas, te asesoramos en la negociación y te acompañamos en todo el proceso legal hasta la escrituración.",
    category: "Compra"
  },
  {
    id: "2", 
    question: "¿Qué comisiones cobran por la venta de mi propiedad?",
    answer: "Nuestras comisiones son competitivas y transparentes. Trabajamos con una estructura de honorarios clara que se establece al inicio del proceso. Te proporcionamos toda la información detallada en nuestra primera reunión para que no tengas sorpresas.",
    category: "Venta"
  },
  {
    id: "3",
    question: "¿Ofrecen financiamiento o créditos hipotecarios?",
    answer: "Sí, trabajamos con las principales entidades financieras del país. Te ayudamos a encontrar las mejores opciones de financiamiento según tu perfil crediticio y te acompañamos en todo el proceso de solicitud del crédito hipotecario.",
    category: "Financiamiento"
  },
  {
    id: "4",
    question: "¿Cuánto tiempo toma vender una propiedad?",
    answer: "El tiempo de venta depende de varios factores como ubicación, precio, estado de la propiedad y condiciones del mercado. En promedio, nuestras propiedades se venden entre 2 a 6 meses. Te proporcionamos un análisis detallado del tiempo estimado para tu propiedad específica.",
    category: "Venta"
  },
  {
    id: "5",
    question: "¿Hacen tasaciones de propiedades?",
    answer: "Sí, ofrecemos servicios de tasación profesional realizados por tasadores certificados. Nuestras tasaciones son reconocidas por bancos y entidades financieras, y te ayudan a establecer el precio justo para tu propiedad.",
    category: "Tasación"
  },
  {
    id: "6",
    question: "¿Qué documentación necesito para vender mi propiedad?",
    answer: "Para vender tu propiedad necesitarás: título de propiedad, planos, boletas de servicios, certificado de deuda libre, y otros documentos según el tipo de propiedad. Te proporcionamos una lista completa y te ayudamos a obtener toda la documentación necesaria.",
    category: "Documentación"
  }
]

export function FAQSection({
  title = "Preguntas Frecuentes",
  subtitle = "Encontrá respuestas a las consultas más comunes sobre nuestros servicios inmobiliarios",
  faqs = defaultFAQs,
  showContactCTA = true,
  variant = 'compact'
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category).filter(Boolean)))]
  
  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

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
    <section className={`${getVariantClasses()} bg-gradient-to-b from-background to-muted/20`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {subtitle}
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
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
        )}

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => {
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
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-semibold text-primary">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                          {faq.question}
                        </h3>
                        {faq.category && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                            {faq.category}
                          </span>
                        )}
                      </div>
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
                          {faq.answer}
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
          <div className="text-center mt-12">
            <Card className=" mx-auto bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  ¿No encontraste tu respuesta?
                </h3>
                <p className="text-muted-foreground mb-6 text-pretty">
                  Nuestro equipo está listo para ayudarte con cualquier consulta específica sobre nuestros servicios.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => window.location.href = '/contacto'}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contactanos
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/5"
                    onClick={() => window.location.href = 'tel:+5491123456789'}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar ahora
                  </Button>
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
  )
}
