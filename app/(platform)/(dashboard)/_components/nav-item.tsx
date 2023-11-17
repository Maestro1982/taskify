'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Activity, CreditCard, Layout, Settings } from 'lucide-react';

import { cn } from '@/lib/utils';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavItemProps {
  isActive: boolean;
  isExpanded: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isActive,
  isExpanded,
  organization,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: 'Boards',
      icon: <Layout className='w-4 h-4 mr-2' />,
      href: `/organization/${organization.id}/`,
    },
    {
      label: 'Activity',
      icon: <Activity className='w-4 h-4 mr-2' />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: 'Settings',
      icon: <Settings className='w-4 h-4 mr-2' />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: 'Billing',
      icon: <CreditCard className='w-4 h-4 mr-2' />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className='border-none'>
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 dark:hover:bg-[#292929] transition text-start no-underline hover:no-underline',
          isActive &&
            !isExpanded &&
            'bg-indigo-500/10 text-indigo-700 dark:bg-indigo-400/70'
        )}
      >
        <div className='flex items-center gap-x-2'>
          <div className='w-7 h-7 relative'>
            <Image
              src={organization.imageUrl}
              alt={organization.name}
              fill
              className='rounded-sm object-cover'
            />
          </div>
          <span className='font-medium text-sm dark:text-white'>
            {organization.name}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className='pt-1 text-neutral-700 dark:text-white'>
        {routes.map((route) => (
          <Button
            key={route.href}
            size='sm'
            onClick={() => onClick(route.href)}
            className={cn(
              'w-full font-normal justify-start pl-10 mb-1',
              pathname === route.href && 'bg-indigo-500/10 text-indigo-700'
            )}
            variant='ghost'
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
