import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { AuthMe } from './auth.types';

export function useUserQuery(
  userId: string,
  fetcher: (userId: string, signal: AbortSignal) => Promise<AuthMe>
): {
  readonly user: AuthMe | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['user', userId];
  const result = useQuery<AuthMe, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(userId, signal),
    enabled: userId.length > 0,
  });
  return {
    user: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
