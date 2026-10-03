import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export interface RecommendationItem {
  readonly id: string;
  readonly type: string;
  readonly score: number;
  readonly reason?: string;
}

export function useRecommendations(
  fetcher: (signal: AbortSignal) => Promise<readonly RecommendationItem[]>
): {
  readonly recommendations: readonly RecommendationItem[];
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['customer', 'recommendations'];
  const result = useQuery<readonly RecommendationItem[], Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 5 * 60_000,
  });
  return {
    recommendations: result.data ?? [],
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
