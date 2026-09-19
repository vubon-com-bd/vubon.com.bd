import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export interface SellerTeamMember {
  readonly id: string;
  readonly userId: string;
  readonly name: string;
  readonly email: string;
  readonly role: string;
  readonly joinedAt: string;
}

export function useSellerTeam(
  fetcher: (signal: AbortSignal) => Promise<readonly SellerTeamMember[]>
): {
  readonly members: readonly SellerTeamMember[];
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['seller', 'team'];
  const result = useQuery<readonly SellerTeamMember[], Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 5 * 60_000,
  });
  return {
    members: result.data ?? [],
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
