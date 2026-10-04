import { useCallback, useState } from 'react';

/** Map-based state with safe get/set/delete/clear. */
export function useMap<K, V>(
  initial?: Iterable<readonly [K, V]>
): {
  readonly map: ReadonlyMap<K, V>;
  readonly set: (key: K, value: V) => void;
  readonly remove: (key: K) => void;
  readonly clear: () => void;
} {
  const [map, setMap] = useState<Map<K, V>>(() => new Map(initial ?? []));

  const set = useCallback((key: K, value: V) => {
    setMap((m) => {
      const next = new Map(m);
      next.set(key, value);
      return next;
    });
  }, []);

  const remove = useCallback((key: K) => {
    setMap((m) => {
      const next = new Map(m);
      next.delete(key);
      return next;
    });
  }, []);

  const clear = useCallback(() => setMap(new Map()), []);

  return { map, set, remove, clear };
}
