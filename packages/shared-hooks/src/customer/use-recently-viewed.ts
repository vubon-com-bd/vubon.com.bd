import { useCallback } from 'react';
import { useLocalStorage } from '../utility/storage/use-local-storage';

const KEY = 'vubon:recently-viewed';
const MAX = 20;

export function useRecentlyViewed(): {
  readonly ids: readonly string[];
  readonly add: (productId: string) => void;
  readonly clear: () => void;
} {
  const [ids, setIds] = useLocalStorage<readonly string[]>(KEY, []);

  const add = useCallback(
    (productId: string) => {
      setIds((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, MAX));
    },
    [setIds]
  );

  const clear = useCallback(() => setIds([]), [setIds]);

  return { ids, add, clear };
}
