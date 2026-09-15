import { useMemo, useState } from 'react';

export type ProductFilterValue = string | number | boolean | readonly string[] | null | undefined;
export type ProductFilterMap = Record<string, ProductFilterValue>;

export function useProductFilter(initial: ProductFilterMap = {}): {
  readonly filters: ProductFilterMap;
  readonly set: (key: string, value: ProductFilterValue) => void;
  readonly toggle: (key: string, value: string) => void;
  readonly remove: (key: string) => void;
  readonly clear: () => void;
  readonly activeCount: number;
  readonly params: Record<string, string | number | boolean>;
} {
  const [filters, setFilters] = useState<ProductFilterMap>(initial);

  const params = useMemo(() => {
    const out: Record<string, string | number | boolean> = {};
    for (const [k, v] of Object.entries(filters)) {
      if (v === null || v === undefined || v === '') continue;
      if (Array.isArray(v)) out[k] = v.join(',');
      else out[k] = v as string | number | boolean;
    }
    return out;
  }, [filters]);

  return {
    filters,
    set: (k, v) => setFilters((prev) => ({ ...prev, [k]: v })),
    toggle: (k, v) =>
      setFilters((prev) => {
        const current = prev[k];
        const arr = Array.isArray(current) ? [...current] : [];
        const idx = arr.indexOf(v);
        if (idx === -1) arr.push(v);
        else arr.splice(idx, 1);
        return { ...prev, [k]: arr };
      }),
    remove: (k) =>
      setFilters((prev) => {
        const next = { ...prev };
        delete next[k];
        return next;
      }),
    clear: () => setFilters({}),
    activeCount: Object.values(filters).filter(
      (v) => v !== null && v !== undefined && v !== '' && (!Array.isArray(v) || v.length > 0)
    ).length,
    params,
  };
}
