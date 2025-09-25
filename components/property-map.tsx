"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface PropertyMapProps {
  address: string
  addressLink: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export function PropertyMap({ address, coordinates, addressLink }: PropertyMapProps) {
  // For demo purposes, using a static map image
  // In production, you would integrate with Google Maps or similar
  const mapUrl = coordinates
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=15&size=600x300&markers=color:red%7C${coordinates.lat},${coordinates.lng}&key=YOUR_API_KEY`
    : <iframe src={addressLink} width="600" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Ubicación
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full h-[300px] overflow-hidden rounded-b-lg">
        <iframe src={addressLink} width="600" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-white font-medium">{address}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
