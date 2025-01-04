import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/query-client';
import { FinanceAccountResponse } from '@/features/finance-account/schemas/finance-account-schemas';
import { useCreateFinanceAccountState } from '@/features/finance-account/hooks/use-create-finance-account-state';

export const useDeleteFinanceAccount = () => {
  const { onClose } = useCreateFinanceAccountState();

  const mutation = useMutation({
    mutationFn: async (accountId: string) => await apiClient.delete<FinanceAccountResponse>(`/accounts/${accountId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allFinanceAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['allCategories'] });
      queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
      onClose();
      toast.success('Account Deleted');
    },
  });

  return {
    onDeleteAccount: mutation.mutate,
    isAccountDeleting: mutation.isPending,
    accountDeleteError: mutation.error?.message,
  };
};
