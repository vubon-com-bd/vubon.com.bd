import { useCallback, useState } from 'react';

export type FilterOperator =
  'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'contains' | 'startsWith' | 'endsWith';

export interface AdvancedFilter {
  readonly field: string;
  readonly operator: FilterOperator;
  readonly value: unknown;
}

export function useAdvancedFilter(initial: readonly AdvancedFilter[] = []): {
  readonly filters: readonly AdvancedFilter[];
  readonly add: (filter: AdvancedFilter) => void;
  readonly remove: (index: number) => void;
  readonly update: (index: number, filter: AdvancedFilter) => void;
  readonly clear: () => void;
} {
  const [filters, setFilters] = useState<readonly AdvancedFilter[]>(initial);

  const add = useCallback((f: AdvancedFilter) => {
    setFilters((prev) => [...prev, f]);
  }, []);
  const remove = useCallback((index: number) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  }, []);
  const update = useCallback((index: number, f: AdvancedFilter) => {
    setFilters((prev) => prev.map((v, i) => (i === index ? f : v)));
  }, []);
  const clear = useCallback(() => setFilters([]), []);

  return { filters, add, remove, update, clear };
}
