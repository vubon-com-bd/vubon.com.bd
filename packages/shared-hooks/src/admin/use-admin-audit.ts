import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export interface AuditEntry {
  readonly id: string;
  readonly actorId: string;
  readonly action: string;
  readonly resourceType: string;
  readonly resourceId: string;
  readonly occurredAt: string;
}

export interface AuditListResult {
  readonly entries: readonly AuditEntry[];
  readonly total: number;
}

export function useAdminAudit(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<AuditListResult>
): {
  readonly entries: readonly AuditEntry[];
  readonly total: number;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['admin', 'audit', params];
  const result = useQuery<AuditListResult, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(params, signal),
    staleTime: 60_000,
  });
  return {
    entries: result.data?.entries ?? [],
    total: result.data?.total ?? 0,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
