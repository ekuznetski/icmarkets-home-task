import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ReduxProvider } from '@/providers/ReduxProvider'
import { Suspense } from 'react'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import Header from '@/components/Header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Crypto Portfolio',
  description: 'Crypto Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <ReactQueryProvider>
            <Suspense fallback={<div className="p-8 text-center">Загрузка...</div>}>
              <Header />
              {children}
            </Suspense>
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
