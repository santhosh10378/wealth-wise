import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/query-client';

export const useDeleteAllTransactions = () => {
  const mutation = useMutation({
    mutationFn: async (ids: string[]) => await apiClient.put('/transactions', { ids }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allFinanceAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['allCategories'] });
      queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
      toast.success('Transactions Deleted');
    },
  });

  return {
    onDeleteAllTransactions: mutation.mutate,
    isDeletingAllTransactions: mutation.isPending,
    deleteAllTransactionsError: mutation.error,
  };
};
