import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import { useDebounce } from '../../primitive/timing/use-debounce';
import type { AutocompleteSuggestion } from './search.types';

export function useAutocomplete(
  query: string,
  fetcher: (q: string, signal: AbortSignal) => Promise<readonly AutocompleteSuggestion[]>,
  options: { debounceMs?: number; enabled?: boolean } = {}
): {
  readonly suggestions: readonly AutocompleteSuggestion[];
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const debounced = useDebounce(query, options.debounceMs ?? 200);
  const enabled = (options.enabled ?? true) && debounced.trim().length > 0;
  const key: QueryKey = ['search', 'autocomplete', debounced];

  const result = useQuery<readonly AutocompleteSuggestion[], Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(debounced, signal),
    enabled,
    staleTime: 60_000,
  });
  return {
    suggestions: result.data ?? [],
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
