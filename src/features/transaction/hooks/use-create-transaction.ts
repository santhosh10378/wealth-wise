import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/query-client';
import { CreateTransactionInput, createTransactionSchema, TransactionResponse } from '@/features/transaction/schemas/transaction-schemas';
import { useCreateTransactionState } from '@/features/transaction/hooks/use-create-transaction-state';
import { convertAmountToMiliUnits } from '@/utils/number-utils';

export const useCreateTransaction = () => {
  const { onClose } = useCreateTransactionState();

  const createTransactionForm = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      amount: 0,
      accountId: '',
      categoryId: '',
      date: new Date(),
      notes: '',
      payee: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateTransactionInput) => await apiClient.post<TransactionResponse>('/transactions', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allFinanceAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['allCategories'] });
      queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
      onClose();
      toast.success('Transaction Created');
    },
  });

  const onCreateTransaction = (data: CreateTransactionInput) => {
    const newData = { ...data, amount: convertAmountToMiliUnits(data.amount) };
    console.log(newData);

    mutation.mutate(newData);
  };

  return {
    createTransactionForm,
    onCreateTransaction,
    isTransactionCreating: mutation.isPending,
    transactionCreationError: mutation.error?.message,
  };
};
