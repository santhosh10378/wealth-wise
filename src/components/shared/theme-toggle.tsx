'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const changeTheme = () => setTheme(resolvedTheme === 'light' ? 'dark' : 'light');

  return (
    <Button
      variant='outline'
      size='icon'
      className='size-8 bg-transparent hover:bg-transparent border-yellow-500 dark:border-sky-500 text-yellow-500 dark:text-sky-500 hover:opacity-50 hover:text-yellow-500 hover:dark:text-sky-400'
      onClick={changeTheme}
    >
      <Sun className='dark:hidden size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='hidden dark:block size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
