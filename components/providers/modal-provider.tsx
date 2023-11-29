'use client';

import { useEffect, useState } from 'react';

import { CardModal } from '@/components/modals/card-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Prevents the hydration error
  useEffect(() => {
    setIsMounted(true);
  });

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />
    </>
  );
};
