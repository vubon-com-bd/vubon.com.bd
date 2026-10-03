import { useCallback, useState } from 'react';

export function useSelection<T extends string | number>(
  initial: readonly T[] = []
): {
  readonly selected: ReadonlySet<T>;
  readonly toggle: (id: T) => void;
  readonly select: (id: T) => void;
  readonly deselect: (id: T) => void;
  readonly clear: () => void;
  readonly isSelected: (id: T) => boolean;
  readonly count: number;
} {
  const [selected, setSelected] = useState<Set<T>>(() => new Set(initial));

  const toggle = useCallback((id: T) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);
  const select = useCallback((id: T) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);
  const deselect = useCallback((id: T) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);
  const clear = useCallback(() => setSelected(new Set()), []);
  const isSelected = useCallback((id: T) => selected.has(id), [selected]);

  return {
    selected,
    toggle,
    select,
    deselect,
    clear,
    isSelected,
    count: selected.size,
  };
}
