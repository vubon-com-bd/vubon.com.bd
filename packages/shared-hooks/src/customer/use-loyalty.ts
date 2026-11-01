import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export interface LoyaltyAccount {
  readonly userId: string;
  readonly points: number;
  readonly tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  readonly nextTierPoints: number;
  readonly lifetimePoints: number;
}

export function useLoyalty(fetcher: (signal: AbortSignal) => Promise<LoyaltyAccount>): {
  readonly account: LoyaltyAccount | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['customer', 'loyalty'];
  const result = useQuery<LoyaltyAccount, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 60_000,
  });
  return {
    account: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
