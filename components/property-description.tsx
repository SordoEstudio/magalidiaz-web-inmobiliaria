import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

interface PropertyDescriptionProps {
  description: string
}

export function PropertyDescription({ description }: PropertyDescriptionProps) {
  // Split description into paragraphs for better readability
  const paragraphs = description.split("\n").filter((p) => p.trim())

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Descripción
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-gray max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
