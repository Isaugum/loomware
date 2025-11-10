import Sidebar from '@/components/modules/Sidebar/Sidebar';
import Providers from '@/core/providers/Providers';
import publicRoutes from '@/core/utils/publicRoutes';
import '@styles/global.scss';
import { NextRequest } from 'next/server';
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode,
  }) {
    return (
      <html lang="en" data-theme="dark">
        <body className='h-screen w-screen overflow-y-auto bg-background text-text-primary'>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    )
  }