"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Phone, Check } from "lucide-react"
import Image from "next/image"

interface BannerMinimalProps {
  image?: string
  title?: string
  subtitle?: string
  bulletPoints?: string[]
  text?: string
  cta?: {
    text: string
    action: string
    type: 'link' | 'phone' | 'external'
  }
  variant?: 'primary' | 'secondary' | 'accent'
  layout?: 'horizontal' | 'vertical'
  backgroundColor?: 'transparent' | 'muted' | 'card'
}

export function BannerMinimal({
  image,
  title,
  subtitle,
  bulletPoints,
  text,
  cta,
  variant = 'primary',
  layout = 'horizontal',
  backgroundColor = 'muted'
}: BannerMinimalProps) {
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
    switch (variant) {
      case 'secondary':
        return 'text-primary border-primary/20'
      case 'accent':
        return 'text-primary border-primary/20'
      default:
        return 'text-primary border-primary/20'
    }
  }

  const getBackgroundClasses = () => {
    switch (backgroundColor) {
      case 'transparent':
        return 'bg-transparent'
      case 'card':
        return 'bg-card border border-border/50 rounded-2xl'
      default:
        return 'bg-muted/30 rounded-2xl'
    }
  }

  const getLayoutClasses = () => {
    return layout === 'vertical' 
      ? 'flex-col text-center items-center' 
      : 'flex-row text-left items-center'
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className={`${getBackgroundClasses()} p-8 lg:p-12 transition-all duration-300 hover:shadow-lg`}>
          <div className={`flex ${getLayoutClasses()} gap-6 lg:gap-8`}>
            {/* Image */}
            {image && (
              <div className={`relative flex-shrink-0 ${layout === 'vertical' ? 'w-24 h-24 mb-4' : 'w-20 h-20 lg:w-24 lg:h-24'}`}>
                <Image 
                  src={image} 
                  alt={title || "Banner"} 
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 space-y-4">
              {/* Subtitle */}
              {subtitle && (
                <p className={`font-semibold text-sm uppercase tracking-wide ${getVariantClasses()}`}>
                  {subtitle}
                </p>
              )}

              {/* Title */}
              {title && (
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">
                  {title}
                </h3>
              )}

              {/* Text */}
              {text && (
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  {text}
                </p>
              )}

              {/* Bullet Points */}
              {bulletPoints && bulletPoints.length > 0 && (
                <div>
                  <ul className={`space-y-2 ${layout === 'vertical' ? 'text-center' : 'text-left'}`}>
                    {bulletPoints.map((point, index) => (
                      <li key={index} className={`flex ${layout === 'vertical' ? 'justify-center' : 'justify-start'} items-start gap-2 text-foreground text-sm`}>
                        <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              {cta && (
                <div className={`pt-2 ${layout === 'vertical' ? 'flex justify-center' : 'flex justify-start'}`}>
                  <Button 
                    variant="outline"
                    onClick={() => handleCTAAction(cta.action, cta.type)}
                    className="border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 font-medium transition-all duration-300"
                  >
                    {cta.text}
                    {getCTAIcon(cta.type)}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 