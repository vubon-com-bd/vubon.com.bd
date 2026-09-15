import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export interface AdminContext {
  readonly adminId: string;
  readonly name: string;
  readonly roles: readonly string[];
  readonly permissions: readonly string[];
}

export function useAdmin(fetcher: (signal: AbortSignal) => Promise<AdminContext>): {
  readonly admin: AdminContext | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['admin', 'context'];
  const result = useQuery<AdminContext, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 5 * 60_000,
  });
  return {
    admin: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
