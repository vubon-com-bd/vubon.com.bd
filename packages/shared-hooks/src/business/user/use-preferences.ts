import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { UserPreferences } from './user.types';

export function usePreferences(fetcher: (signal: AbortSignal) => Promise<UserPreferences>): {
  readonly preferences: UserPreferences | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['user', 'preferences'];
  const result = useQuery<UserPreferences, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 5 * 60_000,
  });
  return {
    preferences: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
