'use client';

import React from 'react';
import Link from 'next/link';
import { Control } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface Props {
  name: string;
  control: Control<any>;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'password';
  description?: string;
  forgotPasswordHref?: string;
}

export function CustomInputFormField({ control, disabled, label, name, placeholder, type = 'text', forgotPasswordHref }: Props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col gap-1.5 space-y-0'>
          <div className='flex items-center justify-between gap-2'>
            {label && <FormLabel className='text-xs'>{label}</FormLabel>}
            {forgotPasswordHref && type === 'password' && (
              <Link href={forgotPasswordHref} className='mt-1'>
                <button type='button' className='text-xs text-primary hover:underline'>
                  Forgot Password?
                </button>
              </Link>
            )}
          </div>

          <FormControl>
            <div className='relative'>
              <Input
                {...field}
                className='text-sm'
                type={showPassword && type === 'password' ? 'text' : type}
                placeholder={placeholder}
                disabled={disabled}
              />
              {type === 'password' && (
                <button
                  type='button'
                  onClick={handleTogglePassword}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
                </button>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
