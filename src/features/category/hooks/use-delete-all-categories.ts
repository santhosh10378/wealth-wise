import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/query-client';

export const useDeleteAllCategories = () => {
  const mutation = useMutation({
    mutationFn: async (ids: string[]) => await apiClient.put('/categories', { ids }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allFinanceAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['allCategories'] });
      queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
      toast.success('Categories Deleted');
    },
  });

  return {
    onDeleteAllCategories: mutation.mutate,
    isDeletingAllCategories: mutation.isPending,
    deleteAllCategoriesError: mutation.error,
  };
};
