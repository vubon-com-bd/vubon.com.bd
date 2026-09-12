import { useState, useCallback, useMemo } from 'react';

export interface UseSelectionOptions<T> {
  items?: T[];
  getId?: (item: T) => string | number;
  initialSelected?: (string | number)[];
  maxSelection?: number;
}

export interface UseSelectionReturn<T> {
  selectedIds: (string | number)[];
  selectedItems: T[];
  select: (id: string | number) => void;
  deselect: (id: string | number) => void;
  toggle: (id: string | number) => void;
  selectAll: () => void;
  deselectAll: () => void;
  toggleAll: () => void;
  isSelected: (id: string | number) => boolean;
  count: number;
  isEmpty: boolean;
  isAllSelected: boolean;
  isPartiallySelected: boolean;
}

export const useSelection = <T extends { id?: string | number }>(
  options: UseSelectionOptions<T> = {}
): UseSelectionReturn<T> => {
  const {
    items = [],
    getId = (item: T) => item.id ?? '',
    initialSelected = [],
    maxSelection,
  } = options;

  const [selectedIds, setSelectedIds] = useState<(string | number)[]>(initialSelected);

  const select = useCallback(
    (id: string | number) => {
      setSelectedIds((prev) => {
        if (prev.includes(id)) return prev;
        if (maxSelection && prev.length >= maxSelection) return prev;
        return [...prev, id];
      });
    },
    [maxSelection]
  );

  const deselect = useCallback(
    (id: string | number) => setSelectedIds((prev) => prev.filter((i) => i !== id)),
    []
  );

  const toggle = useCallback(
    (id: string | number) => {
      setSelectedIds((prev) => {
        if (prev.includes(id)) return prev.filter((i) => i !== id);
        if (maxSelection && prev.length >= maxSelection) return prev;
        return [...prev, id];
      });
    },
    [maxSelection]
  );

  const selectAll = useCallback(() => {
    const ids = items.map(getId);
    setSelectedIds(maxSelection ? ids.slice(0, maxSelection) : ids);
  }, [items, getId, maxSelection]);

  const deselectAll = useCallback(() => setSelectedIds([]), []);

  const toggleAll = useCallback(() => {
    if (selectedIds.length === items.length) deselectAll();
    else selectAll();
  }, [selectedIds.length, items.length, selectAll, deselectAll]);

  const isSelected = useCallback((id: string | number) => selectedIds.includes(id), [selectedIds]);

  const selectedItems = useMemo(
    () => items.filter((item) => selectedIds.includes(getId(item))),
    [items, selectedIds, getId]
  );

  return {
    selectedIds,
    selectedItems,
    select,
    deselect,
    toggle,
    selectAll,
    deselectAll,
    toggleAll,
    isSelected,
    count: selectedIds.length,
    isEmpty: selectedIds.length === 0,
    isAllSelected: items.length > 0 && selectedIds.length === items.length,
    isPartiallySelected: selectedIds.length > 0 && selectedIds.length < items.length,
  };
};
