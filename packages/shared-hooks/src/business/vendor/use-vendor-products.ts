import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export function useVendorProducts<TProduct>(
  vendorId: string,
  params: QueryParams = {},
  fetcher: (
    vendorId: string,
    params: QueryParams,
    signal: AbortSignal
  ) => Promise<readonly TProduct[]>
): {
  readonly products: readonly TProduct[];
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['vendors', vendorId, 'products', params];
  const result = useQuery<readonly TProduct[], Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(vendorId, params, signal),
    enabled: vendorId.length > 0,
  });
  return {
    products: result.data ?? [],
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
