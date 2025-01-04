'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileSearchIcon, Loader2Icon, PieChartIcon, RadarIcon, TargetIcon } from 'lucide-react';

import { useState } from 'react';
import { RadialVariant } from './radial-variant';
import { RadarVariant } from './radar-variant';
import { PieVariant } from './pie-variant';
import { Skeleton } from './ui/skeleton';

type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};

export const SpendingPie = ({ data = [] }: Props) => {
  const [chartType, setChartType] = useState('pie');

  const onTypeChange = (type: string) => {
    setChartType(type);
  };

  return (
    <Card className='border-0 drop-shadow-sm dark:border'>
      <CardHeader className='flex gap-2 lg:gap-0 lg:flex-row lg:items-center justify-between'>
        <CardTitle className='text-xl line-clamp-1'>Categories</CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className='lg:w-auto h-9 rounded-md px-3'>
            <SelectValue placeholder='Chart type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='pie'>
              <div className='flex items-center'>
                <PieChartIcon className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Pie Chart</p>
              </div>
            </SelectItem>
            <SelectItem value='radar'>
              <div className='flex items-center'>
                <RadarIcon className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Radar Chart</p>
              </div>
            </SelectItem>
            <SelectItem value='radial'>
              <div className='flex items-center'>
                <TargetIcon className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Radial Chart</p>
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
            {chartType === 'pie' && <PieVariant data={data} />}
            {chartType === 'radar' && <RadarVariant data={data} />}
            {chartType === 'radial' && <RadialVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const SpendingPieLoading = () => {
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
