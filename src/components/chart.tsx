'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChartIcon, BarChart3Icon, BarChartIcon, FileSearchIcon, LineChartIcon, Loader2Icon } from 'lucide-react';
import { AreaVariant } from './area-variant';
import { BarVariant } from './bar-variant';
import { LineVariant } from './line-variant';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';

type Props = {
  data?: {
    date: Date;
    income: number;
    expenses: number;
  }[];
};

export const Chart = ({ data = [] }: Props) => {
  const [chartType, setChartType] = useState('area');

  const onTypeChange = (type: string) => {
    setChartType(type);
  };

  return (
    <Card className='border-0 drop-shadow-sm dark:border'>
      <CardHeader className='flex gap-2 lg:gap-0 lg:flex-row lg:items-center justify-between'>
        <CardTitle className='text-xl line-clamp-1'>Transactions</CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className='lg:w-auto h-9 rounded-md px-3'>
            <SelectValue placeholder='Chart type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='area'>
              <div className='flex items-center'>
                <AreaChartIcon className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Area Chart</p>
              </div>
            </SelectItem>
            <SelectItem value='bar'>
              <div className='flex items-center'>
                <BarChart3Icon className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Bar Chart</p>
              </div>
            </SelectItem>
            <SelectItem value='line'>
              <div className='flex items-center'>
                <LineChartIcon className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Line Chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <div className='flex flex-col gap-y-4 items-center justify-center h-[350px] w-full'>
            <FileSearchIcon className='size-6 text-muted-foreground' />
            <p className='text-muted-foreground text-sm'>No data for this period</p>
          </div>
        ) : (
          <>
            {chartType === 'line' && <LineVariant data={data} />}
            {chartType === 'area' && <AreaVariant data={data} />}
            {chartType === 'bar' && <BarVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const ChartLoading = () => {
  return (
    <Card className='border-0 drop-shadow-sm dark:border'>
      <CardHeader className='flex gap-2 lg:gap-0 lg:flex-row lg:items-center justify-between'>
        <Skeleton className='h-8 w-48' />
        <Skeleton className='h-8 w-full lg:w-[120px]' />
      </CardHeader>
      <CardContent>
        <div className='h-[350px] w-full flex items-center justify-center'>
          <Loader2Icon className='size-6 text-slate-300 animate-spin' />
        </div>
      </CardContent>
    </Card>
  );
};
