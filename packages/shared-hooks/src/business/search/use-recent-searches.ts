import { useCallback } from 'react';
import { useLocalStorage } from '../../utility/storage/use-local-storage';

const KEY = 'vubon:recent-searches';
const MAX = 10;

export function useRecentSearches(): {
  readonly searches: readonly string[];
  readonly add: (query: string) => void;
  readonly remove: (query: string) => void;
  readonly clear: () => void;
} {
  const [searches, setSearches] = useLocalStorage<readonly string[]>(KEY, []);

  const add = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      if (!trimmed) return;
      setSearches((prev) => {
        const without = prev.filter((s) => s !== trimmed);
        return [trimmed, ...without].slice(0, MAX);
      });
    },
    [setSearches]
  );

  const remove = useCallback(
    (query: string) => {
      setSearches((prev) => prev.filter((s) => s !== query));
    },
    [setSearches]
  );

  const clear = useCallback(() => setSearches([]), [setSearches]);

  return { searches, add, remove, clear };
}
