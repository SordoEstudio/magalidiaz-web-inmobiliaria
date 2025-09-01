import { HeroSearch } from "@/components/hero-search"
import { FeaturedProperties } from "@/components/featured-properties"
import { ServicesSection } from "@/components/services-section"
import { AboutContactSection } from "@/components/about-contact-section"
import { PromotionalBanner } from "@/components/promotional-banner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Search */}
      <HeroSearch />

      {/* Featured Properties */}
      <FeaturedProperties />

      {/* Services Section */}
      <ServicesSection />

      {/* About & Contact Split Section */}
      <AboutContactSection />

      {/* Promotional Banner */}
      <PromotionalBanner />

      {/* Minimal Footer */}
      <footer className="bg-muted/30 border-t border-border/50 py-8">
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
