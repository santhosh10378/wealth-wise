'use client';

import { useSearchParams } from 'next/navigation';
import { formatDateRange } from '@/utils/number-utils';
import { useGetAllSummaries } from '@/hooks/use-get-all-summaries';

import { FaPiggyBank } from 'react-icons/fa';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { DataCard, DataCardLoading } from './data-card';

export const DataGrid = () => {
  const { summaries, isSummariesLoading } = useGetAllSummaries();

  const params = useSearchParams();

  const from = params.get('from') || undefined;
  const to = params.get('to') || undefined;

  const dateRangeLabel = formatDateRange({ from, to });

  if (isSummariesLoading) {
    return (
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
      <DataCard
        title='Remaining'
        value={summaries?.remainingAmount}
        percentageChange={summaries?.remainingChange}
        icon={FaPiggyBank}
        dateRange={dateRangeLabel}
        variant='default'
      />
      <DataCard
        title='Income'
        value={summaries?.incomeAmount}
        percentageChange={summaries?.incomeChange}
        icon={FaArrowTrendUp}
        dateRange={dateRangeLabel}
        variant='sucess'
      />
      <DataCard
        title='Expenses'
        value={summaries?.expensesAmount}
        percentageChange={summaries?.expensesChange}
        icon={FaArrowTrendDown}
        dateRange={dateRangeLabel}
        variant='danger'
      />
    </div>
  );
};
