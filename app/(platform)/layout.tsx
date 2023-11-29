'use client';

import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

import { ModalProvider } from '@/components/providers/modal-provider';
import { QueryProvider } from '@/components/providers/query-provider';

const PlatformLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
      }}
    >
      <QueryProvider>
        <Toaster richColors />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};
export default PlatformLayout;
