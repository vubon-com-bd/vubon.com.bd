import { useCallback } from 'react';

export function useSelectAll<T extends string | number>(
  allIds: readonly T[],
  selected: ReadonlySet<T>,
  onSelectMany: (ids: readonly T[]) => void,
  onClear: () => void
): {
  readonly allSelected: boolean;
  readonly someSelected: boolean;
  readonly toggleAll: () => void;
} {
  const allSelected = allIds.length > 0 && allIds.every((id) => selected.has(id));
  const someSelected = allIds.some((id) => selected.has(id));

  const toggleAll = useCallback(() => {
    if (allSelected) onClear();
    else onSelectMany(allIds);
  }, [allSelected, allIds, onSelectMany, onClear]);

  return { allSelected, someSelected, toggleAll };
}
