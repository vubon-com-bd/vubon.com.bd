import { useCallback, useEffect, useRef } from 'react';

export function useFormPersist<T extends Record<string, unknown>>(
  key: string,
  values: T,
  onRestore: (values: T) => void,
  options: { debounceMs?: number } = {}
): {
  readonly clear: () => void;
} {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restored = useRef(false);

  // Restore once on mount
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    try {
      if (typeof window === 'undefined') return;
      const raw = window.localStorage.getItem(`form:${key}`);
      if (raw) onRestore(JSON.parse(raw) as T);
    } catch {
      // ignore
    }
  }, [key]);

  // Persist on change (debounced)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      try {
        window.localStorage.setItem(`form:${key}`, JSON.stringify(values));
      } catch {
        // ignore
      }
    }, options.debounceMs ?? 500);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [key, values, options.debounceMs]);

  const clear = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(`form:${key}`);
      }
    } catch {
      // ignore
    }
  }, [key]);

  return { clear };
}
