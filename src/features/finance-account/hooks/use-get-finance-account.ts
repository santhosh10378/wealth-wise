import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { FinanceAccountResponse } from '@/features/finance-account/schemas/finance-account-schemas';

export const useGetFinanceAccount = (accountId: string) => {
  const { data, error, isLoading } = useQuery<FinanceAccountResponse, Error>({
    queryKey: ['financeAccount', accountId],
    queryFn: async () => {
      const response = await apiClient.get<FinanceAccountResponse>(`/accounts/${accountId}`);
      return response.data;
    },
    enabled: !!accountId,
  });

  return {
    financeAccount: data,
    isFinanceAccountLoading: isLoading,
    financeAccountError: error,
  };
};
