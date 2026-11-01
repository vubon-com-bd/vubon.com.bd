import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export interface SellerSubscription {
  readonly plan: 'free' | 'basic' | 'pro' | 'enterprise';
  readonly status: 'active' | 'past_due' | 'cancelled';
  readonly startsAt: string;
  readonly renewsAt?: string;
  readonly features: readonly string[];
}

export function useSellerSubscription(
  fetcher: (signal: AbortSignal) => Promise<SellerSubscription>
): {
  readonly subscription: SellerSubscription | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['seller', 'subscription'];
  const result = useQuery<SellerSubscription, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 5 * 60_000,
  });
  return {
    subscription: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
