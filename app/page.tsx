import { HeroSearch } from "@/components/hero-search"
import { FeaturedProperties } from "@/components/featured-properties"
import { ServicesSection } from "@/components/services-section"
import { AboutContactSection } from "@/components/about-contact-section"
import { PromotionalBanner } from "@/components/promotional-banner"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Promotional Banner */}
      <PromotionalBanner />

      {/* Hero Section with Search */}
      <HeroSearch />

      {/* Featured Properties */}
      <FeaturedProperties />

      {/* Services Section */}
      <ServicesSection />

      {/* About & Contact Split Section */}
      <AboutContactSection  />

      {/* Minimal Footer */}
<Footer />
    </div>
  )
}
