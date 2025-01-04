'use client';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomInputFormField } from '@/components/custom-ui/custom-input-form-field';
import { useUpdateTransaction } from '@/features/transaction/hooks/use-update-transaction';
import { TransactionResponse } from '@/features/transaction/schemas/transaction-schemas';
import { useDeleteTransaction } from '@/features/transaction/hooks/use-delete-transaction';
import { useConfirm } from '@/hooks/use-confirm';
import { CustomSelectFormField } from '@/components/custom-ui/custom-select-form-filed';
import { CustomAmountInputField } from '@/components/custom-ui/custom-amount-input-field';
import { CustomTextAreaFormField } from '@/components/custom-ui/custom-textarea-form-field';
import { CustomDateFormField } from '@/components/custom-ui/custom-date-form-field';
import { useGetAllCategories } from '@/features/category/hooks/use-get-all-categories';
import { useGetAllFinanceAccounts } from '@/features/finance-account/hooks/use-get-all-finance-accounts';

interface Props {
  transaction: TransactionResponse;
}

export const EditTransactionForm = ({ transaction }: Props) => {
  const { updateTransactionForm, onUpdateTransaction, isTransactionUpdating, transactionUpdateError } = useUpdateTransaction(transaction);
  const { onDeleteTransaction, isTransactionDeleting, transactionDeleteError } = useDeleteTransaction();
  const { categories, isCategoriesLoading, categoriesError } = useGetAllCategories();
  const { financeAccounts, isFinanceAccountsLoading, financeAccountsError } = useGetAllFinanceAccounts();

  const isLoading = isCategoriesLoading || isTransactionUpdating || isFinanceAccountsLoading;
  const error = categoriesError || transactionUpdateError || financeAccountsError;

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const financeAccountOptions = financeAccounts.map((financeAccount) => ({
    label: financeAccount.name,
    value: financeAccount.id,
  }));

  const [ConfirmationDialog, confirm] = useConfirm('Are you Sure?', 'This action can not be undone');

  return (
    <>
      <ConfirmationDialog />
      <Form {...updateTransactionForm}>
        {error && <div className='p-2 rounded-md bg-red-100 dark:bg-red-500/20 text-red-500 text-sm font-medium'>{error}</div>}

        <form onSubmit={updateTransactionForm.handleSubmit(onUpdateTransaction)} className='flex flex-col gap-5'>
          <CustomInputFormField
            control={updateTransactionForm.control}
            disabled={isLoading}
            label='Add a Payee'
            name='payee'
            placeholder='e.g. Cash, Bank, Credit Card'
            type='text'
          />

          <CustomSelectFormField
            control={updateTransactionForm.control}
            disabled={isLoading}
            label='Account'
            name='accountId'
            placeholder='Select an account'
            options={financeAccountOptions}
          />
          <CustomSelectFormField
            control={updateTransactionForm.control}
            disabled={isLoading}
            label='Category'
            name='categoryId'
            placeholder='Select a category'
            options={categoryOptions}
          />
          <CustomDateFormField control={updateTransactionForm.control} disabled={isLoading} label='Transaction Date' name='date' />
          <CustomAmountInputField control={updateTransactionForm.control} name='amount' disabled={isLoading} label='Amount' placeholder='0.00' />

          <CustomTextAreaFormField
            control={updateTransactionForm.control}
            disabled={isLoading}
            label='Notes'
            name='notes'
            placeholder='Optional notes'
          />

          <Button type='submit' disabled={isLoading} className='w-full'>
            Save Changes
          </Button>
        </form>

        <Button
          type='button'
          variant='destructive-outline'
          disabled={isLoading}
          className='w-full mt-3'
          onClick={async () => {
            const ok = await confirm();
            if (ok) {
              onDeleteTransaction(transaction.id);
            }
          }}
        >
          Delete Transaction
        </Button>
      </Form>
    </>
  );
};
