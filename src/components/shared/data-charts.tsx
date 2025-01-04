'use client';

import { useGetAllSummaries } from '@/hooks/use-get-all-summaries';
import { Chart, ChartLoading } from '../chart';
import { SpendingPie, SpendingPieLoading } from '../spending-pie';

export const DataCharts = () => {
  const { summaries, isSummariesLoading } = useGetAllSummaries();

  if (isSummariesLoading) {
    return (
      <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
        <div className='col-span-1 lg:col-span-3 xl:col-span-4'>
          <ChartLoading />
        </div>
        <div className='col-span-1 lg:col-span-3 xl:col-span-2'>
          <SpendingPieLoading />
        </div>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
      <div className='col-span-1 lg:col-span-3 xl:col-span-4'>
        <Chart data={summaries?.days} />
      </div>
      <div className='col-span-1 lg:col-span-3 xl:col-span-2'>
        <SpendingPie data={summaries?.categories} />
      </div>
    </div>
  );
};
