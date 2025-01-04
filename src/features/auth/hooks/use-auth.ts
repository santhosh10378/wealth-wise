import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/actions/auth-actions';

export function useCurrentUser() {
  const res = useQuery({ queryKey: ['current-user'], queryFn: getCurrentUser });

  return {
    ...res,
    user: res.data,
  };
}
