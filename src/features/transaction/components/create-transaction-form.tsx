'use client';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomInputFormField } from '@/components/custom-ui/custom-input-form-field';
import { useCreateTransaction } from '@/features/transaction/hooks/use-create-transaction';
import { useGetAllCategories } from '@/features/category/hooks/use-get-all-categories';
import { useGetAllFinanceAccounts } from '@/features/finance-account/hooks/use-get-all-finance-accounts';
import { CustomSelectFormField } from '@/components/custom-ui/custom-select-form-filed';
import { CustomDateFormField } from '@/components/custom-ui/custom-date-form-field';
import { CustomTextAreaFormField } from '@/components/custom-ui/custom-textarea-form-field';
import { CustomAmountInputField } from '@/components/custom-ui/custom-amount-input-field';

export const CreateTransactionForm = () => {
  const { createTransactionForm, onCreateTransaction, isTransactionCreating, transactionCreationError } = useCreateTransaction();
  const { categories, isCategoriesLoading, categoriesError } = useGetAllCategories();
  const { financeAccounts, isFinanceAccountsLoading, financeAccountsError } = useGetAllFinanceAccounts();

  const isLoading = isCategoriesLoading || isTransactionCreating || isFinanceAccountsLoading;
  const isError = categoriesError || transactionCreationError || financeAccountsError;

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const financeAccountOptions = financeAccounts.map((financeAccount) => ({
    label: financeAccount.name,
    value: financeAccount.id,
  }));

  return (
    <>
      <Form {...createTransactionForm}>
        {isError && <div className='p-2 rounded-md bg-red-100 dark:bg-red-500/20 text-red-500 text-sm font-medium'>{isError}</div>}

        <form onSubmit={createTransactionForm.handleSubmit(onCreateTransaction)} className='flex flex-col gap-5'>
          <CustomInputFormField
            control={createTransactionForm.control}
            disabled={isLoading}
            label='Add a Payee'
            name='payee'
            placeholder='e.g. Cash, Bank, Credit Card'
            type='text'
          />

          <CustomSelectFormField
            control={createTransactionForm.control}
            disabled={isLoading}
            label='Account'
            name='accountId'
            placeholder='Select an account'
            options={financeAccountOptions}
          />
          <CustomSelectFormField
            control={createTransactionForm.control}
            disabled={isLoading}
            label='Category'
            name='categoryId'
            placeholder='Select a category'
            options={categoryOptions}
          />
          <CustomDateFormField control={createTransactionForm.control} disabled={isLoading} label='Transaction Date' name='date' />
          <CustomAmountInputField control={createTransactionForm.control} name='amount' disabled={isLoading} label='Amount' placeholder='0.00' />

          <CustomTextAreaFormField
            control={createTransactionForm.control}
            disabled={isLoading}
            label='Notes'
            name='notes'
            placeholder='Optional notes'
          />

          <Button type='submit' disabled={isLoading} className='w-full'>
            Create Transaction
          </Button>
        </form>
      </Form>
    </>
  );
};
