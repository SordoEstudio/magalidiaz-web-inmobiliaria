import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function GaleryModalFullscreen({ isFullscreen, setIsFullscreen, images, title, currentIndex, prevImage, nextImage }: { isFullscreen: boolean, setIsFullscreen: (isFullscreen: boolean) => void, images: string[], title: string, currentIndex: number, prevImage: () => void, nextImage: () => void }) {
  return (


<Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
<DialogContent className=" w-[90%] h-[90%]  bg-black/50">
  <div className="relative w-full h-full flex items-center justify-center">
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
      onClick={() => setIsFullscreen(false)}
    >
      <X className="h-6 w-6" />
    </Button>

    <img
      src={images[currentIndex] || "/placeholder.svg"}
      alt={`${title} - Imagen ${currentIndex + 1}`}
      className="max-w-full max-h-full object-contain"
    />

    <Button
      variant="outline"
      size="icon"
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10 transition-all duration-200 hover:scale-105"
      onClick={prevImage}
    >
      <ChevronLeft className="h-6 w-6" />
    </Button>

    <Button
      variant="ghost"
      size="icon"
      className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
      onClick={nextImage}
    >
      <ChevronRight className="h-6 w-6" />
    </Button>
  </div>
</DialogContent>
</Dialog>
  )
}