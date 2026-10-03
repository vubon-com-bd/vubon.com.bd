import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export interface SellerProductSummary {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly stock: number;
  readonly status: 'active' | 'draft' | 'out_of_stock';
}

export interface SellerProductListResult {
  readonly products: readonly SellerProductSummary[];
  readonly total: number;
}

export function useSellerProducts(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<SellerProductListResult>
): {
  readonly products: readonly SellerProductSummary[];
  readonly total: number;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['seller', 'products', params];
  const result = useQuery<SellerProductListResult, Error>({
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
