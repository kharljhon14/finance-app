import Header from '@/components/header';
import { PropsWithChildren, Suspense } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Suspense>
        <main>{children}</main>
      </Suspense>
    </>
  );
}
