"use client"

import { FAQSection } from "@/components/faq-section"
import { FAQExample } from "@/components/faq-example"
import { HeroSearch } from "@/components/hero-search"
import { FeaturedProperties } from "@/components/featured-properties"
import { ServicesSection } from "@/components/services-section"
import { AboutContactSection } from "@/components/about-contact-section"
import { PromotionalBanner } from "@/components/promotional-banner"
import { Footer } from "@/components/footer"
import { ServicesSectionV2 } from "@/components/services-section-v2"
import { ServicesSectionSimple } from "@/components/services-section-simple"
import { ServicesSectionHybrid } from "@/components/services-section-hybrid"
import { FeaturedPropertiesCarousel } from "@/components/featured-properties-carousel"
import { FeaturedPropertiesIntegrated } from "@/components/featured-properties-integrated"
import { FeaturedPropertiesPlaceholder } from "@/components/featured-properties-placeholder"
import { BannerHero } from "@/components/banner-hero"
import { BannerMinimal } from "@/components/banner-minimal"
import { BannerCard } from "@/components/banner-card"
import { FAQSimple } from "@/components/faq-simple"
import { useFeaturedProperties } from "@/lib/hooks/useProperties"
import { Loader2 } from "lucide-react"

import dataForBanners from "@/public/data/banners.json"

export default function HomePage() {
  const { featuredProperties, loading, error } = useFeaturedProperties()
  const { herobanners, cardbanners, minimalbanners, seasonalbanners, ctabanners } = dataForBanners

  return (
    <div className="min-h-screen bg-background">
      {/* Promotional Banner */}
      <PromotionalBanner />

      {/* Hero Section with Search */}
      <HeroSearch />

      {/* Featured Properties */}
      {loading ? (
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Cargando propiedades destacadas...</p>
          </div>
        </div>
      ) : error ? (
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4">
            <p className="text-destructive">Error al cargar propiedades destacadas: {error}</p>
            <p className="text-muted-foreground">Mostrando propiedades de ejemplo...</p>
            <FeaturedPropertiesCarousel />
          </div>
        </div>
      ) : (
        <FeaturedPropertiesCarousel properties={featuredProperties} />
      )}

      {/* Services Section */}
      <BannerHero {...herobanners[0]} />
      <BannerCard {...cardbanners[0]} />
      <BannerCard {...cardbanners[1]} />
      <BannerCard {...cardbanners[2]} />
      <BannerHero {...herobanners[1]} />

      <ServicesSectionHybrid />
      <BannerHero {...herobanners[2]} />

      <FAQSimple />
      
      {/* About & Contact Split Section */}
      <AboutContactSection />
    </div>
  )
}
