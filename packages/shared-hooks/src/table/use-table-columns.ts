import { useCallback, useState } from 'react';

export interface ColumnDef {
  readonly id: string;
  readonly label: string;
  readonly visible?: boolean;
  readonly width?: number;
  readonly order?: number;
}

export function useTableColumns(initial: readonly ColumnDef[]): {
  readonly columns: readonly ColumnDef[];
  readonly visibleColumns: readonly ColumnDef[];
  readonly toggleVisibility: (id: string) => void;
  readonly setWidth: (id: string, width: number) => void;
  readonly reorder: (fromIndex: number, toIndex: number) => void;
  readonly reset: () => void;
} {
  const [columns, setColumns] = useState<readonly ColumnDef[]>(initial);

  const toggleVisibility = useCallback((id: string) => {
    setColumns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, visible: c.visible === false } : c))
    );
  }, []);

  const setWidth = useCallback((id: string, width: number) => {
    setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, width } : c)));
  }, []);

  const reorder = useCallback((fromIndex: number, toIndex: number) => {
    setColumns((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      if (moved) next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const reset = useCallback(() => setColumns(initial), [initial]);

  const visibleColumns = columns.filter((c) => c.visible !== false);

  return { columns, visibleColumns, toggleVisibility, setWidth, reorder, reset };
}
