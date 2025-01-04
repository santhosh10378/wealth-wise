'use client';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomInputFormField } from '@/components/custom-ui/custom-input-form-field';
import { useUpdateFinanceAccount } from '@/features/finance-account/hooks/use-update-finance-account';
import { FinanceAccountResponse } from '@/features/finance-account/schemas/finance-account-schemas';
import { useDeleteFinanceAccount } from '@/features/finance-account/hooks/use-delete-finance-account';
import { useConfirm } from '@/hooks/use-confirm';

interface Props {
  account: FinanceAccountResponse;
}

export const EditAccountForm = ({ account }: Props) => {
  const { updateAccountForm, onUpdateAccount, isAccountUpdating, accountUpdateError } = useUpdateFinanceAccount(account);
  const { onDeleteAccount, isAccountDeleting, accountDeleteError } = useDeleteFinanceAccount();

  const [ConfirmationDialog, confirm] = useConfirm('Are you Sure?', 'This action can not be undone');

  const isLoading = isAccountUpdating || isAccountDeleting;
  const error = accountUpdateError || accountDeleteError;

  return (
    <>
      <ConfirmationDialog />
      <Form {...updateAccountForm}>
        {error && <div className='p-2 rounded-md bg-red-100 dark:bg-red-500/20 text-red-500 text-sm font-medium'>{error}</div>}

        <form onSubmit={updateAccountForm.handleSubmit(onUpdateAccount)} className='flex flex-col gap-5'>
          <CustomInputFormField
            control={updateAccountForm.control}
            disabled={isLoading}
            label='Name'
            name='name'
            placeholder='e.g. Cash, Bank, Credit Card'
            type='text'
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
              onDeleteAccount(account.id);
            }
          }}
        >
          Delete Account
        </Button>
      </Form>
    </>
  );
};
