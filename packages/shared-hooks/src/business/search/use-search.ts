import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import { useDebounce } from '../../primitive/timing/use-debounce';
import type { SearchResponse } from './search.types';

export function useSearch(
  query: string,
  fetcher: (q: string, signal: AbortSignal) => Promise<SearchResponse>,
  options: { debounceMs?: number; enabled?: boolean } = {}
): {
  readonly results: SearchResponse | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const debounced = useDebounce(query, options.debounceMs ?? 300);
  const enabled = (options.enabled ?? true) && debounced.trim().length > 0;
  const key: QueryKey = ['search', debounced];

  const result = useQuery<SearchResponse, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(debounced, signal),
    enabled,
    staleTime: 30_000,
  });
  return {
    results: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
