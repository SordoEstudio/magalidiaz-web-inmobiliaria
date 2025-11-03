"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface FloatingLogoProps {
  className?: string
}

export function FloatingLogo({ className }: FloatingLogoProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset
      
      // Obtener altura del viewport
      const viewportHeight = window.innerHeight
      
      // Mostrar logo cuando se pasa la altura del viewport (aproximadamente cuando el hero sale de vista)
      // El hero tiene min-h-[100vh] en móvil y min-h-[80vh] en desktop
      // Usamos un offset para que aparezca justo cuando el hero sale de vista
      const offset = 150 // Offset en píxeles para ajustar el momento de aparición
      setIsVisible(scrollPosition > viewportHeight - offset)
    }

    // Ejecutar al montar para verificar posición inicial
    handleScroll()

    // Agregar listener de scroll
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // También escuchar cambios de tamaño de ventana (responsive)
    window.addEventListener("resize", handleScroll, { passive: true })
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <Link
      href="/"
      className={cn(
        "fixed top-4 left-4 z-50 transition-all duration-300 ease-in-out",
        "hover:scale-105 active:scale-95",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none",
        className
      )}
      aria-label="Ir al inicio"
    >
      <div className="relative bg-background/95 backdrop-blur-md rounded-full p-2 shadow-lg border border-border/50 hover:shadow-xl transition-shadow">
        <Image
          src="/logo-lila.png"
          alt="Magali Diaz Asesor Inmobiliario"
          width={100}
          height={100}
          className="rounded-full"
          priority
        />
      </div>
    </Link>
  )
}

