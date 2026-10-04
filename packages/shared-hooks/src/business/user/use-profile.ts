import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { UserProfile } from './user.types';

export const PROFILE_QUERY_KEY: QueryKey = ['user', 'profile'];

export function useProfile(fetcher: (signal: AbortSignal) => Promise<UserProfile>): {
  readonly profile: UserProfile | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
  readonly refetch: () => Promise<unknown>;
} {
  const result = useQuery<UserProfile, Error>({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 60_000,
  });
  return {
    profile: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
    refetch: result.refetch,
  };
}
