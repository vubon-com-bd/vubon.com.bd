import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export interface AdminProductSummary {
  readonly id: string;
  readonly name: string;
  readonly vendorId: string;
  readonly status: 'pending' | 'approved' | 'rejected';
  readonly price: number;
}

export interface AdminProductListResult {
  readonly products: readonly AdminProductSummary[];
  readonly total: number;
}

export function useAdminProducts(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<AdminProductListResult>
): {
  readonly products: readonly AdminProductSummary[];
  readonly total: number;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['admin', 'products', params];
  const result = useQuery<AdminProductListResult, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(params, signal),
    staleTime: 30_000,
  });
  return {
    products: result.data?.products ?? [],
    total: result.data?.total ?? 0,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
