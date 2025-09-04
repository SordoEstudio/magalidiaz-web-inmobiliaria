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

import dataForBanners from "@/public/data/banners.json"

export default function HomePage() {

  const { herobanners, cardbanners, minimalbanners, seasonalbanners, ctabanners } = dataForBanners
  return (
    <div className="min-h-screen bg-background">
      {/* Promotional Banner */}
      <PromotionalBanner />

      {/* Hero Section with Search */}
      <HeroSearch />

      {/* Featured Properties */}
{/*   VERSION CLASICA    
<FeaturedProperties />
 */}
 {/*   VERSION CAROUSEL    */}
       <FeaturedPropertiesCarousel />
 
{/*   VERSION CON PLACEHOLDER
<FeaturedPropertiesIntegrated />
 */}
      {/* Services Section */}
{/*       <ServicesSection />
<ServicesSectionV2 />

<ServicesSectionSimple /> */}
<BannerHero {...herobanners[2]} />
<BannerMinimal {...minimalbanners[0]} />
<BannerCard {...cardbanners[0]} />
<ServicesSectionHybrid />
      {/* About & Contact Split Section */}
      <AboutContactSection  />

      {/* Minimal Footer */}
<Footer />
    </div>
  )
}
