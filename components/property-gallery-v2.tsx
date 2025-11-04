"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
// url
interface PropertyGalleryProps {
  gallery: {url: string, alt: string}[]
  image: string
  title: string
  mode?: 'embedded' | 'fullscreen' | 'modal'
  className?: string
  showThumbnails?: boolean
  showCounter?: boolean
  showFullscreenButton?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function PropertyGallery({
  gallery=[],
  title,
  image,
  mode = 'embedded',
  className = '',
  showThumbnails = true,
  showCounter = true,
  showFullscreenButton = true,
  autoPlay = false,
  autoPlayInterval = 3000
}: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && gallery.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % gallery.length)
      }, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, gallery.length, autoPlayInterval])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isFullscreen || mode === 'fullscreen') {
        switch (e.key) {
          case 'ArrowLeft':
            prevImage()
            break
          case 'ArrowRight':
            nextImage()
            break
          case 'Escape':
            if (isFullscreen) setIsFullscreen(false)
            break
          case ' ':
            e.preventDefault()
            toggleAutoPlay()
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isFullscreen, mode])

  // Touch/swipe functionality
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) nextImage()
    if (isRightSwipe) prevImage()

    setTouchStart(null)
    setTouchEnd(null)
  }

  // Render navigation arrows
  const renderNavigationArrows = () => {
    if (gallery.length <= 1) return null

    return (
      <>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10 transition-all duration-200 hover:scale-105"
          onClick={prevImage}
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10 transition-all duration-200 hover:scale-105"
          onClick={nextImage}
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </>
    )
  }

  // Render fullscreen button
  const renderFullscreenButton = () => {
    if (!showFullscreenButton || mode === 'fullscreen') return null

    return (
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10 transition-all duration-200 hover:scale-105"
        onClick={() => setIsFullscreen(true)}
        aria-label="Ver en pantalla completa"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
    )
  }

  // Render image counter
  const renderImageCounter = () => {
    if (!showCounter || gallery.length <= 1) return null

    return (
      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium z-10">
        {currentIndex + 1} / {gallery.length}
      </div>
    )
  }

  // Render thumbnails
  const renderThumbnails = () => {
    if (!showThumbnails || gallery.length <= 1) return null

    return (
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {gallery.map((image, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200  ${
              index === currentIndex 
                ? "border-primary shadow-lg" 
                : "border-border hover:border-primary/50"
            }`}
            aria-label={`Ver imagen ${index + 1}`}
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              width={80}
              height={64}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    )
  }

  // Main gallery content
  const galleryContent = (
    <div 
      className={`relative w-full overflow-hidden bg-muted ${
        mode === 'fullscreen' ? 'h-screen' : 'rounded-lg h-[400px] md:h-[500px]'
      } ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src={gallery[currentIndex].url || "/placeholder.svg"}
        alt={`${title} - Imagen ${currentIndex + 1}`}
        fill
        className={`transition-all duration-300 ${
          mode === 'fullscreen' ? 'object-contain' : 'object-cover'
        }`}
        priority={currentIndex === 0 && mode === 'embedded'}
        loading={currentIndex === 0 && mode === 'embedded' ? undefined : 'lazy'}
        sizes={mode === 'fullscreen' ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
      />

      {renderNavigationArrows()}
      {renderFullscreenButton()}
      {renderImageCounter()}
    </div>
  )

  // Custom fullscreen modal
  const fullscreenModal = isFullscreen ? (
    <div className="fixed inset-0 z-50 bg-black/95 w-[100%] h-[100%]">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10 transition-all duration-200 hover:scale-105"
          onClick={() => setIsFullscreen(false)}
          aria-label="Cerrar galería"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Fullscreen image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={gallery[currentIndex].url || "/placeholder.svg"}
            alt={`${title} - Imagen ${currentIndex + 1}`}
            fill
            className="object-contain"
            loading="lazy"
            sizes="100vw"
          />
        </div>

        {/* Fullscreen navigation */}
          {gallery.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10 transition-all duration-200 hover:scale-105"
              onClick={prevImage}
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10 transition-all duration-200 hover:scale-105"
              onClick={nextImage}
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </>
        )}

        {/* Fullscreen counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium z-20">
          {currentIndex + 1} / {gallery.length}
        </div>
      </div>
    </div>
  ) : null

  // Return based on mode
  if (mode === 'fullscreen') {
    return galleryContent
  }

  return (
    <>
      {galleryContent}
      {renderThumbnails()}
      {fullscreenModal}
    </>
  )
}
