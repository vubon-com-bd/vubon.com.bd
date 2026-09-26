import { useCallback, useState } from 'react';

export function useSet<T>(initial?: Iterable<T>): {
  readonly set: ReadonlySet<T>;
  readonly add: (value: T) => void;
  readonly remove: (value: T) => void;
  readonly toggle: (value: T) => void;
  readonly clear: () => void;
  readonly has: (value: T) => boolean;
} {
  const [set, setSet] = useState<Set<T>>(() => new Set(initial ?? []));

  const add = useCallback((v: T) => {
    setSet((s) => {
      const next = new Set(s);
      next.add(v);
      return next;
    });
  }, []);

  const remove = useCallback((v: T) => {
    setSet((s) => {
      const next = new Set(s);
      next.delete(v);
      return next;
    });
  }, []);

  const toggle = useCallback((v: T) => {
    setSet((s) => {
      const next = new Set(s);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });
  }, []);

  const clear = useCallback(() => setSet(new Set()), []);
  const has = useCallback((v: T) => set.has(v), [set]);

  return { set, add, remove, toggle, clear, has };
}
