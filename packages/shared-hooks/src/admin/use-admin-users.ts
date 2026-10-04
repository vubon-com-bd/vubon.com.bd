import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export interface AdminUserSummary {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly roles: readonly string[];
  readonly status: 'active' | 'suspended' | 'pending';
}

export interface AdminUserListResult {
  readonly users: readonly AdminUserSummary[];
  readonly total: number;
}

export function useAdminUsers(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<AdminUserListResult>
): {
  readonly users: readonly AdminUserSummary[];
  readonly total: number;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['admin', 'users', params];
  const result = useQuery<AdminUserListResult, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(params, signal),
    staleTime: 30_000,
  });
  return {
    users: result.data?.users ?? [],
    total: result.data?.total ?? 0,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
