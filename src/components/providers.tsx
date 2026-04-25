'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid rgba(245, 158, 11, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#f59e0b',
              secondary: '#1a1a2e',
            },
          },
        }}
      />
    </SessionProvider>
  )
}
