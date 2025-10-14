"use client"

import { createContext, useContext, ReactNode } from 'react'
import { useCMSComponents } from '@/lib/hooks/useCMSComponents'
import aboutDataFallback from '@/public/data/aboutDataCms.json'

interface AboutContextType {
  aboutData: any
  loading: boolean
  error: string | null
  hasAboutData: boolean
}

const AboutContext = createContext<AboutContextType | undefined>(undefined)

export function AboutProvider({ children }: { children: ReactNode }) {
  const { getComponentByType, loading, error } = useCMSComponents()
  const aboutData = getComponentByType('about_component')
  
  const value = {
    aboutData: aboutData?.data || aboutDataFallback,
    loading,
    error,
    hasAboutData: !!aboutData
  }

  return (
    <AboutContext.Provider value={value}>
      {children}
    </AboutContext.Provider>
  )
}

export function useAbout() {
  const context = useContext(AboutContext)
  if (context === undefined) {
    throw new Error('useAbout must be used within an AboutProvider')
  }
  return context
}
