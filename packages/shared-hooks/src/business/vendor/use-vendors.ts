import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';
import type { Vendor } from './vendor.types';

export interface VendorListResult {
  readonly vendors: readonly Vendor[];
  readonly total: number;
}

export function useVendors(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<VendorListResult>
): {
  readonly vendors: readonly Vendor[];
  readonly total: number;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['vendors', 'list', params];
  const result = useQuery<VendorListResult, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(params, signal),
    staleTime: 60_000,
  });
  return {
    vendors: result.data?.vendors ?? [],
    total: result.data?.total ?? 0,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
