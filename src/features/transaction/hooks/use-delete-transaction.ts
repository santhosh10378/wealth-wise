import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/query-client';
import { TransactionResponse } from '@/features/transaction/schemas/transaction-schemas';
import { useEditTransactionState } from '@/features/transaction/hooks/use-edit-transaction-state';

export const useDeleteTransaction = () => {
  const { onClose } = useEditTransactionState();

  const mutation = useMutation({
    mutationFn: async (transactionId: string) => await apiClient.delete<TransactionResponse>(`/transactions/${transactionId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allFinanceAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['allCategories'] });
      queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
      onClose();
      toast.success('Transaction Deleted');
    },
  });

  return {
    onDeleteTransaction: mutation.mutate,
    isTransactionDeleting: mutation.isPending,
    transactionDeleteError: mutation.error?.message,
  };
};
