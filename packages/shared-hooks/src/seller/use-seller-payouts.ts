import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export interface SellerPayout {
  readonly id: string;
  readonly amount: number;
  readonly currency: string;
  readonly status: 'requested' | 'processing' | 'paid' | 'failed';
  readonly requestedAt: string;
  readonly paidAt?: string;
}

export function useSellerPayouts(
  fetcher: (signal: AbortSignal) => Promise<readonly SellerPayout[]>
): {
  readonly payouts: readonly SellerPayout[];
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['seller', 'payouts'];
  const result = useQuery<readonly SellerPayout[], Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 60_000,
  });
  return {
    payouts: result.data ?? [],
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
