import { Logo } from '@/components/layouts/logo';
import { HeaderNavigation } from '@/components/layouts/header-navigation';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { UserButton } from '@/features/user/components/user-button';
import { WelcomeMessage } from '@/components/layouts/welcome-messages';
import { Filters } from '../filters';

export const Header = () => {
  return (
    <header className='bg-gradient-to-b from-blue-700 to-blue-500 px-4 lg:px-14 py-8 pb-36'>
      <div className='max-w-screen-2xl mx-auto'>
        <div className='w-full flex items-center justify-between gap-4 mb-14'>
          <div className='flex items-center gap-10'>
            <div className='hidden lg:block text-white'>
              <Logo />
            </div>
            <HeaderNavigation />
          </div>

          <div className='flex items-center gap-3'>
            <ThemeToggle />
            <UserButton />
          </div>
        </div>

        <WelcomeMessage />
        <Filters />
      </div>
    </header>
  );
};
