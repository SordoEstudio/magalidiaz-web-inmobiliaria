"use client"

import { HeroSearch } from "@/components/hero-search"
import { AboutContactSection } from "@/components/about-contact-section"
import { PromotionalBanner } from "@/components/promotional-banner"
import { ServicesSectionHybrid } from "@/components/services-section-hybrid"
import { FeaturedPropertiesCarousel } from "@/components/featured-properties-carousel"
import { BannerHero } from "@/components/banner-hero"
import { BannerCard } from "@/components/banner-card"
import { FAQSimple } from "@/components/faq-simple"
import { DebugConfig } from "@/components/debug-config"
import { useFeaturedProperties } from "@/lib/hooks/useProperties"
import { usePageCMS } from "@/lib/hooks/usePageCMS"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const { featuredProperties, loading, error } = useFeaturedProperties()
  
      // Hook centralizado para datos CMS
      const { 
        aboutData, 
        contactData,
        servicesData, 
        faqData,
        promotionalBannerData,
        bannerCardData,
        bannerHeroData,
        loading: cmsLoading, 
        error: cmsError,
        hasAboutData,
        hasContactData,
        hasFaqData,
        hasPromotionalBannerData,
        hasBannerCardData,
        hasBannerHeroData
      } = usePageCMS()

  return (
    <div className="min-h-screen bg-background">
      {/* Promotional Banner - Con datos CMS */}
      {hasPromotionalBannerData && (
        <PromotionalBanner 
          data={promotionalBannerData}
          loading={cmsLoading}
          error={cmsError}
        />
      )}

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
        <FeaturedPropertiesCarousel />
      )}

      {/* Banner Card - Con datos CMS */}
      {hasBannerCardData && (
        <BannerCard 
          data={bannerCardData}
          loading={cmsLoading}
          error={cmsError}
        />
      )}

      {/* Services Section - Con datos CMS */}
      <ServicesSectionHybrid 
        data={servicesData}
        loading={cmsLoading}
        error={cmsError}
      />

      {/* Banner Hero - Con datos CMS */}
      {hasBannerHeroData && (
        <BannerHero 
          data={bannerHeroData}
          loading={cmsLoading}
          error={cmsError}
        />
      )}

      {/* FAQ Section - Con datos CMS */}
      {hasFaqData && (
        <FAQSimple 
          data={faqData}
          loading={cmsLoading}
          error={cmsError}
          showContactCTA={false} 
          variant="default" 
        />
      )}
      
      {/* About & Contact Split Section - Con datos CMS */}
      {(hasAboutData || hasContactData) && (
        <AboutContactSection 
          data={{ aboutData, contactData }}
          loading={cmsLoading}
          error={cmsError}
        />
      )}
      
      {/* Debug Config Component (solo en desarrollo) */}
      <DebugConfig />
    </div>
  )
}
