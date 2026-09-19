import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export interface AdminVendorSummary {
  readonly id: string;
  readonly name: string;
  readonly status: 'pending' | 'active' | 'suspended' | 'closed';
  readonly email: string;
}

export interface AdminVendorListResult {
  readonly vendors: readonly AdminVendorSummary[];
  readonly total: number;
}

export function useAdminVendors(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<AdminVendorListResult>
): {
  readonly vendors: readonly AdminVendorSummary[];
  readonly total: number;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['admin', 'vendors', params];
  const result = useQuery<AdminVendorListResult, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(params, signal),
    staleTime: 30_000,
  });
  return {
    vendors: result.data?.vendors ?? [],
    total: result.data?.total ?? 0,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
