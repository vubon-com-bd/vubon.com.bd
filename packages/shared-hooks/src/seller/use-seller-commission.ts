import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export interface Commission {
  readonly id: string;
  readonly orderId: string;
  readonly amount: number;
  readonly rate: number;
  readonly status: 'pending' | 'approved' | 'paid';
  readonly createdAt: string;
}

export interface CommissionListResult {
  readonly commissions: readonly Commission[];
  readonly total: number;
}

export function useSellerCommission(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<CommissionListResult>
): {
  readonly commissions: readonly Commission[];
  readonly total: number;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['seller', 'commission', params];
  const result = useQuery<CommissionListResult, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(params, signal),
    staleTime: 60_000,
  });
  return {
    commissions: result.data?.commissions ?? [],
    total: result.data?.total ?? 0,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
