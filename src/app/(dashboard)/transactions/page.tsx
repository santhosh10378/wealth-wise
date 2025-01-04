'use client';

import { useState } from 'react';

// Hooks
import { useGetAllTransactions } from '@/features/transaction/hooks/use-get-all-transactions';
import { useCreateTransactionState } from '@/features/transaction/hooks/use-create-transaction-state';
import { useDeleteAllTransactions } from '@/features/transaction/hooks/use-delete-all-transactions';

// Icons
import { PlusIcon } from 'lucide-react';

// Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/shared/data-table';
import { Skeleton } from '@/components/ui/skeleton';

// Feature-specific
import { transactionColumns } from '@/features/transaction/components/transaction-columns';
import { UploadButton } from '@/components/shared/upload-button';

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT',
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

export default function TransactionsPage() {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setVariant(VARIANTS.IMPORT);
  };

  const { onOpen } = useCreateTransactionState();
  const { transactions, isTransactionsLoading } = useGetAllTransactions();
  const { onDeleteAllTransactions, isDeletingAllTransactions } = useDeleteAllTransactions();

  console.log(variant);

  const isLoading = isDeletingAllTransactions || isTransactionsLoading;

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <div>This is a screen for import</div>
      </>
    );
  }

  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-28'>
      <Card className='border-0 drop-shadow-sm dark:border'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          {isLoading ? (
            <>
              <Skeleton className='h-6 w-48' />
              <Skeleton className='h-8 w-32' />
            </>
          ) : (
            <>
              <CardTitle className='text-xl line-clamp-1'>Transactions Page</CardTitle>

              <Button size='sm' onClick={onOpen} disabled={isLoading} className='lg:ml-auto lg:mr-2'>
                <PlusIcon className='size-4' />
                Add new
              </Button>
              {/* <UploadButton onUpload={onUpload} /> */}
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
              data={transactions}
              columns={transactionColumns}
              filterKey='payee'
              OnDelete={(ids) => onDeleteAllTransactions(ids)}
              disabled={isLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
