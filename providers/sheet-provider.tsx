'use client';

import NewAccountSheet from '@/features/accounts/components/new-account-sheet';
import { useEffect, useState } from 'react';

export default function SheetProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <NewAccountSheet />
    </>
  );
}
