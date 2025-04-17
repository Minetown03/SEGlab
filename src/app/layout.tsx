import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SEGlab - Revolutionizing Market Segmentation',
  description: 'SEGlab transforms how businesses understand and connect with their customers through innovative market segmentation and customer lifetime value optimization.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 