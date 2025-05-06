import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/providers/ReduxProvider';
import { Suspense } from 'react';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { Loader } from '@/components/shared/loader';
import { Header } from '@/components/core/header';
import { Footer } from '@/components/core/footer';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Crypto Portfolio',
  description: 'Crypto Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto flex flex-col min-h-dvh`}
      >
        <ReduxProvider>
          <ReactQueryProvider>
            <Header />
            <main className='flex-1 container max-w-5xl mx-auto px-2'>
              <Suspense fallback={<Loader />}>{children}</Suspense>
            </main>
            <Footer />
            <Toaster />
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
