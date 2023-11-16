import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './Providers';
import { ReduxProviders } from '@/redux/Providers';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/SideBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rich Dad',
  description: 'Rich Dad',
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
          <ReduxProviders>
            <NavBar/>
            <Sidebar/>
            {children}
          </ReduxProviders>
        </Providers>
      </body>
    </html>
  )
}
