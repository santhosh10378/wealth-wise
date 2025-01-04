'use client';

import { SessionProvider } from 'next-auth/react';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { ModalProvider } from '@/components/providers/modal-provider';
import { Toaster } from '@/components/ui/sonner';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <QueryProvider>
            <ModalProvider />
            <Toaster position='top-center' />

            {children}
          </QueryProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};
