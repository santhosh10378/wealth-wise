import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { convertAmountFromMiliUnits } from '@/utils/number-utils';
import { useSearchParams } from 'next/navigation';

type PeriodSummary = {
  income: number;
  expenses: number;
  remaining: number;
};

type Day = {
  date: Date;
  income: number;
  expenses: number;
};

type SummaryResponse = {
  remainingAmount: number;
  incomeAmount: number;
  expensesAmount: number;
  remainingChange: number;
  incomeChange: number;
  expensesChange: number;
  categories: {
    name: string;
    value: number;
  }[];
  days: Day[];
};

export const useGetAllSummaries = () => {
  const params = useSearchParams();

  const accountId = params.get('accountId') || '';
  const from = params.get('from') || '';
  const to = params.get('to') || '';

  const { data, error, isLoading } = useQuery<SummaryResponse, Error>({
    queryKey: ['summaries', { from, to, accountId }],
    queryFn: async () => {
      const response = await apiClient.get<{ data: SummaryResponse }>('/summary', {
        params: {
          from,
          to,
          accountId,
        },
      });
      const { remainingAmount, incomeAmount, expensesAmount, remainingChange, incomeChange, expensesChange, categories, days } = response.data?.data;

      // Convert main amounts
      const convertedRemainingAmount = convertAmountFromMiliUnits(remainingAmount);
      const convertedIncomeAmount = convertAmountFromMiliUnits(incomeAmount);
      const convertedExpensesAmount = convertAmountFromMiliUnits(expensesAmount);

      // Convert categories
      const convertedCategories = categories.map((category) => ({
        ...category,
        value: convertAmountFromMiliUnits(category.value),
      }));

      // Convert days
      const convertedDays = days.map((day) => ({
        ...day,
        income: convertAmountFromMiliUnits(day.income),
        expenses: convertAmountFromMiliUnits(day.expenses),
      }));

      return {
        remainingAmount: convertedRemainingAmount,
        incomeAmount: convertedIncomeAmount,
        expensesAmount: convertedExpensesAmount,
        remainingChange,
        incomeChange,
        expensesChange,
        categories: convertedCategories,
        days: convertedDays,
      };
    },
  });

  return {
    summaries: data,
    isSummariesLoading: isLoading,
    summariesError: error,
  };
};
