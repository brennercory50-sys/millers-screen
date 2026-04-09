'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'
import { QueryProvider } from './query-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>
        {children}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--panel)',
              border: '1px solid var(--line)',
              color: 'var(--text-primary)',
            },
          }}
        />
      </QueryProvider>
    </SessionProvider>
  )
}
