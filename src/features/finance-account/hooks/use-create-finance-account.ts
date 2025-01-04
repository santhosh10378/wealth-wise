import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/query-client';
import {
  CreateFinanceAccountInput,
  createFinanceAccountSchema,
  FinanceAccountResponse,
} from '@/features/finance-account/schemas/finance-account-schemas';
import { useCreateFinanceAccountState } from '@/features/finance-account/hooks/use-create-finance-account-state';

export const useCreateFinanceAccount = () => {
  const { onClose } = useCreateFinanceAccountState();

  const createAccountForm = useForm<CreateFinanceAccountInput>({
    resolver: zodResolver(createFinanceAccountSchema),
    defaultValues: {
      name: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateFinanceAccountInput) => await apiClient.post<FinanceAccountResponse>('/accounts', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allFinanceAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['allCategories'] });
      queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
      onClose();
      toast.success('Account Created');
    },
  });

  const onCreateAccount = (data: CreateFinanceAccountInput) => {
    mutation.mutate(data);
  };

  return {
    createAccountForm,
    onCreateAccount,
    isAccountCreating: mutation.isPending,
    accountCreationError: mutation.error?.message,
  };
};
