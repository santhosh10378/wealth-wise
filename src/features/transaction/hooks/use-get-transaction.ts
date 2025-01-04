import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { TransactionResponseWithExtras } from '@/features/transaction/schemas/transaction-schemas';
import { convertAmountFromMiliUnits } from '@/utils/number-utils';

export const useGetTransaction = (transactionId: string) => {
  const { data, error, isLoading } = useQuery<TransactionResponseWithExtras, Error>({
    queryKey: ['transaction', transactionId],
    queryFn: async () => {
      const response = await apiClient.get<TransactionResponseWithExtras>(`/transactions/${transactionId}`);

      const converted = {
        ...response.data,
        amount: convertAmountFromMiliUnits(response.data.amount),
      };

      return converted;
    },
    enabled: !!transactionId,
  });

  return {
    transaction: data,
    isTransactionLoading: isLoading,
    transactionError: error,
  };
};
