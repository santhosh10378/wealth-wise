'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';

interface Props {
  name: string;
  control: Control<any>;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  description?: string;
}

export function CustomDateFormField({ control, disabled, label, name, placeholder }: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col gap-1.5 space-y-0'>
          <div className='flex items-center justify-between gap-2'>{label && <FormLabel className='text-xs'>{label}</FormLabel>}</div>

          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant={'outline'} className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                  {field.value ? format(field.value, 'PPP') : <span>{placeholder || 'Pick a date'}</span>}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0' align='center'>
              <Calendar mode='single' className='w-full' selected={field.value} onSelect={field.onChange} disabled={disabled} initialFocus />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
