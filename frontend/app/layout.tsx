import '../src/scss/global.scss';

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" data-theme="dark">
        <body className='bg-background text-text'>
          <main>{children}</main>
        </body>
      </html>
    )
  }