"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ExternalLink, Phone, Check } from "lucide-react"
import Image from "next/image"
import { useCMSData } from "@/lib/hooks/useCMSData"
import { CMSFallback } from "@/components/cms-fallback"
import bannerCardDataFallback from "@/public/data/bannerCardDataCms.json"

interface BannerCardProps {
  // Props para CMS
  data?: any
  fallback?: any
  loading?: boolean
  error?: string | null
}

export function BannerCard({
  // Props para CMS
  data,
  fallback,
  loading: propLoading,
  error: propError
}: BannerCardProps) {
  // Obtener datos del CMS de forma simplificada
  const { data: bannerData, loading: hookLoading, error: hookError, isFromCMS } = useCMSData(
    'banner_card_component',
    bannerCardDataFallback  
  )
  
  // Usar datos pasados como props o del hook
  const finalData = data || bannerData || bannerCardDataFallback
  const finalLoading = propLoading !== undefined ? propLoading : hookLoading
  const finalError = propError !== undefined ? propError : hookError
  const safeBannerData = finalData?.data || finalData || bannerCardDataFallback
  
  const finalImage = safeBannerData.img_principal
  const finalTitle = safeBannerData.txt_titulo
  const finalSubtitle = safeBannerData.txt_subtitulo
  const finalText = safeBannerData.txt_descripcion
  const finalBulletPoints = safeBannerData.lista_beneficios || []
  const finalCta = {
    text: safeBannerData.btn_principal?.txt_label || 'Ver más',
    action: safeBannerData.btn_principal?.link_url || '#',
    type: 'link' as const
  }
  const finalVariant = safeBannerData._configuracion?.variant || 'primary'
  const finalImagePosition = safeBannerData._configuracion?.imagePosition || 'left'
  const finalSize = safeBannerData._configuracion?.size || 'medium'
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
        return 'from-secondary/10 to-secondary/5 border-secondary/20'
      case 'accent':
        return 'from-accent/10 to-accent/5 border-accent/20'
      default:
        return 'from-primary/10 to-primary/5 border-primary/20'
    }
  }

  const getSizeClasses = () => {
    switch (finalSize) {
      case 'small':
        return 'py-8'
      case 'large':
        return 'py-20'
      default:
        return 'py-16'
    }
  }

  const getImageClasses = () => {
    return finalImagePosition === 'right' 
      ? 'lg:flex-row-reverse' 
      : 'lg:flex-row'
  }

  return (
    <CMSFallback 
      fallbackData={safeBannerData}
      componentType="banner_card_component"
      isLoading={finalLoading}
      error={finalError}
    >
      <section className={`${getSizeClasses()} bg-gradient-to-b from-background to-muted/20`}>
        <div className="container mx-auto px-4">
{/*           {isFromCMS && (
            <div className="text-xs text-green-600 mb-2 text-center">
              ✓ Datos desde CMS
            </div>
          )} */}
          <Card className={`overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br ${getVariantClasses()} px-4`}>
            <CardContent className="p-0">
              <div className={`flex flex-col ${getImageClasses()} items-center min-h-[400px]`}>
                {/* Image Section */}
                {finalImage && (
                  <div className="w-full lg:w-1/2 relative h-64 lg:h-full lg:min-h-[400px]">
                    <Image 
                      src={finalImage} 
                      alt={finalTitle || "Banner"} 
                      fill
                      className="object-cover rounded-lg"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                )}

                {/* Content Section */}
                <div className={`w-full ${finalImage ? 'lg:w-1/2' : 'lg:w-full'} p-8 lg:p-12 flex flex-col justify-center`}>
                  {/* Subtitle */}
                  {finalSubtitle && (
                    <p className="text-primary font-semibold mb-3 uppercase text-sm tracking-wide">
                      {finalSubtitle}
                    </p>
                  )}

                  {/* Title */}
                  {finalTitle && (
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                      {finalTitle}
                    </h2>
                  )}

                  {/* Text */}
                  {finalText && (
                    <p className="text-lg text-muted-foreground mb-6 text-pretty leading-relaxed">
                      {finalText}
                    </p>
                  )}

                  {/* Bullet Points */}
                  {finalBulletPoints && finalBulletPoints.length > 0 && (
                    <div className="mb-8">
                      <ul className="space-y-3">
                        {finalBulletPoints.map((point: any, index: number) => (
                          <li key={point?.id} className="flex items-start gap-3 text-foreground">
                            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-base">{point?.txt_beneficio}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA Button */}
                  {finalCta && (
                    <div className="flex justify-start">
                      <Button 
                        size="lg"
                        onClick={() => handleCTAAction(finalCta.action, finalCta.type)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        {finalCta.text}
                        {getCTAIcon(finalCta.type)}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </CMSFallback>
  )
} 