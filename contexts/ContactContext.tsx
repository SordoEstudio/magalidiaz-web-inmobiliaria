"use client"

import { createContext, useContext, ReactNode } from 'react'
import { useCMSComponents } from '@/lib/hooks/useCMSComponents'
import contactDataFallback from '@/public/data/contactDataCms.json'

interface ContactContextType {
  contactData: any
  loading: boolean
  error: string | null
  hasContactData: boolean
}

const ContactContext = createContext<ContactContextType | undefined>(undefined)

export function ContactProvider({ children }: { children: ReactNode }) {
  const { getComponentByType, loading, error } = useCMSComponents()
  const contactData = getComponentByType('contact_info')
  
  const value = {
    contactData: contactData?.data || contactDataFallback,
    loading,
    error,
    hasContactData: !!contactData
  }

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  )
}

export function useContact() {
  const context = useContext(ContactContext)
  if (context === undefined) {
    throw new Error('useContact must be used within a ContactProvider')
  }
  return context
}
