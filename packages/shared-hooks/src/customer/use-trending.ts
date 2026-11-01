import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export interface TrendingItem {
  readonly id: string;
  readonly title: string;
  readonly trendScore: number;
  readonly rank: number;
}

export function useTrending(fetcher: (signal: AbortSignal) => Promise<readonly TrendingItem[]>): {
  readonly items: readonly TrendingItem[];
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['customer', 'trending'];
  const result = useQuery<readonly TrendingItem[], Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 5 * 60_000,
  });
  return {
    items: result.data ?? [],
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
