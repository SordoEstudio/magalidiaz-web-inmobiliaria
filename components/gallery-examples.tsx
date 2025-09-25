"use client"

import { PropertyGallery } from "@/components/property-gallery-v2"

// Datos de ejemplo
const sampleImages = [
  "/modern-apartment-exterior.png",
  "/house-with-garden-and-pool.png",
  "/luxury-apartment-building-modern.png",
  "/modern-studio-apartment.png",
  "/two-story-townhouse-urban.png"
]

export function GalleryExamples() {
  return (
    <div className="space-y-12 py-16">
      {/* Galería embebida estándar */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Galería Embebida Estándar</h2>
        <PropertyGallery
          images={sampleImages}
          title="Propiedad de ejemplo"
          mode="embedded"
          showThumbnails={true}
          showCounter={true}
          showFullscreenButton={true}
        />
      </section>

      {/* Galería compacta sin thumbnails */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Galería Compacta</h2>
        <PropertyGallery
          images={sampleImages}
          title="Propiedad compacta"
          mode="embedded"
          showThumbnails={false}
          showCounter={true}
          showFullscreenButton={true}
          className="h-[300px]"
        />
      </section>

      {/* Galería con auto-play */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Galería con Auto-play</h2>
        <PropertyGallery
          images={sampleImages}
          title="Propiedad con slideshow"
          mode="embedded"
          showThumbnails={true}
          showCounter={true}
          showFullscreenButton={true}
          autoPlay={true}
          autoPlayInterval={2000}
        />
      </section>

      {/* Galería minimalista */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Galería Minimalista</h2>
        <PropertyGallery
          images={sampleImages}
          title="Propiedad minimalista"
          mode="embedded"
          showThumbnails={false}
          showCounter={false}
          showFullscreenButton={true}
          className="h-[250px]"
        />
      </section>
    </div>
  )
}

// Componente para usar en páginas de propiedades
export function PropertyGalleryEmbedded({ 
  images, 
  title, 
  autoPlay = false 
}: { 
  images: string[]
  title: string
  autoPlay?: boolean 
}) {
  return (
    <PropertyGallery
      images={images}
      title={title}
      mode="embedded"
      showThumbnails={true}
      showCounter={true}
      showFullscreenButton={true}
      autoPlay={autoPlay}
      autoPlayInterval={3000}
    />
  )
}

// Componente para usar en cards de propiedades
export function PropertyGalleryCompact({ 
  images, 
  title 
}: { 
  images: string[]
  title: string 
}) {
  return (
    <PropertyGallery
      images={images}
      title={title}
      mode="embedded"
      showThumbnails={false}
      showCounter={true}
      showFullscreenButton={true}
      className="h-[200px]"
    />
  )
}

// Componente para página dedicada de galería
export function PropertyGalleryFullscreen({ 
  images, 
  title 
}: { 
  images: string[]
  title: string 
}) {
  return (
    <PropertyGallery
      images={images}
      title={title}
      mode="fullscreen"
      showThumbnails={true}
      showCounter={true}
      showFullscreenButton={false}
    />
  )
}
