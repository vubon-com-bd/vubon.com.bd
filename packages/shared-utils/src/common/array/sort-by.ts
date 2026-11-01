/**
 * Sort array by a comparable selector
 * @module shared-utils/common/array
 */
export type SortDirection = 'asc' | 'desc';

export function sortBy<T>(
  items: readonly T[],
  keySelector: (item: T) => number | string,
  direction: SortDirection = 'asc'
): T[] {
  const factor = direction === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    const ka = keySelector(a);
    const kb = keySelector(b);
    if (ka < kb) return -1 * factor;
    if (ka > kb) return 1 * factor;
    return 0;
  });
}
