import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './_components/footer'
import AuthProvider from './_providers/auth'
import { Toaster } from './_components/ui/sonner'
import NoSsr from './_components/NoSsr'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fullstack Barber',
  description: 'Sistema de agendamento de barbearia'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          <NoSsr>
            {children}
            <Toaster />
            <Footer />
          </NoSsr>
        </AuthProvider>
      </body>
    </html>
  )
}
