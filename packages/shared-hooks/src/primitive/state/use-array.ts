import { useCallback, useState } from 'react';

export function useArray<T>(initial: readonly T[] = []): {
  readonly items: readonly T[];
  readonly push: (item: T) => void;
  readonly removeAt: (index: number) => void;
  readonly updateAt: (index: number, item: T) => void;
  readonly clear: () => void;
} {
  const [items, setItems] = useState<readonly T[]>(initial);

  const push = useCallback((item: T) => setItems((a) => [...a, item]), []);
  const removeAt = useCallback(
    (index: number) => setItems((a) => a.filter((_, i) => i !== index)),
    []
  );
  const updateAt = useCallback(
    (index: number, item: T) => setItems((a) => a.map((v, i) => (i === index ? item : v))),
    []
  );
  const clear = useCallback(() => setItems([]), []);

  return { items, push, removeAt, updateAt, clear };
}
