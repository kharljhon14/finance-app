'use client';

import { useGetSummary } from '@/features/summary/hooks/api/use-get-summary';
import Chart from './chart';

export default function DataChart() {
  const { data, isLoading } = useGetSummary();

  console.log(data);

  if (isLoading) {
    return (
      <div>
        <h2>Loading</h2>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.days} />
      </div>
    </div>
  );
}
