import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export interface AdminReport {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly createdAt: string;
}

export function useAdminReports(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<readonly AdminReport[]>
): {
  readonly reports: readonly AdminReport[];
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['admin', 'reports', params];
  const result = useQuery<readonly AdminReport[], Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(params, signal),
    staleTime: 60_000,
  });
  return {
    reports: result.data ?? [],
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
