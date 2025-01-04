import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { TransactionResponseWithExtras } from '@/features/transaction/schemas/transaction-schemas';
import { convertAmountFromMiliUnits } from '@/utils/number-utils';
import { useSearchParams } from 'next/navigation';

export const useGetAllTransactions = () => {
  const params = useSearchParams();

  const accountId = params.get('accountId') || '';
  const from = params.get('from') || '';
  const to = params.get('to') || '';

  const { data, error, isLoading } = useQuery<TransactionResponseWithExtras[], Error>({
    queryKey: ['allTransactions', { from, to, accountId }],
    queryFn: async () => {
      const response = await apiClient.get<{ data: TransactionResponseWithExtras[] }>(`/transactions`, {
        params: {
          accountId,
          from,
          to,
        },
      });

      const converted = response.data?.data.map((item) => ({
        ...item,
        amount: convertAmountFromMiliUnits(item.amount),
      }));

      return converted;
    },
  });

  return {
    transactions: data || [],
    isTransactionsLoading: isLoading,
    transactionsError: error,
  };
};
