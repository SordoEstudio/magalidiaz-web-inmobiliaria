"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Phone, Check } from "lucide-react"
import Image from "next/image"
import { useCMSData } from "@/lib/hooks/useCMSData"
import { CMSFallback } from "@/components/cms-fallback"
import bannerHeroDataFallback from "@/public/data/bannerHeroDataCms.json"

interface BannerHeroProps {
  // Props para CMS
  data?: any
  fallback?: any
  loading?: boolean
  error?: string | null
}

export function BannerHero({
  // Props para CMS
  data,
  fallback,
  loading: propLoading,
  error: propError
}: BannerHeroProps) {
  // Obtener datos del CMS de forma simplificada
  const { data: bannerData, loading: hookLoading, error: hookError, isFromCMS } = useCMSData(
    'banner_hero_component',
    bannerHeroDataFallback  
  )
  
  // Usar datos pasados como props o del hook
  const finalData = data || bannerData || bannerHeroDataFallback
  const finalLoading = propLoading !== undefined ? propLoading : hookLoading
  const finalError = propError !== undefined ? propError : hookError
  const safeBannerData = finalData?.data || finalData || bannerHeroDataFallback
  
  const finalImage = safeBannerData.img_fondo
  const finalTitle = safeBannerData.txt_titulo
  const finalSubtitle = safeBannerData.txt_subtitulo
  const finalText = safeBannerData.txt_descripcion
  const finalBulletPoints = safeBannerData.lista_beneficios || []
  const finalCta = {
    text: safeBannerData.btn_principal?.txt_label || 'Comenzar',
    action: safeBannerData.btn_principal?.link_url || '#',
    type: 'link' as const
  }
  const finalVariant = safeBannerData._configuracion?.variant || 'primary'
  const finalOverlay = safeBannerData._configuracion?.overlay || 'dark'
  const finalAlignment = safeBannerData._configuracion?.alignment || 'center'
  const handleCTAAction = (action: string, type: string) => {
    switch (type) {
      case 'phone':
        window.location.href = action
        break
      case 'external':
        window.open(action, '_blank')
        break
      case 'link':
        window.location.href = action
        break
    }
  }

  const getCTAIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return <Phone className="w-4 h-4" />
      case 'external':
        return <ExternalLink className="w-4 h-4" />
      case 'link':
        return <ArrowRight className="w-4 h-4" />
      default:
        return <ArrowRight className="w-4 h-4" />
    }
  }

  const getVariantClasses = () => {
    switch (finalVariant) {
      case 'secondary':
        return 'from-secondary/40 via-secondary/20 to-background/90'
      case 'accent':
        return 'from-accent/40 via-accent/20 to-background/90'
      default:
        return 'from-primary/40 via-primary/20 to-background/90'
    }
  }

  const getOverlayClasses = () => {
    switch (finalOverlay) {
      case 'dark':
        return 'bg-black/70'
      case 'light':
        return 'bg-white/60'
      default:
        return `bg-gradient-to-br ${getVariantClasses()}`
    }
  }

  const getAlignmentClasses = () => {
    switch (finalAlignment) {
      case 'left':
        return 'text-left items-start'
      case 'right':
        return 'text-right items-end'
      default:
        return 'text-center items-center'
    }
  }

  return (
    <CMSFallback 
      fallbackData={safeBannerData}
      componentType="banner_hero_component"
      isLoading={finalLoading}
      error={finalError}
    >
      <section className="relative min-h-[60vh] flex items-center justify-center py-10">
        {/* Background Image */}
        {finalImage && (
          <div className="absolute inset-0">
            <Image 
              src={finalImage} 
              alt={finalTitle || "Banner"} 
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>
        )}

        {/* Overlay */}
        <div className={`absolute inset-0 ${getOverlayClasses()}`} />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
{/*           {(isFromCMS || data) && (
            <div className="text-xs text-green-300 mb-2 text-center">
              ✓ Datos desde CMS
            </div>
          )} */}
          <div className={`max-w-4xl mx-auto flex flex-col ${getAlignmentClasses()}`}>
            {/* Subtitle */}
            {finalSubtitle && (
              <p className="text-lg text-white/90 mb-4 font-medium drop-shadow-sm animate-fade-in-up">
                {finalSubtitle}
              </p>
            )}

            {/* Title */}
            {finalTitle && (
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance drop-shadow-lg animate-fade-in-up animation-delay-200">
                {finalTitle}
              </h1>
            )}

            {/* Text */}
            {finalText && (
              <p className="text-xl text-white/90 mb-6 text-pretty leading-relaxed drop-shadow-sm max-w-2xl animate-fade-in-up animation-delay-400">
                {finalText}
              </p>
            )}

            {/* Bullet Points */}
            {finalBulletPoints && finalBulletPoints.length > 0 && (
              <div className="mb-8 animate-fade-in-up animation-delay-600">
                <ul className="space-y-3">
                  {finalBulletPoints.map((point: string, index: number) => (
                    <li 
                      key={point?.id} 
                      className="flex items-center gap-3 text-white/90 drop-shadow-sm animate-fade-in-left"
                      style={{ animationDelay: `${800 + index * 100}ms` }}
                    >
                      <div className="w-6 h-6 bg-primary/80 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg">{point?.txt_beneficio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Button */}
            {finalCta && (
              <div className="flex justify-center animate-fade-in-up animation-delay-1000">
                <Button 
                  size="lg"
                  onClick={() => handleCTAAction(finalCta.action, finalCta.type)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  {finalCta.text}
                  {getCTAIcon(finalCta.type)}
                </Button>
              </div>
            )}
          </div>
        </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
    </CMSFallback>
  )
}
