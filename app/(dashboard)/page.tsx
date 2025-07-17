'use client';

import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';

export default function DashboardPage() {
  const accountsQuery = useGetAccounts();

  return (
    <div>
      <h1>Dashboard</h1>

      {accountsQuery.data?.map((account) => (
        <div key={account.id}>{account.name}</div>
      ))}
    </div>
  );
}
