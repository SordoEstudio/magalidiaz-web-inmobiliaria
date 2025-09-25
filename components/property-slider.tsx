import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PropertySlider({ images }: { images: { url: string; alt: string }[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const nextImage = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };
  
    const prevImage = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };
  
    return (
      <div className="relative w-full h-48 overflow-hidden rounded-md bg-muted">
        <img
          src={images[currentIndex]?.url || "/placeholder.svg"}
          alt={images[currentIndex]?.alt || "Imagen de propiedad"}
          className="w-full h-48 object-cover transition-all duration-300"
        />
  
        {/* Flecha izquierda */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 hidden group-hover:block"
          onClick={prevImage}
          tabIndex={-1}
        >
          <ChevronLeft className="h-4 w-4 mx-auto" />
        </Button>
  
        {/* Flecha derecha */}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 hidden group-hover:block"
          onClick={nextImage}
          tabIndex={-1}
        >
          <ChevronRight className="h-4 w-4 mx-auto" />
        </Button>
  
        {/* Indicadores */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full ${idx === currentIndex ? "bg-primary" : "bg-muted-foreground/40"} border border-border`}
              onClick={e => { e.stopPropagation(); setCurrentIndex(idx); }}
              aria-label={`Ver imagen ${idx + 1}`}
              tabIndex={-1}
              type="button"
            />
          ))}
        </div>
      </div>
    );
  }