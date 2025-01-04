import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/query-client';
import { UpdateTransactionInput, updateTransactionSchema, TransactionResponse } from '@/features/transaction/schemas/transaction-schemas';
import { useEditTransactionState } from '@/features/transaction/hooks/use-edit-transaction-state';
import { convertAmountToMiliUnits } from '@/utils/number-utils';

export const useUpdateTransaction = (transaction: TransactionResponse) => {
  const { onClose } = useEditTransactionState();

  const updateTransactionForm = useForm<UpdateTransactionInput>({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      amount: transaction.amount || 0,
      accountId: transaction.accountId || '',
      categoryId: transaction.categoryId || '',
      date: transaction?.date ? new Date(transaction?.date) : new Date(),
      notes: transaction.notes || '',
      payee: transaction.payee || '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (input: UpdateTransactionInput) => await apiClient.put<TransactionResponse>(`/transactions/${transaction.id}`, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allFinanceAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['allCategories'] });
      queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
      onClose();
      toast.success('Transaction Updated');
    },
  });

  const onUpdateTransaction = (data: UpdateTransactionInput) => {
    const newData = { ...data, amount: convertAmountToMiliUnits(data.amount) };
    console.log(newData);

    mutation.mutate(newData);
  };

  return {
    updateTransactionForm,
    onUpdateTransaction,
    isTransactionUpdating: mutation.isPending,
    transactionUpdateError: mutation.error?.message,
  };
};
