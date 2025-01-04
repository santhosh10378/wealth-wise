import { Logo } from '@/components/layouts/logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen flex flex-col w-full max-w-screen-2xl mx-auto px-4'>
      <header className='flex items-center justify-between py-4'>
        <Logo />
        <ThemeToggle />
      </header>

      <main className='flex-[1] w-full flex items-center justify-center'>{children}</main>
    </div>
  );
}
