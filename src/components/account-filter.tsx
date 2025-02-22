'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

import { useGetAllFinanceAccounts } from '@/features/finance-account/hooks/use-get-all-finance-accounts';
import { useGetAllSummaries } from '@/hooks/use-get-all-summaries';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const AccountFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const accountId = params.get('accountId') || 'all';
  const from = params.get('from') || '';
  const to = params.get('to') || '';

  const { financeAccounts, isFinanceAccountsLoading } = useGetAllFinanceAccounts();
  const { isSummariesLoading } = useGetAllSummaries();

  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to,
    };

    if (newValue === 'all') {
      query.accountId = '';
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <Select value={accountId} onValueChange={onChange} disabled={isFinanceAccountsLoading || isSummariesLoading}>
      <SelectTrigger className='w-full lg:w-auto h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-0 focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition'>
        <SelectValue placeholder='Select account' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>All acounts</SelectItem>
        {financeAccounts.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
