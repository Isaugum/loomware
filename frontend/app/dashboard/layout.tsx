import Sidebar from '@/components/modules/Sidebar/Sidebar';
import '@styles/global.scss';

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className='h-full w-full'>
        <Sidebar />
        {children}
      </main>
    )
  }