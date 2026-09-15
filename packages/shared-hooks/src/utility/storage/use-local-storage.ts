import { useCallback, useEffect, useState } from 'react';

/**
 * Type-safe localStorage state.
 * SSR-safe — returns `initial` on server.
 * Syncs across tabs via `storage` event.
 */
export function useLocalStorage<T>(
  key: string,
  initial: T
): readonly [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [stored, setStored] = useState<T>(() => {
    if (typeof window === 'undefined') return initial;
    try {
      const raw = window.localStorage.getItem(key);
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
            window.localStorage.setItem(key, JSON.stringify(next));
          }
        } catch {
          // quota / private mode — ignore
        }
        return next;
      });
    },
    [key]
  );

  const remove = useCallback(() => {
    try {
      if (typeof window !== 'undefined') window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setStored(initial);
  }, [key, initial]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = (e: StorageEvent): void => {
      if (e.key !== key || e.newValue === null) return;
      try {
        setStored(JSON.parse(e.newValue) as T);
      } catch {
        // ignore
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key]);

  return [stored, setValue, remove] as const;
}
