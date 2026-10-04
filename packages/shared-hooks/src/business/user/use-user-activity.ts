import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';
import type { UserActivityEntry } from './user.types';

export interface UserActivityResult {
  readonly activities: readonly UserActivityEntry[];
  readonly total: number;
}

export function useUserActivity(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<UserActivityResult>
): {
  readonly activities: readonly UserActivityEntry[];
  readonly total: number;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['user', 'activity', params];
  const result = useQuery<UserActivityResult, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(params, signal),
    staleTime: 30_000,
  });
  return {
    activities: result.data?.activities ?? [],
    total: result.data?.total ?? 0,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
