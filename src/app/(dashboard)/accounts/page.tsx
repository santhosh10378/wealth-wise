'use client';

// Icons
import { PlusIcon } from 'lucide-react';

// Hooks
import { useGetAllFinanceAccounts } from '@/features/finance-account/hooks/use-get-all-finance-accounts';
import { useCreateFinanceAccountState } from '@/features/finance-account/hooks/use-create-finance-account-state';
import { useDeleteAllFinanceAccounts } from '@/features/finance-account/hooks/use-delete-all-finance-accounts';

// Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/shared/data-table';
import { Skeleton } from '@/components/ui/skeleton';

// Feature-specific
import { accountColumns } from '@/features/finance-account/components/account-columns';

export default function AccountsPage() {
  const { onOpen } = useCreateFinanceAccountState();
  const { financeAccounts, isFinanceAccountsLoading } = useGetAllFinanceAccounts();
  const { onDeleteAllAccounts, isDeletingAllAccounts } = useDeleteAllFinanceAccounts();

  const isLoading = isDeletingAllAccounts || isFinanceAccountsLoading;

  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-28'>
      <Card className='border-0 drop-shadow-sm dark:border'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between pb-1.5'>
          {isLoading ? (
            <>
              <Skeleton className='h-6 w-48' />
              <Skeleton className='h-8 w-32' />
            </>
          ) : (
            <>
              <CardTitle className='text-xl line-clamp-1'>Accounts Page</CardTitle>
              <Button size='sm' onClick={onOpen} disabled={isLoading}>
                <PlusIcon className='size-4' />
                Add new
              </Button>
            </>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='space-y-4'>
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className='h-10 w-full' />
              ))}
            </div>
          ) : (
            <DataTable
              data={financeAccounts}
              columns={accountColumns}
              filterKey='name'
              OnDelete={(ids) => onDeleteAllAccounts(ids)}
              disabled={isLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
