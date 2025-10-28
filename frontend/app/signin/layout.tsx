import '@styles/global.scss';

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className='bg-red-500 text-text h-screen w-screen overflow-y-auto'>
        <div>{children}</div>
      </div>
    )
  }