'use client';

import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

const PlatformLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  );
};
export default PlatformLayout;
