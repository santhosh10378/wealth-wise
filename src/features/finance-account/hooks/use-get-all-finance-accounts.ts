import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { FinanceAccountResponse } from '@/features/finance-account/schemas/finance-account-schemas';
import { useSearchParams } from 'next/navigation';

export const useGetAllFinanceAccounts = () => {
  const params = useSearchParams();

  const accountId = params.get('accountId') || '';

  const { data, error, isLoading } = useQuery<FinanceAccountResponse[], Error>({
    queryKey: ['allFinanceAccounts', { accountId }],
    queryFn: async () => {
      const response = await apiClient.get<{ data: FinanceAccountResponse[] }>('/accounts', {
        params: {
          accountId,
        },
      });
      return response.data?.data;
    },
  });

  return {
    financeAccounts: data || [],
    isFinanceAccountsLoading: isLoading,
    financeAccountsError: error?.message,
  };
};
