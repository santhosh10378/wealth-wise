'use client';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomInputFormField } from '@/components/custom-ui/custom-input-form-field';
import { useCreateFinanceAccount } from '@/features/finance-account/hooks/use-create-finance-account';

export const CreateAccountForm = () => {
  const { createAccountForm, onCreateAccount, isAccountCreating, accountCreationError } = useCreateFinanceAccount();

  return (
    <Form {...createAccountForm}>
      {accountCreationError && (
        <div className='p-2 rounded-md bg-red-100 dark:bg-red-500/20 text-red-500 text-sm font-medium'>{accountCreationError}</div>
      )}

      <form onSubmit={createAccountForm.handleSubmit(onCreateAccount)} className='flex flex-col gap-5'>
        <CustomInputFormField
          control={createAccountForm.control}
          disabled={isAccountCreating}
          label='Name'
          name='name'
          placeholder='e.g. Cash, Bank, Credit Card'
          type='text'
        />

        <Button type='submit' disabled={isAccountCreating} className='w-full'>
          Create Account
        </Button>
      </form>
    </Form>
  );
};
