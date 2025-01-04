'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useEditTransactionState } from '@/features/transaction/hooks/use-edit-transaction-state';
import { EditTransactionForm } from '@/features/transaction/components/edit-transaction-form';

export const EditTransactionSheet = () => {
  const { isOpen, onClose, transaction } = useEditTransactionState();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className='mb-8 space-y-0'>
          <SheetTitle>Edit Transaction</SheetTitle>
          <SheetDescription>Modify your transaction</SheetDescription>
        </SheetHeader>

        <EditTransactionForm transaction={transaction} />
      </SheetContent>
    </Sheet>
  );
};
