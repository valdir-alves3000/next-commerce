import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from './components/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next E-Commerce 13',
  description: 'Site de comércio eletrônico desenvolvido com Next.js 13 e Tailwind CSS.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className='bg-slate-700 h-screen p-16'>
          {children}
        </main>
      </body>
    </html>
  )
}
