"use client"

import { ReactNode } from 'react'
import { ContactProvider } from './ContactContext'
import { AboutProvider } from './AboutContext'

export function CMSProvider({ children }: { children: ReactNode }) {
  return (
    <ContactProvider>
      <AboutProvider>
        {children}
      </AboutProvider>
    </ContactProvider>
  )
}
