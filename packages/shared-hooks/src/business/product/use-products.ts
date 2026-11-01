import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly currency: string;
  readonly images: readonly string[];
}

export interface ProductListResult {
  readonly products: readonly Product[];
  readonly total: number;
}

/** List products with filters/sort/pagination. */
export function useProducts(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<ProductListResult>
): {
  readonly products: readonly Product[];
  readonly total: number;
  readonly loading: boolean;
  readonly error: Error | null;
  readonly refetch: () => Promise<unknown>;
} {
  const key: QueryKey = ['products', 'list', params];
  const result = useQuery<ProductListResult, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(params, signal),
    staleTime: 30_000,
  });
  return {
    products: result.data?.products ?? [],
    total: result.data?.total ?? 0,
    loading: result.isLoading,
    error: result.error ?? null,
    refetch: result.refetch,
  };
}
