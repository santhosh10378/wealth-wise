import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/query-client';

export const useDeleteAllFinanceAccounts = () => {
  const mutation = useMutation({
    mutationFn: async (ids: string[]) => await apiClient.put('/accounts', { ids }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allFinanceAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['allCategories'] });
      queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
      toast.success('Accounts Deleted');
    },
  });

  return {
    onDeleteAllAccounts: mutation.mutate,
    isDeletingAllAccounts: mutation.isPending,
    deleteAllAccountsError: mutation.error,
  };
};
