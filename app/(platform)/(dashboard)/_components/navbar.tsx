'use client';

import { Plus } from 'lucide-react';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <nav className='fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white dark:bg-[#292929] flex items-center'>
      {/* TODO: Mobile Sidebar */}
      <div className='flex items-center gap-x-4'>
        <div className='hidden md:flex'>
          <Logo />
        </div>
        <Button
          variant='primary'
          size='sm'
          className='rounded-sm hidden md:block h-auto py-1.5 px-2'
        >
          Create
        </Button>
        <Button
          variant='primary'
          size='sm'
          className='rounded-sm block md:hidden'
        >
          <Plus className='h-4 w-4' />
        </Button>
      </div>
      <div className='ml-auto flex items-center gap-x-2'>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl='/organization/:id'
          afterLeaveOrganizationUrl='/select-org'
          afterSelectOrganizationUrl='/organization/:id'
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            baseTheme: theme === 'dark' ? dark : undefined,
          }}
        />
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
            baseTheme: theme === 'dark' ? dark : undefined,
          }}
        />
      </div>
    </nav>
  );
};