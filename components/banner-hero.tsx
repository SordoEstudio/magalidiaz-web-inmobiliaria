"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Phone, Check } from "lucide-react"
import Image from "next/image"

interface BannerHeroProps {
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
  overlay?: 'dark' | 'light' | 'gradient'
  alignment?: 'left' | 'center' | 'right'
}

export function BannerHero({
  image,
  title,
  subtitle,
  bulletPoints,
  text,
  cta,
  variant = 'primary',
  overlay = 'dark',
  alignment = 'center'
}: BannerHeroProps) {
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
        return 'from-secondary/40 via-secondary/20 to-background/90'
      case 'accent':
        return 'from-accent/40 via-accent/20 to-background/90'
      default:
        return 'from-primary/40 via-primary/20 to-background/90'
    }
  }

  const getOverlayClasses = () => {
    switch (overlay) {
      case 'dark':
        return 'bg-black/70'
      case 'light':
        return 'bg-white/60'
      default:
        return `bg-gradient-to-br ${getVariantClasses()}`
    }
  }

  const getAlignmentClasses = () => {
    switch (alignment) {
      case 'left':
        return 'text-left items-start'
      case 'right':
        return 'text-right items-end'
      default:
        return 'text-center items-center'
    }
  }

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center py-10">
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0">
          <Image 
            src={image} 
            alt={title || "Banner"} 
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
        <div className={`max-w-4xl mx-auto flex flex-col ${getAlignmentClasses()}`}>
          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg text-white/90 mb-4 font-medium drop-shadow-sm animate-fade-in-up">
              {subtitle}
            </p>
          )}

          {/* Title */}
          {title && (
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance drop-shadow-lg animate-fade-in-up animation-delay-200">
              {title}
            </h1>
          )}

          {/* Text */}
          {text && (
            <p className="text-xl text-white/90 mb-6 text-pretty leading-relaxed drop-shadow-sm max-w-2xl animate-fade-in-up animation-delay-400">
              {text}
            </p>
          )}

          {/* Bullet Points */}
          {bulletPoints && bulletPoints.length > 0 && (
            <div className="mb-8 animate-fade-in-up animation-delay-600">
              <ul className="space-y-3">
                {bulletPoints.map((point, index) => (
                  <li 
                    key={index} 
                    className="flex items-center gap-3 text-white/90 drop-shadow-sm animate-fade-in-left"
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="w-6 h-6 bg-primary/80 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Button */}
          {cta && (
            <div className="flex justify-center animate-fade-in-up animation-delay-1000">
              <Button 
                size="lg"
                onClick={() => handleCTAAction(cta.action, cta.type)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {cta.text}
                {getCTAIcon(cta.type)}
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
  )
}
