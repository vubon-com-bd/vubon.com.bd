import { useCallback, useState } from 'react';

export function useFormArray<T>(initial: readonly T[] = []): {
  readonly items: readonly T[];
  readonly push: (item: T) => void;
  readonly insert: (index: number, item: T) => void;
  readonly remove: (index: number) => void;
  readonly update: (index: number, item: T) => void;
  readonly move: (from: number, to: number) => void;
  readonly clear: () => void;
} {
  const [items, setItems] = useState<readonly T[]>(initial);

  const push = useCallback((item: T) => setItems((a) => [...a, item]), []);
  const insert = useCallback(
    (index: number, item: T) =>
      setItems((a) => {
        const next = [...a];
        next.splice(index, 0, item);
        return next;
      }),
    []
  );
  const remove = useCallback(
    (index: number) => setItems((a) => a.filter((_, i) => i !== index)),
    []
  );
  const update = useCallback(
    (index: number, item: T) => setItems((a) => a.map((v, i) => (i === index ? item : v))),
    []
  );
  const move = useCallback((from: number, to: number) => {
    setItems((a) => {
      const next = [...a];
      const [moved] = next.splice(from, 1);
      if (moved !== undefined) next.splice(to, 0, moved);
      return next;
    });
  }, []);
  const clear = useCallback(() => setItems([]), []);

  return { items, push, insert, remove, update, move, clear };
}
