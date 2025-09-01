import { Card, CardContent } from "@/components/ui/card"
import { Home, Calculator, Building, FileText, Key, Users } from "lucide-react"

const services = [
  {
    icon: Home,
    title: "Corretaje de inmuebles",
    description: "Asesoramiento integral en compra y venta de propiedades con el mejor precio del mercado.",
  },
  {
    icon: Calculator,
    title: "Tasaciones",
    description: "Valuaciones profesionales y certificadas para conocer el valor real de tu propiedad.",
  },
  {
    icon: Building,
    title: "Administración de alquileres",
    description: "Gestión completa de propiedades en alquiler, desde la búsqueda hasta el cobro.",
  },
  {
    icon: FileText,
    title: "Estudios de títulos",
    description: "Análisis legal completo para garantizar operaciones seguras y sin inconvenientes.",
  },
  {
    icon: Key,
    title: "Venta y alquiler",
    description: "Amplio portfolio de propiedades en venta y alquiler en las mejores ubicaciones.",
  },
  {
    icon: Users,
    title: "Asesoramiento personalizado",
    description: "Atención dedicada y profesional para encontrar la solución que mejor se adapte a vos.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Nuestros <span className="text-primary">servicios</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Ofrecemos una amplia gama de servicios inmobiliarios para acompañarte en cada paso de tu operación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 hover:scale-[1.02] bg-card">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/25 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-pretty">{service.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
