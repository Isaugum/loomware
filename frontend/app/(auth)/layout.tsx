import '@styles/global.scss';

export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className='bg-red-500 h-full w-full'>
        {children}
      </main>
    )
  }