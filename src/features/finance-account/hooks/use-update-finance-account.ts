import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/query-client';
import {
  UpdateFinanceAccountInput,
  updateFinanceAccountSchema,
  FinanceAccountResponse,
} from '@/features/finance-account/schemas/finance-account-schemas';
import { useEditFinanceAccountState } from '@/features/finance-account/hooks/use-edit-finance-account-state';

export const useUpdateFinanceAccount = (account: FinanceAccountResponse) => {
  const { onClose } = useEditFinanceAccountState();

  const updateAccountForm = useForm<UpdateFinanceAccountInput>({
    resolver: zodResolver(updateFinanceAccountSchema),
    defaultValues: {
      name: account.name || '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (input: UpdateFinanceAccountInput) => await apiClient.put<FinanceAccountResponse>(`/accounts/${account.id}`, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allFinanceAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['allCategories'] });
      queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
      onClose();
      toast.success('Account Updated');
    },
  });

  const onUpdateAccount = (data: UpdateFinanceAccountInput) => {
    mutation.mutate(data);
  };

  return {
    updateAccountForm,
    onUpdateAccount,
    isAccountUpdating: mutation.isPending,
    accountUpdateError: mutation.error?.message,
  };
};
