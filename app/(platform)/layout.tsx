'use client';

import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

const PlatformLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
      }}
    >
      <Toaster richColors />
      {children}
    </ClerkProvider>
  );
};
export default PlatformLayout;
