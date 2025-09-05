"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ExternalLink, Phone, Check } from "lucide-react"
import Image from "next/image"

interface BannerCardProps {
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
  imagePosition?: 'left' | 'right'
  size?: 'small' | 'medium' | 'large'
}

export function BannerCard({
  image,
  title,
  subtitle,
  bulletPoints,
  text,
  cta,
  variant = 'primary',
  imagePosition = 'left',
  size = 'medium'
}: BannerCardProps) {
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
        return 'from-secondary/10 to-secondary/5 border-secondary/20'
      case 'accent':
        return 'from-accent/10 to-accent/5 border-accent/20'
      default:
        return 'from-primary/10 to-primary/5 border-primary/20'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'py-8'
      case 'large':
        return 'py-20'
      default:
        return 'py-16'
    }
  }

  const getImageClasses = () => {
    return imagePosition === 'right' 
      ? 'lg:flex-row-reverse' 
      : 'lg:flex-row'
  }

  return (
    <section className={`${getSizeClasses()} bg-gradient-to-b from-background to-muted/20`}>
      <div className="container mx-auto px-4">
        <Card className={`overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br ${getVariantClasses()} px-4`}>
          <CardContent className="p-0">
            <div className={`flex flex-col ${getImageClasses()} items-center min-h-[400px]`}>
              {/* Image Section */}
              {image && (
                <div className="w-full lg:w-1/2 relative h-64 lg:h-full lg:min-h-[400px]">
                  <Image 
                    src={image} 
                    alt={title || "Banner"} 
                    fill
                    className="object-cover rounded-lg"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}

              {/* Content Section */}
              <div className={`w-full ${image ? 'lg:w-1/2' : 'lg:w-full'} p-8 lg:p-12 flex flex-col justify-center`}>
                {/* Subtitle */}
                {subtitle && (
                  <p className="text-primary font-semibold mb-3 uppercase text-sm tracking-wide">
                    {subtitle}
                  </p>
                )}

                {/* Title */}
                {title && (
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                    {title}
                  </h2>
                )}

                {/* Text */}
                {text && (
                  <p className="text-lg text-muted-foreground mb-6 text-pretty leading-relaxed">
                    {text}
                  </p>
                )}

                {/* Bullet Points */}
                {bulletPoints && bulletPoints.length > 0 && (
                  <div className="mb-8">
                    <ul className="space-y-3">
                      {bulletPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-3 text-foreground">
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-base">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                {cta && (
                  <div className="flex justify-start">
                    <Button 
                      size="lg"
                      onClick={() => handleCTAAction(cta.action, cta.type)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {cta.text}
                      {getCTAIcon(cta.type)}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
} 