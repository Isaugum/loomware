import '@styles/global.scss';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="bg-background h-full w-full">{children}</main>;
}
