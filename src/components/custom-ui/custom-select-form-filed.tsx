'use client';

import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  name: string;
  control: Control<any>;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export function CustomSelectFormField({ control, disabled, label, name, placeholder, options }: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col gap-1.5 space-y-0'>
          {label && <FormLabel className='text-xs'>{label}</FormLabel>}

          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
            <FormControl>
              <SelectTrigger className='w-full text-sm'>
                <SelectValue placeholder={placeholder || 'Select an option'} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className='text-sm'>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
