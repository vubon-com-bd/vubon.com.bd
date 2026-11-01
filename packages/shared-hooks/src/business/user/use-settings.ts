import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { UserSettings } from './user.types';

export function useSettings(fetcher: (signal: AbortSignal) => Promise<UserSettings>): {
  readonly settings: UserSettings | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['user', 'settings'];
  const result = useQuery<UserSettings, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 5 * 60_000,
  });
  return {
    settings: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
