'use client';

import CurrencyInput from 'react-currency-input-field';
import { InfoIcon, MinusCircleIcon, PlusCircleIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const AmountInput = ({ onChange, value, disabled, placeholder }: Props) => {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = () => {
    if (!value) return;

    const newValue = parseFloat(value) * -1;
    onChange(newValue.toString());
  };

  return (
    <div className='relative'>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type='button'
              onClick={onReverseValue}
              className={cn(
                'bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition',
                isIncome && 'bg-emerald-500 hover:bg-emerald-600',
                isExpense && 'bg-rose-500 hover:bg-rose-600'
              )}
            >
              {!parsedValue && <InfoIcon className='size-3  text-white' />}
              {isIncome && <PlusCircleIcon className='size-3  text-white' />}
              {isExpense && <MinusCircleIcon className='size-3  text-white' />}
            </button>
          </TooltipTrigger>
          <TooltipContent side='bottom' align='start'>
            Use [+] for income and [-] for expense
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        prefix='₹'
        placeholder={placeholder}
        value={value.toString()}
        decimalsLimit={2}
        decimalScale={2}
        onValueChange={onChange}
        disabled={disabled}
        className='pl-10 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
      />
      <p className='text-xs text-muted-foreground mt-2'>
        {isIncome && 'This will count as income'}
        {isExpense && 'This will count as expense'}
      </p>
    </div>
  );
};
