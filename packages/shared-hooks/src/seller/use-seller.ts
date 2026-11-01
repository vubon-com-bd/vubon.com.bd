import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export interface SellerContext {
  readonly sellerId: string;
  readonly vendorId: string;
  readonly name: string;
  readonly roles: readonly string[];
}

export function useSeller(fetcher: (signal: AbortSignal) => Promise<SellerContext>): {
  readonly seller: SellerContext | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['seller', 'context'];
  const result = useQuery<SellerContext, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 5 * 60_000,
  });
  return {
    seller: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
