import { useMemo } from 'react';

/**
 * Given a current page + total pages, compute the page numbers to render
 * (with ellipsis sentinels as `-1`).
 */
export function usePaginationUI(
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): {
  readonly pages: readonly number[];
} {
  const pages = useMemo(() => {
    const totalNumbers = siblingCount * 2 + 5;
    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const left = Math.max(2, currentPage - siblingCount);
    const right = Math.min(totalPages - 1, currentPage + siblingCount);
    const middle: number[] = [];
    for (let i = left; i <= right; i++) middle.push(i);
    const out: number[] = [1];
    if (left > 2) out.push(-1);
    out.push(...middle);
    if (right < totalPages - 1) out.push(-1);
    out.push(totalPages);
    return out;
  }, [currentPage, totalPages, siblingCount]);

  return { pages };
}
