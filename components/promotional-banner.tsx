"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Megaphone } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { CMSFallback } from "@/components/cms-fallback"
import promotionalBannerDataFallback from "@/public/data/promotionalBannerDataCms.json"

interface PromotionalBannerProps {
  data?: any
  fallback?: any
  loading?: boolean
  error?: string | null
}

export function PromotionalBanner({ 
  data, 
  fallback, 
  loading = false, 
  error = null 
}: PromotionalBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  
  // Usar datos pasados como props o fallback
  const safeBannerData = data?.data || data || fallback || promotionalBannerDataFallback

  if (!isVisible) return null

  const handleCTAAction = () => {
    if (safeBannerData.btn_principal?.link_url) {
      if (safeBannerData.btn_principal.link_url.includes('wa.me')) {
        window.open(safeBannerData.btn_principal.link_url, '_blank')
      } else {
        window.location.href = safeBannerData.btn_principal.link_url
      }
    }
  }

  const getCTAIcon = () => {
    if (safeBannerData.btn_principal?.icon_btn === 'FaWhatsapp') {
      return <FaWhatsapp className="h-4 w-4" />
    }
    return <Megaphone className="h-4 w-4" />
  }

  return (
    <CMSFallback 
      fallbackData={safeBannerData}
      componentType="banner_promocional"
      isLoading={loading}
      error={error}
    >
      <div className="fixed top-0 left-0 w-full z-50 bg-background/90 border-y border-primary/20 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Megaphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {safeBannerData.txt_titulo}
                </p>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  {safeBannerData.txt_subtitulo}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                size="sm" 
                className="hidden sm:inline-flex bg-primary cursor-pointer"
                onClick={handleCTAAction}
              >
                {getCTAIcon()}
                <span className="ml-2">{safeBannerData.btn_principal?.txt_label}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="text-muted-foreground hover:text-foreground cursor-pointer hover:bg-transparent"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CMSFallback>
  )
}
