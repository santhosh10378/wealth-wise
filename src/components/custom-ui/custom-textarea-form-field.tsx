'use client';

import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  name: string;
  control: Control<any>;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  description?: string;
}

export function CustomTextAreaFormField({ control, disabled, label, name, placeholder }: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col gap-1.5 space-y-0'>
          <div className='flex items-center justify-between gap-2'>{label && <FormLabel className='text-xs'>{label}</FormLabel>}</div>

          <FormControl>
            <div className='relative'>
              <Textarea {...field} className='text-sm' placeholder={placeholder} disabled={disabled} />
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
