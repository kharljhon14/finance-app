import Header from '@/components/header';
import { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
