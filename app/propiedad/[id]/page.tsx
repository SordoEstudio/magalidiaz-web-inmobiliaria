import { PropertyGallery } from "@/components/property-gallery"
import { PropertyInfo } from "@/components/property-info"
import { PropertyMap } from "@/components/property-map"
import { PropertyDescription } from "@/components/property-description"
import { PropertyAmenities } from "@/components/property-amenities"
import { PropertyContact } from "@/components/property-contact"

// Mock data - in production this would come from your database
const mockProperty = {
  id: "1",
  title: "Casa 3 dormitorios con piscina",
  address: "B° Centro, San Vicente, Buenos Aires",
  price: "$350.000",
  type: "venta" as const,
  images: [
    "/house-with-garden-and-pool.png",
    "/modern-apartment-exterior.png",
    "/two-story-townhouse-urban.png",
    "/placeholder-1ejfl.png",
    "/placeholder-0quu7.png",
    "/placeholder-z0zdt.png",
  ],
  features: {
    bedrooms: 3,
    bathrooms: 2,
    garage: 2,
    coveredArea: 120,
    totalArea: 250,
  },
  tags: ["Centro", "ConPiscina", "Estrenar", "Financiación"],
  description: `Hermosa casa de 3 dormitorios ubicada en el corazón de San Vicente. Esta propiedad cuenta con amplios espacios, diseño moderno y excelente ubicación.

La casa dispone de un living-comedor integrado con cocina equipada, 3 dormitorios (el principal en suite), 2 baños completos y un hermoso jardín con piscina.

Ideal para familias que buscan comodidad y tranquilidad sin alejarse del centro. A pocas cuadras de escuelas, comercios y transporte público.

La propiedad se entrega en excelente estado, lista para habitar. Posibilidad de financiación directa con el propietario.`,
  amenities: ["Pileta", "Jardín", "Parrilla", "Aire Acondicionado", "Cochera", "Seguridad", "WiFi", "Gimnasio"],
  coordinates: {
    lat: -34.6037,
    lng: -58.3816,
  },
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  // In production, fetch property data based on params.id
  const property = mockProperty

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* Property Info */}
            <PropertyInfo
              title={property.title}
              address={property.address}
              price={property.price}
              type={property.type}
              features={property.features}
              tags={property.tags}
            />

            {/* Map */}
            <PropertyMap address={property.address} coordinates={property.coordinates} />

            {/* Description */}
            <PropertyDescription description={property.description} />

            {/* Amenities */}
            <PropertyAmenities amenities={property.amenities} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <PropertyContact
              whatsappNumber="5491123456789"
              phoneNumber="+54 11 2345-6789"
              propertyTitle={property.title}
            />
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="bg-muted/30 border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">I</span>
              </div>
              <span className="font-semibold text-foreground">Inmobiliaria</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 Inmobiliaria. Todos los derechos reservados.</span>
              <a href="#" className="hover:text-foreground transition-colors">
                Políticas de privacidad
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
