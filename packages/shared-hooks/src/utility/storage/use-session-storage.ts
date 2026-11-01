import { useCallback, useState } from 'react';

/** Type-safe sessionStorage state. SSR-safe. */
export function useSessionStorage<T>(
  key: string,
  initial: T
): readonly [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [stored, setStored] = useState<T>(() => {
    if (typeof window === 'undefined') return initial;
    try {
      const raw = window.sessionStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next = typeof value === 'function' ? (value as (p: T) => T)(prev) : value;
        try {
          if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(key, JSON.stringify(next));
          }
        } catch {
          // ignore
        }
        return next;
      });
    },
    [key]
  );

  const remove = useCallback(() => {
    try {
      if (typeof window !== 'undefined') window.sessionStorage.removeItem(key);
    } catch {
      // ignore
    }
    setStored(initial);
  }, [key, initial]);

  return [stored, setValue, remove] as const;
}
