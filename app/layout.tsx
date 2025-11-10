import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PassaPay - Cross-border payments for artists',
  description: 'Enable artists to receive instant, low-cost cross-border payments through blockchain technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
