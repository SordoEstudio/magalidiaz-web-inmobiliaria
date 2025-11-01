import type { Metadata } from "next"
import { generatePropertiesListMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = generatePropertiesListMetadata()

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

