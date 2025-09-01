import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MessageCircle, MapPin, Award, Clock } from "lucide-react"

export function AboutContactSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Section */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-4">
                Matrícula CUCICBA N° 12345
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                María <span className="text-primary">González</span>
              </h2>
              <p className="text-lg text-muted-foreground text-pretty mb-6">
                Con más de 10 años de experiencia en el mercado inmobiliario de Buenos Aires, me especializo en ayudar a
                familias y inversores a encontrar la propiedad perfecta. Mi compromiso es brindar un servicio
                personalizado y transparente en cada operación.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">+500</p>
                  <p className="text-sm text-muted-foreground">Operaciones</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">10+ años</p>
                  <p className="text-sm text-muted-foreground">Experiencia</p>
                </div>
              </div>
            </div>

            <Button size="lg" variant="outline">
              Conocé más sobre mí
            </Button>
          </div>

          {/* Contact Section */}
          <div>
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-6 text-center">Contacto directo</h3>

                <div className="space-y-4">
                  <Button size="lg" className="w-full justify-start gap-3 h-14">
                    <MessageCircle className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-sm opacity-90">+54 11 1234-5678</p>
                    </div>
                  </Button>

                  <Button size="lg" variant="outline" className="w-full justify-start gap-3 h-14 bg-transparent">
                    <Phone className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-semibold">Teléfono</p>
                      <p className="text-sm text-muted-foreground">+54 11 1234-5678</p>
                    </div>
                  </Button>

                  <Button size="lg" variant="outline" className="w-full justify-start gap-3 h-14 bg-transparent">
                    <Mail className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-muted-foreground">maria@inmobiliaria.com</p>
                    </div>
                  </Button>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Oficina</p>
                      <p className="text-sm text-muted-foreground">
                        Av. Corrientes 1234, CABA
                        <br />
                        Lunes a Viernes 9:00 - 18:00
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
