'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import { useMobileSidebar } from '@/hooks/use-mobile-sidebar';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';

import { Sidebar } from './sidebar';

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const isOpen = useMobileSidebar((state) => state.isOpen);
  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);

  /* Prevents hydration error necessary when you work with zustand state management, modals or sheets. 
     In Next.js if you mark a component as 'use client' it doesn't mean it won't be renderd server side.
     Each component the FIRST iteration of it will be server side renderd. So what happens when you're using this
     modals, sheets and this type of components is that on the server side it has a specific State like closed and
     on the Client side it suddenly openend and that creates an Hydration Error. Because of the isMounted useState
     and this useEffect actually help: well one thing that you can do to guarantee that a specific component is only going
     to be rendered on the Client, so never on the server not even server side rendered is by using useEffect.
     Because useEffect will not run in that server side rendering iteration. So basically what we are telling this
     component is if this isMounted has NOT changed to true meaning that if we have never reached this initial useEffect
     we don't rendering anything because obviously this is still running on the server. But when it reaches this useEffect
     it changes it to TRUE and then we skip this and just render our component*/

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        className='block md:hidden mr-2'
        variant='ghost'
        size='sm'
      >
        <Menu className='h-4 w-4' />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side='left' className='p-2 pt-10'>
          <Sidebar storageKey='t-mobile-sidebar-state' />
        </SheetContent>
      </Sheet>
    </>
  );
};
