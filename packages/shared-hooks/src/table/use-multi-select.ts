import { useCallback, useState } from 'react';

export function useMultiSelect<T extends string | number>(
  allIds: readonly T[]
): {
  readonly selected: readonly T[];
  readonly add: (id: T) => void;
  readonly addMany: (ids: readonly T[]) => void;
  readonly remove: (id: T) => void;
  readonly clear: () => void;
  readonly isSelected: (id: T) => boolean;
  readonly count: number;
} {
  const [selected, setSelected] = useState<Set<T>>(new Set());

  const add = useCallback((id: T) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);
  const addMany = useCallback((ids: readonly T[]) => {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const id of ids) next.add(id);
      return next;
    });
  }, []);
  const remove = useCallback((id: T) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);
  const clear = useCallback(() => setSelected(new Set()), []);
  const isSelected = useCallback((id: T) => selected.has(id), [selected]);

  // Use allIds for potential future "which ones are missing" logic.
  void allIds;

  return {
    selected: [...selected],
    add,
    addMany,
    remove,
    clear,
    isSelected,
    count: selected.size,
  };
}
